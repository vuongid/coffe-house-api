
const bcrypt = require('bcrypt');
const User = require('../models/User');


class UserController {
    // [POST] api/user/add
    async add(req, res, next) {
        const {userName, password, name, email, address, phone} = req.body;
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(409).json({ message: "User name already exists" });
          }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            userName,
            password: hashedPassword,
            name,
            email,
            address,
            phone
        });
        await user.save();
        res.status(201).json({ message: "User created" });

    }

    // [GET] api/user/get
    async get(req, res, next) {
        const list = await User.find()
        res.json(list)
    }

    // [GET] api/user/me
    me(req,res,next) {
        res.json(req.user);
    }

}

module.exports = new UserController();