const { response } = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/JWT.js')

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email rol google');
    res.json({
        ok: true,
        uid: req.uid,
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

        // Generate a verification token
        const token = await generateJWT( user.id, user.name, user.role)


        res.json({
            user,
            token
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

        const { password, google, email, ...filds } = req.body;

        if (user.email !== email) {
            const emailExist = await User.findOne({ email })
            if (emailExist) {
                return res.status(400).json({
                    ok: false,
                    msg: "Este correo ya ha sido utilizado"
                })
            }
        }

        filds.email = email;
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

const deleteUser = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: "El usuario no existe"
                }
            )
        }

        const deleted = await User.findByIdAndDelete(uid, { new: true });

        res.status(200).json({
            ok: true,
            msg: "Eliminado correctamente",
            deleted
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error inesperado",
        })
    }

}


module.exports = {
    getUsers,
    storeUser,
    updateUser,
    deleteUser
}