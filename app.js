const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const UserRoutes=require('./routes/UserRoutes')
const jwt = require('jsonwebtoken');
const Server=require('socket.io')
const createServer =require('http')
dotenv.config();

// Use environment variables for port and database URL
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb+srv://RoshanChaudhari:RoshanChaudhari@roshan.armduui.mongodb.net/?retryWrites=true&w=majority&appName=roshan'; // Replace with your actual MongoDB connection string

const app = express();
const server = require('http').createServer(app); // Pass the Express app to createServer
const io = require('socket.io')(server); // Attach Socket.IO to the HTTP server


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
async function connectToDb() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

connectToDb();

app.use('/',UserRoutes)

//socket connnections 
io.on('connection',(socket)=>{
console.log("User connected",socket.id)
//socket login user
socket.on('login',({id})=>{
console.log("User logged in",id)
socket.join(id)
//update the status of user offline to online ...
//updateStatus()
})
//message socket io 
socket.on('message',()=>{
    
})

})
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Hello World");
});
