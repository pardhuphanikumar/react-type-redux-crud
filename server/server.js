const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
var corsOptions = {
    origin: function (origin, callback) {
        // if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
        // } else {
        // callback(new Error('Not allowed by CORS'))
        // }
    }
}
app.use(cors(corsOptions));
// app.use = (cors());
// app.use(cors({
//     origin(origin: any, callback: any) {
//         console.error('origin', origin);
//         console.error('callback', callback);
//         if (!origin) callback(new Error('deny'));
//     }
// }));
app.use(express.json());
const connectDB = require("./config");
connectDB();
// const uri = process.env.ATLAS_URI;
// mongoose.connect('mongodb://localhost/mern', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('mongoDb connection established successfully');
// });

const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/user');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

// req.headers.origin || req.headers.host
