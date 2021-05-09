'use strict';

const express=require('express');

const errorHandler=require('./error-handlers/404');
const notFoundHandler=require('./error-handlers/500');

const logger=require('./middleware/logger');
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');
const app=express();
app.use(logger);
app.use(express.json());

app.use(foodRouter);
app.use(clothesRouter);



//Global middleware
app.use(logger);
app.use(express.json());

//add routes 
app.get('/',(request,response)=>{
  console.log('Hello');
  response.status(200).send('Welcom to reem World');
});

app.use('*',notFoundHandler);
app.use(errorHandler);

function listen (PORT){
  app.listen(PORT,()=>{
    console.log(`Hello form ${PORT}`);
  });
}

module.exports={
  app,
  listen
};