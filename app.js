const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const UserRoutes=require('./routes/UserRoutes')
const jwt = require('jsonwebtoken');  
const Server=require('socket.io')
const createServer =require('http');
const { sendMessage, isReceiverOnline, getMessage } = require('./controllers/ChatController');
// const sendMessage=require('./controllers/ChatController')
// const isReceiverOnline=require('./controllers/ChatController')
// const jonid=require('./controllers/ChatController')
dotenv.config();

// Use environment variables for port and database URL
const PORT = 3000 
// process.env.PORT ;
const DB_URL = 'mongodb+srv://RoshanChaudhari:RoshanChaudhari@roshan.armduui.mongodb.net/?retryWrites=true&w=majority&appName=roshan'

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
// jonid(receiverId,senderId).then((res)=>{
//   console.logo(res)
// },err=>{
//   conosle.log(err)
// })
//update the status of user offline to online ...
//updateStatus()
// io.in(id).emit('login_res',"login successful")   
})
//message socket io 
// socket.on('message',(msg)=>{
//   console.log(msg.senderId,"messagelog")
//   console.log('messageeventcall')
//     sendMessage(msg);
//     isReceiverOnline(msg.receiverId)
//     .then((res) => {
//       console.log('reslog',res)
//       if (res === false) {
//         io.in(msg.receiverId).emit('show_notification', {
//           title: 'you have new message in Angular chat app',
//           message: msg.message, 
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//     io.in(msg.receiverId).emit('getMessage', msg);
// })
socket.on('message', (msg) => {
  console.log(msg.senderId, "messagelog");
  console.log('messageeventcall');
  // Call sendMessage function with the received message
  sendMessage(msg);
  isReceiverOnline(msg.receiverId)
    .then((res) => {
      console.log('reslog', res)
      if (res === false) {
        io.in(msg.receiverId).emit('show_notification', {
          title: 'you have new message in Angular chat app',
          message: msg.message,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

    console.log("msg.receiverId)msg.receiverId)",msg.receiverId)
  io.in(msg.receiverId).emit('getMessage', msg);
});
socket.on('get-all-messages',(data) => {
    console.log("mergeid",data);
    getMessage(data.mergeId).then((response) => {
        console.log(response);
    },err => console.log(err.message));

})

})
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Hello World");
});
