const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ProductData = require('./models/Productdata');
const api = require('./routes/api');
const db = 'mongodb+srv://user_femin:femin4422@mycluster.vuxze.azure.mongodb.net/productDb?retryWrites=true&w=majority';
const cors = require('cors');
var bodyparser = require('body-parser');
const app = new express();


app.use(cors());
app.use(bodyparser.json());
app.use('/api',api);

function verifyToken(req,res,next){
    if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request')
 }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,'secretkey')
    if(!payload){
     return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
 }

app.get('/products',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')
    ProductData.find()
    .then((products)=>{
        console.log(products);
        res.send(products);
    })
})

app.post('/insert',verifyToken,(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log(req.body);
    var product = {
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl
    }
    var product = new ProductData(product);
    product.save();
});

app.post('/edit',verifyToken,(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log(req.body);
    let pid = req.body.pid;
    var product = {
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl
    }
    ProductData.findByIdAndUpdate(pid,product)
    .then(()=>{
        console.log('Updated successfully')
    })
    .catch((err)=>{
        console.log("Error is: ",err)
    })
});

app.get('/singleProduct/:pid',(req,res)=>{
    let pid = req.params.pid;
    console.log(pid,typeof pid,pid.length);
    ProductData.findById(pid)
    .then((product)=>{
      console.log('single product set',product);
      res.status(200).json({product});
    })
  })

 // Delete employee
 app.delete('/products/:id',(req, res) => {
    ProductData.findByIdAndRemove(req.params.id)
    .then(()=>{
        console.log('Deleted')
    })
    .catch((err)=>{
        console.log('Error is: ',err)
    })
 })

mongoose.connect(db,(err)=>{
    if(err){
        console.error('error! '+err)
    }else{
        console.log('Connected to mongodb :)')
    }
});//connect to mongodb

app.listen(3000,()=>{
    console.log('listening to port 3000')
})

