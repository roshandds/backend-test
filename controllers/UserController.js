const User = require("../modals/Usermodal");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const secretKey = 'valarmorghuis';
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ message: "All Fields Are Required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "Email Already Exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: passwordHash });

    res.status(201).send({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
};

// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(401).send({ message: "All fields are Required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).send({ message: "Email is not registered" });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     console.log(passwordMatch);

//     if (!passwordMatch) {
//       return res.status(401).send({ message: "Password is incorrect" });
//     }
//     delete user.password
//     res.status(200).send({ message: `user loging successfully`, success: true, data: user  });
//     console.log(user.id);
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//     console.log(error);
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find();
    res.status(200).send({ message: "All Users", allusers });
    // res.status(200).send({message:"All Users",alluser})
  } catch (error) {
    console.log(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    console.log(user,"user")

    if (!user) {
      return res.status(401).send({ message: 'Email is not registered' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: 'Password is incorrect' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.status(200).send({ message: 'User logged in successfully', token });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userwithid = await User.findById(req.body.userid);
    if (!userwithid) {
      console.log("no user with id " + req.body.userid);
      return res
        .status(404)
        .send({ message: "no user with id " + req.body.userid });
    }
    if (userwithid) {
      res.status(200).send({ message: "User with id", userwithid });
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is in the URL parameter

        // 
        // Use deleteOne with the correct query object
        const result = await User.deleteOne({ _id: userId }); 
   
       // Check if the deletion was successful
       if (result.deletedCount === 0) {
        console.log(result);
         return res.status(404).send({ message: "User with id " + userId + " Doesn't Exist" });
       }
   
       res.status(200).send({ message: "User with id " + userId + " Deleted" });
    } catch (error) {
       console.log(error.message);
       res.status(500).send({ message: "Internal Server Error" });
    }
   };


exports.verifyEmail=async(req,res)=>{
    try{
const user=await User.findOne({email:req.body.email})

if(!user){ res.status(404).send({message:"Email Does Not Exist"});}
if(user){return res.status(201).send({message:"Email Found successfully"});}
    }catch(error){
res.status(404).send({message:"Internal server error"});
    }
}


// exports.changePassword=async(req,res)=>{
//     try{
// const user =await User.findOne({email:req.body.email})

// if(!user){ res.status(404).send({message:"User Does Not Exist"});}
// if(user){
//     const matchpass =await bcrypt.compare(req.body.password,user.password)
//     if(!matchpass){
//         return res.status(404).send({message:"Password Does Not Match"});
//     }else{
//         User.password.update(matchpass)
//         console.log("Password",user.password)
//     }
// }
//     }catch(error){
//         console.log(error.message);
//         res.status(404).send({message:"Internal server error"});
//     }
// }





exports.changePassword=async (req, res) => {
    try{
        const userpassword=await User.find(req.params.password)
        console.log(userpassword)   
        if(userpassword){await User.update(userpassword);}
        if(!userpassword){res.status(404).send({message:"User Does Not Exist"});}

    }catch(error){
    console.log(error.message);
    res.status(500).send({message:"Internal server error"});
    }
}




