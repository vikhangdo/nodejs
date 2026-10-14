import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import API from './src/routes/api.js';
const app = express();

//Body-parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Xin chao!');
});
app.listen(process.env.PORT, function () {
    console.log('===> Your app listening on port ' + process.env.PORT);
});

API(app);

