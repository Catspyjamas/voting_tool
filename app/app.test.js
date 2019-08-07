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

  expect(polls).toHaveLength(1);
  expect(polls[0]).toMatchObject(dummyData.poll);
});

test("GET /polls/:pollId returns a single poll", async () => {
  const response = await request(app)
    .get(`/polls/${dummyData.poll._id}`)
    .expect(200)
    .expect("Content-Type", /json/);
  const poll = response.body;
  expect(poll).toMatchObject(dummyData.poll);
});

test("POST /polls creates a new poll and returns it", async () => {
  const response = await request(app)
    .post("/polls")
    .set("Content-Type", "application/json")
    .send(dummyData.poll)
    .expect(201);

  const { _id, ...expectedPoll } = dummyData.poll;
  const poll = response.body;
  expect(poll).toMatchObject(expectedPoll);
  expect(typeof poll._id).toBe("string");
});

test("PATCH /polls/:pollId updates the poll and returns it", async () => {
  const response = await request(app)
    .patch(`/polls/${dummyData.poll._id}`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.asterix.token)
    .send({ status: "DRAFT" })
    .expect(200);

  const poll = response.body;
  expect(poll.status).toBe("DRAFT");
  expect(poll.votes).toHaveLength(0);
  const { status, ...expectedPoll } = dummyData.poll;
  expect(poll).toMatchObject(expectedPoll);
});

test("DELETE /polls/:pollId deletes the poll and returns it", async () => {
  const response = await request(app)
    .delete(`/polls/${dummyData.poll._id}`)
    .set("Content-Type", "application/json")
    .set("Authorization", dummyData.asterix.token)
    .expect(200);
  const poll = response.body;
  const { status, ...expectedPoll } = dummyData.poll;
  expect(poll).toMatchObject(expectedPoll);
});
