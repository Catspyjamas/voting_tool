const request = require("supertest");
const app = require("./app");
const { resetDb, closeConnection } = require("./tests/db");
const { createDummyData } = require("./tests/dummyData");

let dummyData;

beforeAll(resetDb);
beforeAll(async () => {
  dummyData = await createDummyData();
});
afterAll(closeConnection);

test("GET /polls returns an array of all polls", async () => {
  const response = await request(app)
    .get("/polls")
    .expect(200)
    .expect("Content-Type", /json/);

  const polls = response.body;

  expect(polls).toHaveLength(3);
  expect(polls).toContainEqual(dummyData.draftPoll);
  expect(polls).toContainEqual(dummyData.closedPoll);
});

test("GET /polls/:pollId with status OPEN returns a single poll without votes", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.openPoll._id}`)
    .expect(200)
    .expect("Content-Type", /json/);
  const poll = response.body;
  const { votes, ...expectedPoll } = dummyData.openPoll;
  expect(poll.votes).toHaveLength(0);
  expect(poll).toMatchObject(expectedPoll);
});

test("GET /polls/:pollId with status CLOSED returns a single poll without votes", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.closedPoll._id}`)
    .expect(200)
    .expect("Content-Type", /json/);
  const poll = response.body;
  expect(poll).toMatchObject(dummyData.closedPoll);
});

test("POST /polls creates a new poll and returns it", async () => {
  const response = await request(app)
    .post("/polls")
    .set("Authorization", dummyData.asterix.token)
    .send(dummyData.draftPoll)
    .expect(201);

  const { _id, __v, ...expectedPoll } = dummyData.draftPoll;
  const poll = response.body;
  expect(poll).toMatchObject(expectedPoll);
  expect(typeof poll._id).toBe("string");
});

test("PATCH /polls/:pollId updates the poll and returns it", async () => {
  const response = await request(app)
    .patch(`/polls/${dummyData.draftPoll._id}`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.asterix.token)
    .send({ title: "Birthday Event Changed", status: "DRAFT" })
    .expect(200);

  const poll = response.body;
  expect(poll.status).toBe("DRAFT");
  const { __v, title, ...expectedPoll } = dummyData.draftPoll;
  expect(poll).toMatchObject(expectedPoll);
  expect(poll.title).toEqual("Birthday Event Changed");
});

//Nice test, but we need some votes data later on, so disabled by default
// test("PATCH /polls/:pollId with status DRAFT resets the votes", async () => {
//   const response = await request(app)
//     .patch(`/polls/${dummyData.openPoll._id}`)
//     .set("Content-Type", "application/json")
//     .set("Authorization", dummyData.asterix.token)
//     .send({ status: "DRAFT" })
//     .expect(200);

//   const poll = response.body;
//   expect(poll.status).toBe("DRAFT");
//   expect(poll.votes).toHaveLength(0);
//   const { status, __v, votes, ...expectedPoll } = dummyData.openPoll;
//   expect(poll).toMatchObject(expectedPoll);
// });

test("DELETE /polls/:pollId on poll with status DRAFT deletes the poll and returns the deleted poll", async () => {
  const response = await request(app)
    .delete(`/polls/${dummyData.draftPoll._id}`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.asterix.token)
    .expect(200);
  const poll = response.body;
  const { __v, title, ...expectedPoll } = dummyData.draftPoll;
  expect(poll).toMatchObject(expectedPoll);
});

test("GET /polls/:pollId/votes/:userId returns the vote for the user's Id", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.openPoll._id}/votes/${dummyData.vote1.userId}`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.asterix.token)
    // .expect("Content-Type", /json/)
    .expect(200);
  const vote = response.body;
  expect(vote).toMatchObject(dummyData.vote1);
});

test("GET /polls/:pollId/votes/ with status CLOSED returns the poll including all votes", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.closedPoll._id}/votes`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.asterix.token)
    .expect(200);
  const poll = response.body;
  const { votes, ...expectedPoll } = dummyData.closedPoll;
  expect(poll.votes).toHaveLength(3);
  expect(poll).toMatchObject(expectedPoll);
});

// test("GET /polls/:pollId/votes with status DRAFT returns unauthorized", async () => {
//   const response = await request(app)
//     .get(`/polls/${dummyData.draftPoll._id}/votes`)
//     .set("Content-Type", "application/json")
//     .set("Authorization", dummyData.asterix.token)
//     .expect(401);
// });

test("GET /polls/:pollId/votes/:wrongUserId returns unauthorized", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.openPoll._id}/votes/${dummyData.vote2.userId}`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.asterix.token)
    .expect(401);
});

test("POST /polls/:pollId/votes creates a new vote for the user", async () => {
  const openPoll = dummyData.openPoll;
  const vote = {
    ranking: [
      openPoll.options[1]._id,
      openPoll.options[3]._id,
      openPoll.options[2]._id,
      openPoll.options[4]._id,
      openPoll.options[0]._id
    ]
  };
  const response = await request(app)
    .post(`/polls/${openPoll._id}/votes`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.verleihnix.token)
    .send(vote)
    .expect(201);
  const newVote = response.body;
  expect(newVote).toMatchObject(vote);
  expect(newVote).toHaveProperty("userId", dummyData.verleihnix._id);
});

test("PATCH /polls/:pollId/votes/:voteId updates the user's vote", async () => {
  const openPoll = dummyData.openPoll;
  const vote = {
    ranking: [
      openPoll.options[4]._id,
      openPoll.options[1]._id,
      openPoll.options[2]._id,
      openPoll.options[0]._id,
      openPoll.options[3]._id
    ]
  };
  const response = await request(app)
    .patch(`/polls/${openPoll._id}/votes/${dummyData.obelix._id}`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.obelix.token)
    .send(vote);
  const newVote = response.body;
  expect(newVote).toMatchObject(vote);
  expect(newVote).toHaveProperty("userId", dummyData.obelix._id);
});

test("DELETE /polls/:pollId/votes/:voteId deletes a user's vote", async () => {
  const response = await request(app)
    .delete(`/polls/${dummyData.openPoll._id}/votes/${dummyData.asterix._id}`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.asterix.token);
  const deletedVote = response.body;
  // const { __v, ...expectedVote } = dummyData.vote2;
  expect(deletedVote).toMatchObject(dummyData.vote1);
});
