const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
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
    }
})

HospitalSchema.index({ name: 'text' });

HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema)