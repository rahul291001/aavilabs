const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();



app.use(cors());

app.use(bodyParser.json());

    mongoose.connect('mongodb+srv://rahulsgoud:Rahul*4321@cluster0.by4ul0n.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => 
    {
        console.log('Connected to MongoDB');
    });

    
    const authRoutes = require('./routes/authRoutes');
    app.use('/auth', authRoutes);

    const assignTask = require('./routes/taskRoutes');
    app.use('/task', assignTask);

        
    const port = process.env.PORT || 8001;
    app.listen(port, () =>  
    {
        console.log(`Server is running on port ${port}`);
    });
