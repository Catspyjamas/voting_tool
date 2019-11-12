const { connection, initDatabase } = require("../db");

async function resetDb() {
  await initDatabase();
  await connection.db.dropDatabase();
}

async function closeConnection() {
  await connection.close();
}

module.exports = {
  resetDb,
  closeConnection
};
