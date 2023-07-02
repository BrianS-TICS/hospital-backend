const { response } = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

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

        // To change password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

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

const updateUser = async (req, res = response) => {

    const uid = req.params.id;
    try {

        const user = await User.findById(uid)
        if (!user) {

            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe"
            })

        }

        const filds = req.body;
        const { email } = filds;

        if (user.email === email) {
            delete filds.email;
        } else {
            const emailExist = await User.findOne({ email })
            if (emailExist) {
                return res.status(400).json({
                    ok: false,
                    msg: "Este correo ya ha sido utilizado"
                })
            }
        }

        delete filds.password;
        delete filds.google;

        const userUpdated = await User.findByIdAndUpdate(uid, filds, { new: true });

        res.status(200).json({
            ok: true,
            user: userUpdated
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = {
    getUsers,
    storeUser,
    updateUser
}