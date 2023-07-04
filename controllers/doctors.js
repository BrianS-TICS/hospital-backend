const { response } = require('express');
const User = require('../models/User.js');
const Hospital = require('../models/Hospital.js')
const Doctor = require('../models/Doctor.js')

const getDoctors = async (req, res) => {

    const doctors = await Doctor.find({});

    res.json({
        ok: true,
        doctors
    })

}

const storeDoctor = async (req, res = response) => {

    const authenticartedUserId = req.ui;
    const { hospital } = req.body

    try {

        const existHospital = await Hospital.findById(hospital);
        if (!existHospital) {
            return res.status(404).json({
                ok: false,
                msg: "El hospital es inválido"
            })
        }

        const doctor = new Doctor({
            user: authenticartedUserId,
            ...req.body
        })

        const createdDoctor = await doctor.save();

        res.json({
            ok: true,
            createdDoctor
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado: ' + error
        })
    }


}

const updateDoctor = async (req, res = response) => {

    const doctorId = req.params.id;
    const authenticartedUserId = req.uid;
    const { hospital } = req.body

    try {

        const existHospital = await Hospital.findById(hospital);
        if (!existHospital) {
            return res.status(400).json({
                ok: false,
                msg: "El hospital es inválido"
            })
        }

        const doctor = await Doctor.findById(doctorId)
        if (!doctor) {
            return res.status(400).json({
                ok: false,
                msg: "El doctor es inválido"
            })
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, {
            user: authenticartedUserId,
            ...req.body
        }, { new: true });


        res.status(200).json({
            ok: true,
            updatedDoctor
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado : " + error
        })
    }
}

const deleteDoctor = async (req, res = response) => {

    const doctorId = req.params.id;

    const doctor = await Doctor.findById(doctorId)
    if (!doctor) {
        return res.status(400).json({
            ok: false,
            msg: "El doctor es inválido"
        })
    }

    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    res.status(200).json({
        ok: true,
        deletedDoctor
    })


}


module.exports = {
    getDoctors,
    storeDoctor,
    updateDoctor,
    deleteDoctor
}