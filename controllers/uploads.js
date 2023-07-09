const { response } = require("express");
const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs');

const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const User = require("../models/User");
const { updateImage } = require("../helpers/updateImage");


const fileUpload = (req, res = response) => {

    const file = req.files.image;
    const type = req.params.type;
    const id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    const validInstancesTypes = ['users', 'doctors', 'hospitals'];

    if (!validInstancesTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: "El tipo de instancia es incorrecto, debe ser, users | doctos | hospitals"
        })
    }

    const shortName = file.name.split('.');
    const extension = shortName[shortName.length - 1];

    const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];
    if (!validExtensions.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'No se permite la extensión'
        })
    }

    const fileName = `${uuid()}.${extension}`;

    const path = `./uploads/${type}/${fileName}`;

    file.mv(path, async (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: "Error al mover la imagen"
            });
        }

        const result = await updateImage(type, id, fileName)

        if (!result.ok) {
            return res.status(500).json({
                ok: false,
                msg: result.msg,
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Guardado correctamente',
            file: fileName
        });

    });


}

const getImage = (req, res = response) => {

    const type = req.params.type;
    const image = req.params.image;

    let pathImg = path.join(__dirname, `../uploads/${type}/${image}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);

    }

}


module.exports = {
    fileUpload,
    getImage
}