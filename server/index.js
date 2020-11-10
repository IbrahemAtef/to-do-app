const express = require('express');
const app = express();
const connectDB = require('../database/db');
const toDoModel = require('../database/model');
const cors = require('cors');

app.use(cors());

app.use(express.json({ extended: false }));

connectDB();

app.post('/api/addToDo', async (req, res) => {
    const { text } = req.body;
    let toDo = new toDoModel({
        text,
        index : await toDoModel.countDocuments(),
    })
    await toDo.save().then((resp) => {
        res.send(resp.id)
    }).catch(err => {
        res.send(err);
    })
});

app.get('/api/allList', async (req, res) => {
    await toDoModel.find({})
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err.message)
        })
})

app.delete('/api/deleteToDo/:index', async (req, res) => {
    const { index } = req.params
    await toDoModel.deleteOne({ index })
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err);
        })
});

app.delete('/api/deleteAll', async (req, res) => {
    await toDoModel.deleteMany({})
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err);
        })
});

if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));
    console.log(__dirname);
    // Handle SPA 
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html')); 
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
