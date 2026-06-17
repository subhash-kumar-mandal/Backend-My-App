
const mongoose = require('mongoose');



async function DBjoin(url) {
    try {

        const join = await mongoose.connect(url);
        console.log("Connented Succesfully DB");
    } catch (err) {

        throw new Error(err.message);
    }
};

module.exports = DBjoin;