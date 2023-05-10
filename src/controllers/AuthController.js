const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require('../models/User');

class AuthController {

    // [POST] api/auth/login
    async login(req, res, next) {
        const { userName, password } = req.body;

        // Tìm user theo userName
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "Not Found" });
        }

        // So sánh password đã mã hóa với password nhập vào
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Invalid password" });
        }
        
        const token = jwt.sign(
            { 
                user
            },
        "your-secret-key");

        res.json({ 
            token,
            role: user.role
        });
    }
}

module.exports = new AuthController();