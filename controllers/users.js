const User = require('../models/User.js');


const getUsers = (req, res) => {

    res.json({
        users
    })
}

const storeUser = async (req, res) => {

    const { email, password, name } = req.body;

    const user = new User(req.body)

    await user.save();

    res.json({
        user
    })
}


module.exports = {
    getUsers,
    storeUser
}