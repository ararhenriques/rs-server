require('dotenv').config();
const express = require('express'); 
const app = express();
const sequelize = require('./db');
const user = require('./controllers/usercontroller');
const chip = require('./controllers/chipcontroller');
const bodyParser = require('body-parser');

sequelize.sync();
app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use(express.static(__dirname + '/public'))
console.log(__dirname);

app.get('/', (req, res) => res.render('index'));

app.use('/chip', chip);
app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}`));