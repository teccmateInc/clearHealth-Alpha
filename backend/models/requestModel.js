const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestType: { type: String, required: true },
    lastVisit: { type: String, required: true },
    message: { type: String, required: true }
});

module.exports = Request = mongoose.model('request', requestSchema);