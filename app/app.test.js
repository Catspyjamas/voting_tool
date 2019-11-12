const request = require("supertest");
const app = require("./app");
const { resetDb, closeConnection } = require("./tests/db");
const { createDummyData } = require("./tests/dummyData");

let dummyData;

beforeAll(async () => {
  await resetDb();
  //TODO: test if I can manually add data
  dummyData = await createDummyData();
});
afterAll(async () => {
  await closeConnection();
});

let obelixToken;
let obelixId;
let asterixToken;
let asterixId;

test("POST /signup returns the user plus a JWT token", async () => {
  const response = await request(app)
    .post("/signup")
    .send(dummyData.obelix)
    .expect(201)
    .expect("Content-Type", /json/);

  const { token, _id, ...user } = response.body.data;
  obelixToken = token;
  obelixId = _id;
  expect(obelixToken).not.toBe(undefined);
  expect(obelixId).not.toBe(undefined);
});

test("GET /polls returns an array of all polls", async () => {
  const response = await request(app)
    .get("/polls")
    .expect(200)
    .expect("Content-Type", /json/);
  const polls = response.body.data;
  expect(response.body.status).toEqual("success");
  expect(polls).toHaveLength(3);
});

test("GET /polls/:pollId with status OPEN returns a single poll without votes", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.openPoll._id}`)
    .expect(200)
    .expect("Content-Type", /json/);
  const poll = response.body.data;
  const { votes, ...expectedPoll } = dummyData.openPoll;
  expect(response.body.status).toEqual("success");
  expect(poll.votes).toHaveLength(0);
});

test("GET /polls/:pollId with status CLOSED returns an object with a single poll without votes", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.closedPoll._id}`)
    .expect(200)
    .expect("Content-Type", /json/);
  const poll = response.body.data;
  expect(response.body.status).toEqual("success");
  expect(poll).toHaveProperty("title");
});

test("POST /polls creates a new poll and returns an object with the poll data", async () => {
  const response = await request(app)
    .post("/polls")
    .set("Authentication", obelixToken)
    .send(dummyData.draftPoll)
    .expect(201);

  const { _id, __v, creator, ...expectedPoll } = dummyData.draftPoll;
  const poll = response.body.data;
  expect(poll).toMatchObject(expectedPoll);
  expect(response.body.status).toEqual("success");
  expect(typeof poll._id).toBe("string");
});

test("PATCH /polls/:pollId updates the poll and returns an object with the poll data", async () => {
  const response = await request(app)
    .patch(`/polls/${dummyData.draftPoll._id}`)
    .set("Authentication", obelixToken)
    .set("Content-Type", "application/json")
    .send({ title: "Birthday Event Changed", status: "DRAFT" })
    .expect(200);
  const poll = response.body.data;
  expect(response.body.status).toEqual("success");
  const { __v, title, ...expectedPoll } = dummyData.draftPoll;
  expect(poll.title).toEqual("Birthday Event Changed");
});

test("DELETE /polls/:pollId on poll with status DRAFT deletes the poll", async () => {
  const response = await request(app)
    .delete(`/polls/${dummyData.draftPoll._id}`)
    .set("Authentication", obelixToken)
    .set("Content-Type", "application/json")
    .expect(204);
});

test("POST /polls/:pollId/vote returns an object with the vote as data", async () => {
  const vote1 = dummyData.vote1;

  const response = await request(app)
    .post(`/polls/${dummyData.openPoll._id}/vote`)
    .set("Authentication", obelixToken)
    .set("Content-Type", "application/json")
    .send(vote1)
    .expect(201);
  const receivedVote = response.body.data;
  expect(response.body.status).toEqual("success");
  expect(receivedVote).toMatchObject(vote1);
});

test("GET /polls/:pollId/vote returns the vote for the user's Id", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.openPoll._id}/vote`)
    .set("Content-Type", "application/json")
    .set("Authentication", obelixToken)
    // .expect("Content-Type", /json/)
    .expect(200);
  const vote = response.body.data;
  expect(response.body.status).toEqual("success");
  expect(vote).toMatchObject(dummyData.vote1);
});

test("PATCH /polls/:pollId/vote updates with the right authentication updates the user's vote", async () => {
  const vote2 = dummyData.vote2;
  const response = await request(app)
    .patch(`/polls/${dummyData.openPoll._id}/vote`)
    .set("Content-Type", "application/json")
    .set("Authentication", obelixToken)
    .send(vote2);
  const newVote = response.body.data;
  expect(response.body.status).toEqual("success");
  expect(newVote).toMatchObject(vote2);
});

test("POST /logout ", async () => {
  const response = await request(app)
    .post("/logout")
    .set("Authentication", obelixToken)
    .expect(201)
    .expect("Content-Type", /json/);

  const user = response.body.data;
  expect(response.body.status).toEqual("success");
  expect(user._id).toEqual(obelixId);
});

test("POST /login ", async () => {
  console.log("DUMMYDATA ASTERIX", dummyData.asterix);

  const response = await request(app)
    .post("/login")
    .send({
      email: dummyData.asterix.email,
      password: "123"
    })
    .expect(201)
    .expect("Content-Type", /json/);

  const { token, _id, ...user } = response.body.data;
  asterixToken = token;
  asterixId = _id;
  expect(asterixToken).not.toBe(undefined);
  expect(asterixId).not.toBe(undefined);
  expect(response.body.status).toEqual("success");
  expect(asterixId).toEqual(dummyData.asterix._id);
});

test("POST /polls/:pollId/vote returns an object with the vote as data", async () => {
  const vote1 = dummyData.vote1;

  const response = await request(app)
    .post(`/polls/${dummyData.openPoll._id}/vote`)
    .set("Authentication", asterixToken)
    .set("Content-Type", "application/json")
    .send(vote1)
    .expect(201);
  const receivedVote = response.body.data;
  expect(response.body.status).toEqual("success");
  expect(receivedVote).toMatchObject(vote1);
});

test("GET /polls/:pollId/votes/ with status CLOSED returns the poll including all votes", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.closedPoll._id}/votes`)
    .set("Content-Type", "application/json")
    .set("Authentication", asterixToken)
    .expect(200);
  const poll = response.body.data;
  const { votes, ...expectedPoll } = dummyData.closedPoll;
  expect(response.body.status).toEqual("success");
  expect(poll).toMatchObject(expectedPoll);
  expect(votes).toHaveLength(8);
});
