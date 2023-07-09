const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const User = require("../models/User");
const fs = require('fs');

const deleteImage = (oldPath) => {
    try {
        if (fs.existsSync(oldPath) && fs.statSync(oldPath).isFile()) {
            fs.unlinkSync(oldPath);
            return { ok: true };
        } else {
            return { ok: true, error: 'empty' };
        }
    } catch (err) {
        msg = 'Error inesperado al eliminar imagen: ' + err;
        return { ok: false, msg, error: err };
    }
};

const updateImage = async (type, id, fileName) => {

    let oldPath = '';
    let result = null;
    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            
            if (!doctor) {
                return { ok: false, msg: 'El doctor no exite' }
            }

            oldPath = `./uploads/${type}/${doctor.image || ''}`;
            result = deleteImage(oldPath);

            if (!result.ok) {
                return { ok: false, msg: result.msg }
            }

            if (result.error == 'empty') {
                doctor.image = '';
                await doctor.save();
            }

            doctor.image = fileName;
            await doctor.save();
            return { ok: true };
            break;

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return { ok: false, msg: 'El hospital no exite' }
            }

            oldPath = `./uploads/${type}/${hospital.image || ''}`;
            result = deleteImage(oldPath);

            if (!result.ok) {
                return { ok: false, msg: result.msg }
            }

            if (result.error == 'empty') {
                hospital.image = '';
                await hospital.save();
            }

            hospital.image = fileName;
            await hospital.save();
            return { ok: true };
            break;
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                return { ok: false, msg: 'El usuario no exite' }
            }

            oldPath = `./uploads/${type}/${user.image || ''}`;
            result = deleteImage(oldPath);

            if (result.error == 'empty') {
                user.image = '';
                await user.save();
            }

            user.image = fileName;
            await user.save();

            return { ok: true };
            break;
    }

}

module.exports = {
    updateImage
}