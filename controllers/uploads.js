const { response } = require("express");
const { v4: uuid } = require('uuid');


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
                ok: true,
                msg: 'Error al guardar imagen',
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Guardado correctamente',
            file: fileName
        });

    });


}


module.exports = {
    fileUpload
}