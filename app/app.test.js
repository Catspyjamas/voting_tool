const request = require("supertest");
const app = require("./app");
const dummyDataPromise = require("../tools/dummyData");

let dummyData;

beforeAll(async () => {
  dummyData = await dummyDataPromise;
});

test.only("GET /polls returns an array of all polls", async () => {
  const response = await request(app)
    .get("/polls")
    .expect(200)
    .expect("Content-Type", /json/);

  const polls = response.body;

  expect(polls).toHaveLength(1);

  console.log("end");
});
