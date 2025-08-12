// use this to generate a hash for mongo-init.js

const bcrypt = require('bcrypt');

const password = 'my-secret-password';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Hashed password:', hash);
});