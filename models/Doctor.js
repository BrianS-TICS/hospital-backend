const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }
})

DoctorSchema.index({ name: 'text' });


DoctorSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Doctor', DoctorSchema)