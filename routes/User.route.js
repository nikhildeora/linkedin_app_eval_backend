const express = require("express");
const { UserModel } = require("../models/Users.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city } = req.body;
    try {
        let findUser = await UserModel.find({ email });
        if (findUser.length === 0) {
            bcrypt.hash(password, 4, async function (err, hash) {
                if (err) {
                    res.send({ "msg": "Error in Register", "error": err })
                }
                else {
                    let user = new UserModel({ name, email, gender, password: hash, age, city })
                    await user.save();
                    res.send({ "msg": "User successfully registered" })
                }
            });
        } else {
            res.send({ "msg": "User already exist, please login" })
        }
    } catch (err) {
        res.send({ "msg": "Error in Register", "error": err })
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let findUser = await UserModel.find({ email });
        if (findUser.length > 0) {
            bcrypt.compare(password, findUser[0].password, function (err, result) {
                if (err) {
                    res.send({ "msg": "Wrong Credentials" })
                }
                if (result) {
                    let token = jwt.sign({
                        userId: findUser[0]._id
                    }, 'LinkedIn', { expiresIn: '1h' });
                    
                    res.send({ "msg": "User successfully login","token":token })
                } else {
                    res.send({ "msg": "Wrong Credentials" })
                }
            });
        } else {
            res.send({ "msg": "Wrong Credentials" })
        }
    } catch (err) {
        res.send({ "msg": "Error in Login", "error": err })
    }
})

module.exports = {
    userRoute
}

// "name" : "nikhil",
// "email" : "n@gmail.com",
// "gender" : "male",
// "password" : "nikhil",
// "age" : 24,
// "city" : "sheoganj"

// {
//     "email" : "p@gmail.com",
//     "password" : "pratik"
//       }