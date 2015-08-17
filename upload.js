var express = require('express');
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });
var app = express();
var del = require('del');

app.post('/upload', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any
  var f = req.file;
  if (f) {
      var ext = f.originalname.replace(/.*(\.\w+)$/gi, '$1');
      var newPath = f.destination + f.filename + ext;
      fs.renameSync(f.path, newPath);
      res.send('//' + req.header('Host') + '/' + f.filename + ext);
  } else {
    res.send('false');
  }
});

app.get('/clean', function (req, res) {
  del(['uploads/**', '!uploads'], function (err, paths) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        success: true,
        files: paths
      });
    }
  });
});

app.use(express.static(__dirname + '/uploads'));

app.listen(8088);
console.log('listening to 8088');
