require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./model/person");

const app = express();

app.use(cors());
app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static("dist"));



app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  })
});


app.get("/info", (request, response) => {
  const personsQty = persons.length;
  const now = new Date();
  const pageContent = 
    `
      <p>Phonebook has info for ${personsQty} people</p>
      <p>${now}</p>
    `
  const page =  response.send(pageContent);
})


app.get('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const personFound = persons.find(person => person.id === id);
  console.log(personFound)

  if (personFound) {
    response.json(personFound);
  } else {
    response.status(404).end();
  }
  
});


app.delete("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  console.log("id es: ", id)
  persons = persons.filter(person => person.id !== id)
  console.log("Persons es: ", persons);
  response.status(204).end();
})


app.post("/api/persons", (request, response) => {
  const id = Math.floor(Math.random() * 100);
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Falta el nombre o el número"
    })
  }

  const nameExists = persons.some(person => person.name === body.name);
  if (nameExists) {
    return response.status(409).json({
      error: "El nombre ya existe en la agenda"
    })
  }

  const newPerson = {
    "id": id,
    ...request.body
  };
  console.log("La persona a agregar es: ", newPerson);
  persons = persons.concat(newPerson);
  console.log("Personas: ", persons);

  
  response.json(newPerson);

})



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});