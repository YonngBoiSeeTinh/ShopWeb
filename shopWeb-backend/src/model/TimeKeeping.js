const mongoose = require('mongoose');
const timekeepingSchema = new mongoose.Schema(
    {   
        userId: { type: String, required: true },
        name: { type: String, required: true },
        status: { type: String, required: true },
        date:{type: Date, required: true}
    },{
        timestamps: true
    }
);

const TimeKeeping = mongoose.model("TimeKeeping",timekeepingSchema);
module.exports = TimeKeeping;