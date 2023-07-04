const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/JWT')

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "El correo no existe"
            });
        }

        // Valid password
        // bcript needs two arguments in it method compareSyncs, A password and a encrypted passsword to compare them.
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña es incorrecta"
            })
        }

        // Generate a verification token
        const token = await generateJWT(user.id, user.name, user.role)


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error no esperado : " + error
        })
    }
}

module.exports = {
    login
}