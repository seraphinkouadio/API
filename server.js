const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { faker } = require('@faker-js/faker');
const dotenv = require('dotenv');

dotenv.config({ path:'./config/config.env'});

const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => {
  console.log("connexion à la bd reussie!");
})
.catch((err) => {
  console.error("err");
});

app.use(bodyParser.json());

//LISTES UTILISATEURS
const users = [];
for (let i = 0; i < 5; i++) {
  users.push({ 
    name: faker.internet.name,
    email: faker.internet.email(),
    password: faker.internet.password()
  });
}

//creer une version de API
const versionApi = '/api/v1'

// GET /api/v1/users
app.get('${versionApi}/users', (req, res) => {
  res.json(users);
})

// RENVOYER TOUS LES UTILISATEURS
app.get('${versionApi}/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(users);
    }
  });
}); 

//AJOUTER UN NOUVEL UTILISATEUR À LA BASE DE DONNÉES
app.post('${versionApi}/users', function(req, res) {
  User.create(req.body, function(err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
});

// MODIFIER UN UTILISATEUR PAR ID
app.put('${versionApi}/users/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
});

// SUPPRIMER UN UTILISATEUR PAR ID
app.delete('${versionApi}/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
});

module.exports = app;