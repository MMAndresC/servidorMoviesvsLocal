const express = require('express');

const PORT = 4500;
const movieRouter = require('./routes/moviesRoutes'); 
const indexRouter = require('./routes/indexRoutes');


const app = express();

app.use('/movies',movieRouter);
app.use('/', indexRouter);

app.listen(PORT, () =>{
    console.log('Working');
});