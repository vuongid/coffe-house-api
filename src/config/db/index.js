
const mongoose = require('mongoose');

async function connect(){
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.log('connect successfully !!!');
    } catch (error) {
        console.log('connect failure !!!');
    }
}

module.exports = { connect };