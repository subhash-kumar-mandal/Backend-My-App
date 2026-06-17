const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
       
    }
})


module.exports = mongoose.model('Verify',verifySchema);