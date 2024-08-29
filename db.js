const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sakshiRoot",
  database: "interview",
});

function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }
    console.log("Users table created or already exists");
  });
}
function createNotebook() {
  const createTableQuery = `
   CREATE TABLE IF NOT EXISTS notebooks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT, -- Added user_id column
  FOREIGN KEY (user_id) REFERENCES users(id)
)
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }
    console.log("notebooks table created or already exists");
  });
}

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  createUsersTable();
  createNotebook();
  console.log("DB conection successfull===");
});

module.exports = connection;
