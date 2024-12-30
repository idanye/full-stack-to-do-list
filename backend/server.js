require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose")
const taskRoutes = require('./routes/tasks')
const cors = require('cors')

// express app
const app = express();

// middleware
app.use(express.json())

app.use(cors({
  origin: process.env.CLIENT_URL
}));

// logging requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// uses all the routes we defined in the tasks.js
app.use('/api/tasks', taskRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
