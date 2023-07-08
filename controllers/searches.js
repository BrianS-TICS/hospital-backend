const { response } = require("express");
const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");

const getAll = async (req, res = response) => {

    const search = req.params.search || '';
    const regex = new RegExp(search, 'i');

    const [users, hospitals, doctors] = await Promise.all([
        User
            .find({ name: regex }),
        Hospital
            .find({ name: regex }),
        Doctor
            .find({ name: regex }),
    ]);

    res.status(200).json({
        ok: true,
        users,
        hospitals,
        doctors
    })
}


const getDocumentsCollection = async (req, res = response) => {

    const table = req.params.table || '';
    const search = req.params.search || '';

    const regex = new RegExp(search, 'i');
    let data = [];

    switch (table) {
        case 'users':
            data = await User.find({ name: regex })
            break;

        case 'doctors':
            data = await Doctor.find({ name: regex })
            .populate('user', 'name img')
            .populate('hospital', 'name')

            break;
        case 'hospitals':
            data = await Hospital.find({ name: regex })
            .populate('user', 'name img')

            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La colección no es conocida.'
            })
    }

    res.status(200).json({
        ok: true,
        data
    });

}






module.exports = {
    getAll,
    getDocumentsCollection
};