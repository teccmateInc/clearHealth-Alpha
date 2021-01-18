const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const auth = require('../middleware/auth')

router.post("/register", async (req, res) => {
    try {
        let { firstname, lastname, email, password, passwordCheck, icNumber } = req.body;

        let myRegExp = new RegExp(/\d{6}-\d{2}-\d{4}$/);

        // VALIDATE IF FIELDS ARE EMPTY
        if( !firstname || !lastname || !email || !password || !passwordCheck || !icNumber ){
            return res.status(400).json({ msg: 'Not All Fields Have Been Entered' });
        }

        if( password.length < 5 ){
            return res.status(400).json({ msg: 'Password Needs To Be Atleast 5 Characters Long.' });
        }
        if( password !== passwordCheck ){
            return res.status(400).json({ msg: 'Enter The Same Password Twice For Verification' });
        }
        if( !myRegExp.test(icNumber) ){
            return res.status(400).json({ msg: 'IC Number Is Invalid' });
        }

        const existingUser = await User.findOne({ email: email })
        if(existingUser) {
            return res.status(400).json({ msg: 'Account With This Email Already Exists' });
        }
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname, 
            lastname,
            email,
            password: passwordHash,
            icNumber
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json( { error: err.message } )
    }
});

router.post('/login', async (req, res) => {
    try
    {
        const { email, password } = req.body;
        if(!email || !password)
        {
            return res.status(400).json({ msg: 'Not All Fields Have Been Entered.', success: false });
        }

        const user = await User.findOne( { email: email } );
        if(!user)
        {
            return res.status(400).json({ msg: 'No Account With This Email Has Been Registered', success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).json({ msg: 'Invalid Credentials', success: false });
        }

        const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET);
        res.json({
            success: true,
            token,
            user:{
                id: user._id,
                displayName: user.firstname + ' ' + user.lastname
            }
        });

    } 
    catch (err) 
    {
        res.status(500).json( { error: err.message, success: false } )
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.firstname + ' ' + user.lastname,
        id: user._id
    });
});

module.exports = router;