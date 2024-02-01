var express = require('express');
var router = express.Router();
const User = require("../models/userModels");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Todo App' });
});

//////////////////////////////////////add task//////////////////////////////////////////////////
router.get('/addtask', function(req, res, next) {
  res.render('addtask', { title: 'Todo App' });
});

router.post('/addtask', async function(req, res, next) {
  try {
    const newtask = User(req.body);
    await newtask.save(); 
    res.redirect("/") 
  } catch (error) {
    console.log(error);
  }
});

////////////////////////////////list//////////////////////////////////////////////////

router.get("/list" , async function(req,res,next){
  try {
    const users = await User.find();
    res.render('list', { title: ' Task list', users });
  } catch (error) {
    console.log(error);
  }
});

/////////////////////////////////update///////////////////////////////////////////

router.get('/update/:id', async function(req, res, next) {
  var currentUser = await User.findOne({ _id: req.params.id})
  res.render("update", { user : currentUser ,title:"Update user"})
  
});
router.post("/update/:id" , async function(req,res,next){
  try {
    await User.findByIdAndUpdate(req.params.id , req.body);
    res.redirect("/list");
  } catch (error) {
    res.send(error);  
  }
})

////////////////////////////////delete///////////////////////////////////////////////

router.get("/delete/:id" , async function(req,res,next){
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/list");
})

module.exports = router;
