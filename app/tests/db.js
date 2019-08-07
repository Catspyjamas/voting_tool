const { connection } = require("../db");

async function resetDb() {
  await connection;
  await connection.db.dropDatabase();
}

async function closeConnection() {
  await connection.close();
}

module.exports = {
  resetDb,
  closeConnection
};
