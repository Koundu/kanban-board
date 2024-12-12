const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>console.log('MongoDB connected'))
    .catch(err => console.log(err))
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running on port ${process.env.PORT || 5000}`);    
})