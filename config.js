// config.js
const mysql = require("mysql");
require("dotenv").config();

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
      }
      console.log("Connected to MySQL!");
    });
  }

  // Método para ejecutar consultas SQL
  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Método para obtener un estudiante por ID
  async getStudentById(id) {
    const query = "SELECT * FROM persons WHERE id = ? AND role = 'student'";
    try {
      const results = await this.query(query, [id]);
      if (results.length > 0) {
        return results[0];
      } else {
        throw new Error("Student not found");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = Database;
