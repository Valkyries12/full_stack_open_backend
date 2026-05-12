const mongoose = require('mongoose');
const dns = require('node:dns/promises');

dns.setServers(['1.1.1.1', '1.0.0.1']);

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url)

  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  number: {
    type: String,
    minLength: [4, "El nombre debe tener al menos 4 caracteres"],
    required: [true, "El nombre es obligatorio"]
  },
  name: {
    type: String,
    minLength: [5, "El número es demasiado corto"],
    required: [true, "El número de teléfono es requerido"]
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
