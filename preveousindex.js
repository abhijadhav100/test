const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Db } = require('mongodb');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/userdb").then(()=>{
  console.log('Database connected...');
}).catch((err)=>{
  console.log(err);
})
}
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  conpassword:{
    type:String
  }
})

const userCollection = new mongoose.model('users',userSchema)

// userData = {
//   name:"Tony",
//   email:"tony1@gmail.com",
//   password:"tony@123",
//   conpassword:"tony@123"
// }

// userCollection.insertMany([userData])

app.post('/api',(req,res)=>{
    // console.log(req.body);
    const user = req.body;
    userCollection.insertMany(user).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.log(err);
    })
    res.send('Data add successfully');
})

app.get('/api/getUsers',(req,res)=>{
   userCollection.find()
   .then(users=> res.json(users))
   .catch(err=> res.json(err))
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

