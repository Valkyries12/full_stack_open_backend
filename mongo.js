const mongoose = require('mongoose');
const dns = require('node:dns/promises');

dns.setServers(['1.1.1.1', '1.0.0.1']);

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const phoneNumber = process.argv[4];

//const url = `mongodb+srv://nicocaruso1992_db_user:${password}@cluster0.dwtppzy.mongodb.net/test?appName=Cluster0`;
const url = `mongodb+srv://nicocaruso1992_db_user:${password}@cluster0.dwtppzy.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  //id: Number,
  number: String,
  name: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  number: phoneNumber,
  name: personName,
});

if (!personName || !phoneNumber) {
  return Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

person.save().then((result) => {
  console.log(`Added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
});

/*Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`);
  });
  mongoose.connection.close();
});*/
