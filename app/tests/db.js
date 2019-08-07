const { connection } = require("../db");

beforeAll(async () => {
  await connection;
  await connection.db.dropDatabase();
});

afterAll(async () => {
  await connection.close();
});
