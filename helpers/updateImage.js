const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const User = require("../models/User");
const fs = require('fs');

const updateImage = async (type, id, fileName) => {

    let instance = null;
    let error = '';

    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return { ok: false, msg: 'El doctor no exite' }
            }

            const oldPath = `./uploads/doctors/${doctor.image}`;
            
            if (fs.statSync(oldPath).isFile()) {
                fs.unlinkSync(oldPath)
            }

            doctor.image = fileName;
            await doctor.save();
            return { ok: true }

            break;
        case 'hospitals':
            instance = await Hospital.findById(id);
            error = 'El hospital no es válido';
            break;
        case 'users':
            instance = await User.findById(id);
            error = 'El usuario no es válido';
            break;
    }

    if (!instance) {
        return { ok: false, msg: error }
    }


}

module.exports = {
    updateImage
}