const { resetDb, closeConnection } = require("../app/tests/db");
const { createDummyData } = require("../app/tests/dummyData");

async function dummyData() {
  await resetDb();
  await createDummyData();
  await closeConnection();
}

dummyData().catch(console.error);
