const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    patient: { type: String, required: true },
    facility: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    pdfFile: { type: String, required: true }
});

module.exports = Record = mongoose.model('record', recordSchema);