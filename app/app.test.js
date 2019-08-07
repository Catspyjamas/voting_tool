const request = require("supertest");
const app = require("./app");
const {resetDb, closeConnection} = require("./tests/db");
const {createDummyData} = require("./tests/dummyData");

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
});
