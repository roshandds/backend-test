// const User =require('../modals/Usermodal')


// exports.registerUser=async(req,res)=>{
//     try{
//         const user=new User(req.body)
//         await user.save()
//         res.status(201).send({user})
//     }catch(error){
//         res.status(500).send({error:"error in registerUser"})
//     }
// }


// exports.login=async(req,res)=>{

// }


const User = require('../modals/Usermodal')

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            res.status(400).send({ message: "All Fields Are Required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).send({ message: "Email Already Exists" })
            console.log(error.message)
        }
                                // new User({ name: username, email, password })
        const newUser = await new User({ username, email, password })
        await newUser.save()

        res.status(201).send({ message: "User Created Successfully" })

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}
