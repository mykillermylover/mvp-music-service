const ApiError = require("../exceptions/api-error");
const mongoose = require("mongoose");
const logSchema = require('../models/log-model');
const expressWinston = require("express-winston");

class LogController {
    async getLogs(req, res, next) {
        try {
            if(req.user.role < 2)
                return next(ApiError.RoleError());
            const logModel = mongoose.model('DebugLog',
                logSchema,'debugLogs');
            const logs = await logModel.find().limit(50);
            return res.json(logs);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new LogController();