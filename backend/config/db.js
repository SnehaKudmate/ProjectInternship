const mongoose = require('mongoose');

const db = async() =>{
try {
    const db  = await mongoose.connect('mongodb://127.0.0.1:27017/Internship');
    if(db){
        console.log("database connected successfully")
    }
} catch (error) {
    console.log(error)
}
}
module.exports = db ;