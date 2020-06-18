const Users = require('../../models/Schemas/Users');

exports.createUser = function (req, res, next) {
  const user = new Users(req.body);
  
  user.save()
    .then((newUser) => res.status(200).json(newUser))
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).send('User with that ID is already created');
      } 
      return res.status(401).send(err)
    });
}