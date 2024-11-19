const express = require('express');
const app = express();
const fs = require('fs');

const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); // static files : css, js, images etc.
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    fs.readdir(`./files`, function(err, files){ // read files in directory
        res.render('index', {files: files}); // render index.ejs
    })
})

app.get('/file/:fileName', function(req, res) {
    fs.readFile(`./files/${req.params.fileName}`, 'utf-8', function(err, filedata) {
        res.render('show', {fileName: req.params.fileName, filedata: filedata});
    })
})


app.get('/edit/:fileName', function(req, res) {
    res.render('edit', {fileName: req.params.fileName});
})

app.post('/edit', function(req, res) {
    fs.rename(`./files/${req.body.previousName}`, `./files/${req.body.newName}`, function(err) {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    })
})

app.post('/create', function(req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    }); // create file
})



app.listen(3000, function() {
    console.log('Server is running on port 3000');
})