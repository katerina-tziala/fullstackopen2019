require('dotenv').config();
const process = require('process');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Person = require('./models/person');
const PORT = process.env.PORT || 3001;
const DB_URL = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan((tokens, req, res) => {
    const stringParts = [];
    const method = tokens.method(req, res);
    stringParts.push(method);
    stringParts.push(tokens.url(req, res));
    stringParts.push(tokens.status(req, res));
    stringParts.push(tokens.res(req, res, 'content-length'));
    stringParts.push('-');
    stringParts.push(tokens['response-time'](req, res));
    stringParts.push('ms');
    if (method === 'POST') {
        stringParts.push(JSON.stringify(req.body));
    }
    return stringParts.join(' ');
}));

const establishConnection = () => {
    return mongoose.connect(DB_URL,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
};

const closeDBConnection = () => {
    mongoose.connection.close();
};

const isBlank = (str) => !str || !str.length || /^\s*$/.test(str);

const returnBadRequestError = (response, errorMessage) => {
    return response.status(400).json({
        error: errorMessage
    });
};

app.get('/api/info', (req, response, next) => {
    return establishConnection().then(() => {
        return Person.find({}).then(persons => {
            closeDBConnection();
            const info = `<div><p>Phonebook has info for ${persons.length} persons</p><p>${new Date().toString()}</p></div>`;
            return response.send(info);
        });
    }).catch((error) => {
        error.name = 'DBConnectionError';
        return next(error);
    });
});

app.get('/api/persons', (request, response, next) => {
    return establishConnection().then(() => {
        return Person.find({}).then(persons => {
            closeDBConnection();
            return response.json(persons.map(person => person.toJSON()));
        });
    }).catch((error) => {
        error.name = 'DBConnectionError';
        return next(error);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    return establishConnection().then(() => {
        return Person.findById(request.params.id).then(person => {
            closeDBConnection();
            if (person) {
                return response.json(person.toJSON());
            } else {
                return response.status(404).end();
            }
        }).catch(error => {
            closeDBConnection();
            return next(error);
        });
    }).catch((error) => {
        error.name = 'DBConnectionError';
        return next(error);
    });
});


app.post('/api/persons/', (request, response, next) => {
    const body = request.body;
    if (isBlank(body.name)) {
        return returnBadRequestError(response, 'name is missing');
    }
    if (isBlank(body.number)) {
        return returnBadRequestError(response, 'number is missing');
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    return establishConnection().then(() => {
        return person.save().then(addedPerson => {
            closeDBConnection();
            return addedPerson.toJSON();
        }).then(savedAndFormattedPerson => {
            return response.json(savedAndFormattedPerson);
        }).catch(error => {
            return next(error);
        });
    }).catch((error) => {
        error.name = 'DBConnectionError';
        return next(error);
    });
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
    const person = new Person({
        name: body.name,
        number: body.number,
        _id: request.params.id
    });
    return establishConnection().then(() => {
        return Person.findByIdAndUpdate(request.params.id, person, { new: true }).then(updatedPerson => {
            return updatedPerson.toJSON();
        }).then(savedAndFormattedPerson => {
            return response.json(savedAndFormattedPerson);
        }).catch(error => {
            return next(error);
        });
    }).catch((error) => {
        error.name = 'DBConnectionError';
        return next(error);
    });
});

app.delete('/api/persons/:id', (request, response, next) => {
    return establishConnection().then(() => {
        return Person.findByIdAndRemove(request.params.id).then(() => {
            return response.status(204).end();
        }).catch(error => {
            return next(error);
        });
    }).catch((error) => {
        error.name = 'DBConnectionError';
        return next(error);
    });
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    if (error.name === 'DBConnectionError') {
        return response.status(500).send({ error: 'connection to database refused' });
    }
    if (error.name === 'ValidationError') {
        let message = `${error._message}!`;
        Object.keys(error.errors).forEach(key => {
            message += ` ${error.errors[key]}`;
        });
        return response.status(400).send({ error: message });
    }
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    if (error.name === 'MongoError' && error.codeName === 'ImmutableField') {
        return response.status(500).send({ error: 'internal server error' });
    }
    next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});