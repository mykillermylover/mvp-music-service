const {Schema, model} = require('mongoose');
const LogSchema = new Schema({
    timestamp: {type: Date},
    level: {type: String},
    message: {type: String},
    meta: {
        res:{
            body: {
                user: {                    email: String,
                    isActivated: Boolean,
                    role: Number
                },
                statusCode: Number
            }
        }
    }
})

module.exports = LogSchema;