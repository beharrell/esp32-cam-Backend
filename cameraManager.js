const fs = require('fs');

class CameraManager
{
  constructor()
  {
    this.clientResponse = null
    this.currectDir = "uploads/processedImages/ec62609df448/current/"
    this.detectDir = "uploads/processedImages/ec62609df448/detect/"
    this.camera  = {
      current : null,
      detect: null
    };

    fs.watch(this.currectDir, (eventType, filename) => {
      this.DirectoryListener(this.currectDir,"current", eventType, filename);
    })

    fs.watch(this.detectDir, (eventType, filename) => {
      this.DirectoryListener(this.detectDir,"detect", eventType, filename);
    })
  }

  DirectoryListener(dir, field, eventType, filename)
  {
    console.log("\nThe file", filename, "was modified!");
      console.log("The type of change was:", eventType);
      if (eventType == "change")
      {
        this.camera[field] = dir + filename;
        this.updateCameraListener()
      }
  }  
  updateCameraListener() {
    if (this.clientResponse != null)
    {
      this.clientResponse.write('id: 1\n');
      this.clientResponse.write('event: message\n');
      var data = "data: " + JSON.stringify(this.camera) + "\n\n";
      this.clientResponse.write(data);
      this.clientResponse.write("\n\n");
      console.log(`Sending ${data}`)
    }
  }

  setClient(client)
  {
    this.clientResponse = client
    this.updateCameraListener()
  }
};

module.exports = CameraManager