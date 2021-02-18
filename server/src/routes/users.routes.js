import express from 'express';
import User from '../models/user.model';
const userRoutes = express.Router();

userRoutes.get('/', (req, res, next) => {
    User.find({} , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
        }
        res.status(200).send({
            'success': true,
            'data': result
        });
    });
});
/* Add Single Post */
userRoutes.post("/", (req, res, next) => {
  let newUser = {
    username: req.body.username,
    body: req.body.body,
  };
   User.create(newUser, function(err, result) {
    if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
    }
      res.status(201).send({
        success: true,
        data: result,
        message: "User created successfully"
      });
  });
});

export default userRoutes;