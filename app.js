const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const { auth } = require('express-openid-connect');

const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

dotenv.config({ path: './config.env' });

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

const todoRouter = require('./src/v1/routes/todoRoutes');

const layoutsDirPath = path.join(__dirname, '/src/v1/views/layouts');

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: layoutsDirPath,
});

hbs.handlebars.registerHelper('breaklines', function (text) {
  text = Handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  text = text.replace(
    /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
    '<a href="$1">$1</a>')
  return new Handlebars.SafeString(text);
});



const app = express();

app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'src/v1/views'));
app.set('view engine', 'hbs');

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(`${__dirname}/src/v1/public`));
app.use(auth(config));
// app.set('trust proxy', 1);
app.use((req, res, next) => {
  // res.locals.isAuthenticated = req.oidc.isAuthenticated();
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES

// app.use('/api/v1/todos', todoRouter);
app.use('/', todoRouter);

module.exports = app;
