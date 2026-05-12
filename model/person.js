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
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{7,8}$/.test(v);
      },
      message: props => `${props.value} no es un número de teléfono válido`
    },
    minLength: [8, "El número debe tener al menos 8 caracteres"],
    required: [true, "El número es obligatorio"]
  },
  name: {
    type: String,
    minLength: [4, "El nombre es demasiado corto"],
    required: [true, "El nombre es obligatorio"]
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
