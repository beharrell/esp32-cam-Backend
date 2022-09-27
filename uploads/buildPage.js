function BuildPage(imageFiles) {
    var anchorAll = document.createElement('div')
    var button = document.createElement('button');
    button.innerHTML="Delete All";
    button.onclick = function(){DeleteAction("ALL", anchorAll, document.getElementById('images'))};
    anchorAll.appendChild(button);
    document.getElementById('images').appendChild(anchorAll);

    imageFiles.forEach(image => {
        var anchor = document.createElement('div')
        var button = document.createElement('button');
        button.innerHTML="Delete";
        anchor.appendChild(button);
        anchor.appendChild(document.createElement('br'));
        
        var imageElement = document.createElement('img');
        imageElement.src = image;
        anchor.appendChild(imageElement);
        anchor.appendChild(document.createElement('br'));
        anchorAll.appendChild(anchor);

        button.onclick = function(){DeleteAction(image, anchor, anchorAll)};
    });
}

function DeleteAction(imageName, anchor, parent)
{
    parent.removeChild(anchor);
    const json = {
        imagePath: imageName,
    };

    fetch("/Delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
    });
}