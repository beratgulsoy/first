const path = require('path');

const express = require('express');
const rootDir = require('./util/path');
const bp = require('body-parser');
const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

db.execute('SELECT * FROM products')
.then(result => {
    console.log(result[0]);
})
.catch(err => {
    console.log(err);
});

app.use(bp.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);