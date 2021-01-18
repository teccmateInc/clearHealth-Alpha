const mongoose = require('mongoose');

const consentSchema = new mongoose.Schema({
    patient: { type: String, required: true },
    signature: { type: String, required: true }

});

module.exports = Consent = mongoose.model('consent', consentSchema);