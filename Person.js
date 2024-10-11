// Clase base Person
class Person {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

// Subclase Student
class Student extends Person {
    constructor(id, name, email, score) {
        super(id, name, email);
        this.score = score;
    }

    getRole() {
        return "Estudiantes";
    }
}

//Subclase Professor
class Professor extends Person {
    constructor(id, name, email) {
        super(id, name, email);
    }

    getRole() {
        return "Profesor";
    }
}

//Subclase Admin
class Admin extends Person {
    constructor(id, name, email) {
        super(id, name, email);
    }

    getRole() {
        return "Administrador";
    }
}

module.exports = { Person, Student, Professor, Admin };