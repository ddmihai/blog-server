import mongoose from "mongoose";

const operationsSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },

    value: {
        type: Boolean,
        default: false
    }
});

const Operations = mongoose.model('Operations', operationsSchema);
export default Operations;