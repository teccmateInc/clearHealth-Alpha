const mongoose = require('mongoose');

const facilitiesSchema = new mongoose.Schema({
    nameOfDoctor: { type: String, required: true },
    doctorDepartment: { type: String, required: true },
    treatmentDuration: { type: String, required: true },
    medicalCondition: { type: String, required: true },
    purposeOfVisit: { type: String, required: true },
    location: {type: String, required: true},
    lastVisit: { type: String, required: true }

});

module.exports = Facility = mongoose.model('facility', facilitiesSchema);