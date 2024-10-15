const express = require('express');
const dotenv = require('dotenv');

//routes
const adminRoutes = require('./Routes/admi.routes');
const userRoute = require('./Routes/user.routes')

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => (
    res.status(200).json({message : 'server ruuning'})
));

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoute)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })