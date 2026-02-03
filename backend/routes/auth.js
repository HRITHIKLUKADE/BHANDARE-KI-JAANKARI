const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");  // Use bcryptjs for consistency

const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password (bcryptjs API)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({ msg: "User Registered Successfully" });
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    console.log("Login attempt for email:", email);
    console.log("Password provided:", password);

    const user = await User.findOne({email});
    if(!user){
        console.log("User not found");
        return res.status(400).json({ msg: "Invalid Credentials" });
    }

    console.log("User found:", user.email);
    console.log("Stored hash:", user.password);

    const same = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", same);
    
    if(!same){
        console.log("Password mismatch");
        return res.status(400).json({ msg: "Invalid Credentials" });
    }

    console.log("Login successful");
    return res.status(200).json({ msg: "Login Successful" });

});
module.exports = router;
