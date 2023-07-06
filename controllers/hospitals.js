const { response } = require("express")
const mongoose = require('mongoose');

const Hospital = require("../models/Hospital");
const User = require("../models/User");

const getHospitals = async (req, res = response) => {

    const hospitals = await Hospital.find()
        .populate('user', 'name image');

    res.status(200).json({
        ok: true,
        hospitals,
    })

}

const storeHospital = async (req, res = response) => {

    const uid = req.uid;
    const { image, user } = req.body;

    try {

        image === null | undefined && delete req.body.image;

        const hospital = new Hospital({
            user: uid,
            ...req.body
        });

        await hospital.save();

        res.status(200).json({
            ok: true,
            hospital
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error insesperado: " + error
        })
    }

}

const updateHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    const { image } = req.body;

    try {

        const findedHospital = await Hospital.findById(id);
        if (!findedHospital) {
            return res.status(400).json({
                ok: false,
                msg: "El hospital no es válido"
            })
        }


        image === null | undefined && delete req.body.image;

        const updatedHospital = await Hospital.findByIdAndUpdate(id, { user: uid, ...req.body }, { new: true });

        res.status(200).json({
            ok: true,
            updatedHospital
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado: " + error
        })
    }

}

const deleteHospital = async (req, res = response) => {

    const id = req.params.id;

    try {
        const hospital = await Hospital.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            deletedHospital: hospital
        });

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Error inesperado: " + error
        })
    }

}


module.exports = {
    getHospitals,
    storeHospital,
    updateHospital,
    deleteHospital
}