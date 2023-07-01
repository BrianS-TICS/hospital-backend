const { response } = require('express')
const User = require('../models/User.js');


const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email rol google');
    res.json({
        users
    })

}

const storeUser = async (req, res = response) => {

    const { email, password, name } = req.body;

    try {

        const emailExist = await User.findOne({ email })

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: "Este correo ya ha sido utilizado"
            })
        }

        const user = new User(req.body)

        await user.save();

        res.json({
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado. Favor de revisar logs"
        })

    }
}


module.exports = {
    getUsers,
    storeUser
}