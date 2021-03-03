// server.js
import bodyParser from 'body-parser';
import express from 'express';
import router from '././routes';
import postRouter from '././routes/post.routes';
import userRouter from '././routes/users.routes';
import './config/mongodb.config';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use('/api', router);
app.use('/api/posts', postRouter);

//Users
app.use('/api/users', userRouter);

app.get('/', function(req, res){
  res.send('Hello! from the Server');
});

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});

export default app;
