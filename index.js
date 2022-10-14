'use strict';
var CameraManager = require('./cameraManager')
var express = require('express')
var multer = require('multer')
var bodyParser = require("body-parser");
const fs = require('fs');
const cors = require("cors");
const PORT = process.env.PORT || 8080;
var uploadParams =
{
  detectionSleepTime: 1000000,
  monitorSleepTime: 2000000,
  detectionUploadCount: 10,
  monitorUploadCount: 5,
  saveIntermidiate: true,
  time: "time",

  threshold: 50,
  movementPixelCount: 10,
  ignorePixelCount: 2,
  halfDilationKernelSize: 3,
  halfErrodeKernelSize: 2
};

var app = express()
let cameraManager = new CameraManager();




var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use(express.json({ extended: false }));
app.set('trust proxy', true)
const testFolder = 'uploads/processedImages/';

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);
  cameraManager.setClient(response);

  //response.write(`data: ${JSON.stringify(camera)}\n\n`);
  console.log("Added listener");

  request.on('close', () => {
    console.log(`client Connection closed`);
    response = null;
  });
}

app.get('/events', eventsHandler);

app.post('/setParams', function (req, res) {
  uploadParams = req.body;
  var response = "";
  return res.send(response);
})

app.get('/params', function (req, res, next) {
  console.log("Get called on /params");
  uploadParams.time = new Date().toLocaleTimeString('en-US', { hour12: false }).replaceAll(":", "");
  var json = JSON.stringify(uploadParams);
  console.log(json);
  res.send(json);
});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.get('/found', function (req, res, next) {
  console.log("Building script");
  let script = '<script type="text/javascript" src="uploads/buildPage.js"></script>\n';
  script += "<script>\n const images = [\n";
  let response = '<div id="images"/>\n';
  fs.readdir(testFolder, (err, files) => {
    for (let i = 0; i < files.length; i++) {
      var fullName = testFolder + files[i];
      script += `"${fullName}"\n`;
      if (i < files.length - 1) {
        script += ',';
      }
    }
    script += '];\nBuildPage(images);\n</script>'
    response += script;
    console.log(response);
    res.send(response);
  });
})

app.post('/Delete', function (req, res) {
  if (req.body.imagePath == "ALL") {
    fs.readdir(testFolder, (err, files) => {
      for (let i = 0; i < files.length; i++) {
        var fullName = testFolder + files[i];
        fs.unlink(fullName, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
    });
  }
  else {
    fs.unlink(req.body.imagePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  console.log('B: ' + req.body.imagePath);
  var response = "";
  return res.send(response);
})

app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  var response = new Date().toLocaleTimeString('en-US', { hour12: false }).replaceAll(":", "_")
  return res.send(response)
})

app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
  // req.files is array of `profile-files` files
  // req.body will contain the text fields, if there were any
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  for (var i = 0; i < req.files.length; i++) {
    response += `<img src="${req.files[i].path}" /><br>`
  }

  return res.send(response)
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}! :) ${new Date().toLocaleTimeString('en-US', { hour12: false }).replaceAll(":", "_")}`))