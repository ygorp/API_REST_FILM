const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = 3000;


const Film = mongoose.model('Film', { 
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
 });


app.get('/', async (req, res) => {
    const films = await Film.find();
  res.send(films);
});

app.delete('/:id', async (req, res) => {
    await Film.findByIdAndDelete(req.params.id);
    res.send('Film deleted');
});

app.put('/:id', async (req, res) => {
    await Film.findByIdAndUpdate(req.params.id, req.body);
    res.send('Film updated');
});

app.post('/', async (req, res) => {
    const film = new Film({ 
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
    })
    await film.save().then(() => console.log('Film saved'));
    res.send(film);
});

app.listen(port, () => {
    mongoose.connect('mongodb+srv://admin:KxG5R3RAAenLVPV2@cluster0.wkgqab9.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(`Example app listening at http://localhost:${port}`);
});