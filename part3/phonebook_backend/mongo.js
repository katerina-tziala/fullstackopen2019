const mongoose = require('mongoose');
const process = require('process');
if (process.argv.length < 3) {
    console.log('Give password as argument');
    process.exit(1);
}

const DB_USERNAME = 'fullstack';
const DB_URI = '@cluster0-xq5jf.mongodb.net/phonebook?retryWrites=true&w=majority';
const password = process.argv[2];

const url = `mongodb+srv://${DB_USERNAME}:${password}${DB_URI}`;

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

const entrySchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', entrySchema);

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number);
            mongoose.connection.close();
        });
    });
}

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });
    person.save().then(response => {
        console.log(`Added ${response.name} number ${response.number} to phonebook!`);
        mongoose.connection.close();
    });
}
