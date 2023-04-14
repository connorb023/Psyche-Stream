const User = require('../models/user');

const userController = {
    index(req, res, next) {
      // your code here
    },
  
    async create(req, res, next) {
      try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json({ success: true, user });
      } catch (error) {
        next(error);
      }
    },
  
    show(req, res, next) {
      // your code here
    },
  
    update(req, res, next) {
      // your code here
    },
  
    delete(req, res, next) {
      // your code here
    }
  };
  
  module.exports = userController;
  

  
  