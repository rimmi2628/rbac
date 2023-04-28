const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = models.User;
require('dotenv').config();
exports.register=async(req,res)=>{
    try {
        const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const role=req.body.role;
    const data=await User.findOne({where:{email:email}});
    if (data) {
        res.status(500).json({ message: "email already exsit" });
        return;
    }
    const hashpass = await bcrypt.hash(password, 12);

    const user = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashpass,
        role:role,
    });
    const payload = {
        id: user.id,
        email: user.email

    }
    const token = jwt.sign(payload, process.env.secretkey, { expiresIn: '12h' });
    res.status(200).json({ status: 'sucess', message: 'register successfully...', data: user, token: token });
        
    } catch (error) {
        console.log(error);
    }
    


}



// exports.postlogin=async(req,role,res)=>{

//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         const user = await User.findOne({ where: { email: email } });

//         if (!user) {
//             return res.status(404).json({
//               message: "user is not found. Invalid login credentials.",
//               success: false,
//             });
//           }

//           if (user.role !== role) {
//             return res.status(403).json({
//               message: "Please make sure you are logging in from the right portal.",
//               success: false,
//             });
//           }

//           if (user) {
//                         const ismatch = await bcrypt.compare(password, user.password);
            
            
//                         if (ismatch) {
//                             const payload = {
//                                 id: user.id,
//                                 email: user.email
            
//                             }
//                             const token = jwt.sign(payload, process.env.secretkey, { expiresIn: '12h' });
//                             res.status(200).json({ status: 'sucess', message: 'login successfully...', data: user, token: token });
            
//                         }
//                         else {
//                             res.send("invalid  credentials");
//                         }
//                     } else {
//                         res.send("invalid credentials");
//                     }

//                     return res.status(200).json({
//                         ...result,
//                         message: "You are now logged in.",
//                       });
//     } catch (error) {
//         console.log(error);
//     }
// }


exports.postlogin = async (req, res, next) => {



    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            const ismatch = await bcrypt.compare(password, user.password);


            if (ismatch) {
                const payload = {
                    id: user.id,
                    email: user.email

                }
                const token = jwt.sign(payload, process.env.secretkey, { expiresIn: '12h' });
                res.status(200).json({ status: 'sucess', message: 'login successfully...', data: user, token: token });

            }
            else {
                res.send("invalid  credentials");
            }
        } else {
            res.send("invalid credentials");
        }
    } catch (error) {
        console.log(error);
    }
};


exports.profile = async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(300).json({"success":false,"msg":"please login to continue"});
        }
        return res.status(300).json({"success":true,"data":user});
        
    } catch (e) {
        console.log(e);
        
    }
}

exports.getuser = async(req,res)=>{
    try {

        const data = await User.findAll();
        return res.status(300).json({"success":true,"data":data});
        
    } catch (e) {
        console.log(e);
        
    }
}


