const express = require("express");
const app = express();

app.use(express.json());

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];


app.get('/api/persons', (request, response) => {
  response.json(persons);
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
      error: "Name or number missing"
    })
  }

  const newPerson = {
    "id": id,
    ...request.body
  };
  console.log("La persona a agregar es: ", newPerson);
  persons = persons.concat(newPerson);
  console.log("Personas: ", persons);

  response.json();

})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});