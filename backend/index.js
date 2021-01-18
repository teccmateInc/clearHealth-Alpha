const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ABOVE ARE THE IMPORTED LIBRARIES

// SETTING UP EXPRESS

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));

// SETTING UP MONGOOSE

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}, (err) => {
    if (err) throw err;
    console.log('Mongoose Connection Established');
});

// SET UP ROUTES

app.use('/users', require('./routes/userRouter'));
app.use('/facilities', require('./routes/facilitiesRouter'));
app.use('/consent', require('./routes/consentRouter'));
app.use('/requests', require('./routes/requestRouter'));
app.use('/records', require('./routes/recordRouter'));