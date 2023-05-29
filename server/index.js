require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index.js');
const errorMiddleware = require('./middlewares/error-middleware');
const fileUpload = require('express-fileupload');
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-mongodb');
const {body} = require("express-validator");
const PORT = process.env.PORT;
const app = express();
const dirname = 'C:/OSPanel/domains/project/server/public/tracks';


app.use('/', express.static(dirname));

app.use(express.json());
app.use(fileUpload({}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use(expressWinston.logger({
    transports: [
        new winston.transports.MongoDB({
        handleExceptions: true,
        db: process.env.MONGO_ADDR,
        collection: 'errorLogs',
        capped: true,
        metaKey: 'meta',
        level: 'error'
    }),
        new winston.transports.MongoDB({
            handleExceptions: true,
            db: process.env.MONGO_ADDR,
            collection: 'debugLogs',
            capped: true,
            metaKey: 'meta',
            level: 'info'
        }),
    ],
    format: winston.format.json(),
    meta: true,
    responseWhitelist: ['body','body.errors','statusCode']
}));

app.use('/api', router);

app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ADDR);
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}
start();