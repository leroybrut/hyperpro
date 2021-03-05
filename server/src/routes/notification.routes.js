import express from 'express';
import Notification from '../models/notification.model';
const notificationRoutes = express.Router();

notificationRoutes.get('/', (req, res, next) => {
    Notification.find({} , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
        }
        console.log('Found notifications ', result);
        res.status(200).send({
            'success': true,
            'data': result
        });
    });
});
notificationRoutes.get("/:notification", (req, res, next) => {
    Notification.findOne({notification: req.params.notification}, function (err, result) {
      if(err){
          console.log("User not found");
           res.status(400).send({
             success: false,
             error: err.message
           });
      }
      console.log('Found user', result);
      res.status(200).send({
          success: true,
          data: result
      });

   });
});

notificationRoutes.post("/", (req, res, next) => {
  let newNotification = {
    notification: req.body.notification,
    level: req.body.level,
  };
  Notification.create(newNotification, function(err, result) {
    if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
    }
      res.status(201).send({
        success: true,
        data: result,
        message: "Notification added"
      });
  });
});

notificationRoutes.delete('/delete/:id', function (req, res) {
    var id = req.body.id;
    Notification.deleteOne({ _id: new mongo.ObjectId(id) }, function (err, results) {
    });
    res.json({ success: id })
  });

export default notificationRoutes;