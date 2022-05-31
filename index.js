const express = require('express');

const PORT = 4500;
const indexRouter = require('./routes/indexRouter'); 


const app = express();

app.use('/',indexRouter);

app.listen(PORT, () =>{
    console.log('Working');
});