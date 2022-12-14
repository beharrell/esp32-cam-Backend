from genericpath import exists
from mtcnn import MTCNN
import cv2
import os
import time
from os import listdir, remove, rename
from os.path import isfile, join

def FileIsclosed(file):
    try:
        rename(file, file)
        return True
    except OSError as e:
        print(e);
        return False;
        
    return False;

def ListFiles(path):
  onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
  for file in onlyfiles:
    if file.startswith("im") and file.endswith("jpg"):
        fileName = join(path, file)
        if FileIsclosed(fileName) == False:
            time.sleep(5)

        cameraName = file.split('_')[1]
        dirName = path + "processedImages/" + cameraName
        if os.path.isdir(dirName) is False:
            os.makedirs(dirName)
            os.makedirs(dirName + "/faces")
            os.makedirs(dirName + "/detect")
            os.makedirs(dirName + "/current")

        if detectFace(fileName):
            print("Found face in " + file)
            newName = dirName + "/faces/" + file
            rename(fileName, newName) 
        elif "current" in file:
            newName = dirName + "/current/" + file
            rename(fileName, newName) 
        elif "detect" in file:
            newName = dirName + "/detect/" + file
            rename(fileName, newName)
        else:
            remove(fileName)

def detectFace(fileName):
    print("Examining " + fileName)
    image = cv2.cvtColor(cv2.imread(fileName), cv2.COLOR_BGR2RGB)
    result = detector.detect_faces(image)
    return len(result) != 0



detector = MTCNN()
while True:
    ListFiles("../uploads/")
    time.sleep(60)
