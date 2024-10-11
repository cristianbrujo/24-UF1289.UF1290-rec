// app.js
const express = require("express");
const path = require("path");
const Database = require("./config");
const { Student, Professor, Admin } = require("./person_classes"); // Importar las clases
const app = express();
const PORT = process.env.APP_PORT;

const db = new Database() //Crear instancia de Database

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
// Endpoint para buscar personas por ID
app.get("/person/:id", async (req, res) => {
  const personId = req.params.id;

  try {
    const personData = await db.query("SELECT * FROM persons WHERE id = ?", [personId]);

    if (personData.length === 0) {
      res.status(404).json({ error: "Person not found" });
      return;
    }

    const person = personData[0];
    let personInstance;

    // Crear instancia de la subclase correspondiente según el rol
    switch (person.role) {
      case "student":
        personInstance = new Student(person.id, person.name, person.email, person.score);
        break;
      case "professor":
        personInstance = new Professor(person.id, person.name, person.email);
        break;
      case "admin":
        personInstance = new Admin(person.id, person.name, person.email);
        break;
      default:
        res.status(500).json({ error: "Invalid role" });
        return;
    }

    // Devolver los datos de la persona y su rol
    res.json({
      name: personInstance.name,
      email: personInstance.email,
      role: personInstance.getRole(),
      ...(personInstance instanceof Student && { score: personInstance.score }),
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching person data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
