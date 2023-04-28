const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');

const userroute=require('./router/Userroute');
const app = express();
const port=process.env.Port ||3000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(userroute);
app.listen(port, () => {
    //console.log(process.env);
    console.log(`Server listening on port ${port}`);
  });