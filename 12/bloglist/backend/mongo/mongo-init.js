db.createUser({
  user: 'username',
  pwd: 'password',
  roles: [
    {
      role: 'dbOwner',
      db: 'bloglist'
    }
  ]
});

var userId = db.users.insertOne({
  username: 'dimasYes',
  name: 'Dimas',
  passwordHash: '$2b$10$X18roce4vno1zgOH59cdZOpFTwhg1ru8hlyp8BnpcrzWbn034e5gC'
}).insertedId;

db.blogs.insertOne({ title: 'The BEST blog ever', author: 'Bertie Blogger', user: userId, likes: 0 });