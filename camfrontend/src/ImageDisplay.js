import multer from 'multer';
import React from 'react';

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            currentImage: "None",
            detectImage: "None",
            detectedImages: [],
            timeStamp: ""
        };
    }

    HandleNewImage(imageData)
    {
        if (imageData === null)
        {
            return
        }

        if (imageData.current !== null) {
            this.setState({ currentImage: '../../' + imageData.current })
            var nameParts = imageData.current.split("_")
            var timestamp = nameParts[nameParts.length - 2] + " " + nameParts[nameParts.length - 1]
            this.setState({ timeStamp: timestamp })
        }

        if (imageData.detect != null) {
            var imageName = '../../' + imageData.detect
            if (!this.state.detectedImages.includes(imageName)) {
                var nameParts = imageData.current.split("_")
                var imageSeries = nameParts[nameParts.length - 2]
                if (this.state.detectedImages.length !== 0 &&
                    !this.state.detectedImages[0].includes(imageSeries)) {
                    this.setState({ detectedImages: [imageName] });
                }
                else {
                    this.setState(prevState => ({
                        imageName: [...prevState.detectedImages, imageName]
                    }))
                }

                this.setState({ detectImage: imageName })
            }
        }
    }

    componentDidMount() {
        console.log("From " + window.location.origin);
        if (this.state.events == null) {
            console.log("Requesting event source");
            this.state.events = new EventSource('http://localhost:8080/../../events');

            this.state.events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                console.log("Got Message" + event.data);
                this.HandleNewImage(parsedData)
            }
        }
        this.state.events.onerror = (event) => {
            console.log("Got error ");
        }
        this.state.events.onopen = (event) => {
            console.log("Opened connection to " + this.state.events.url);
        }
    }

    render() {
        return <div>
            <img id="current" src={this.state.currentImage} />
            <br />
            {this.state.timeStamp}
            <br />
            <img  id="detect" src={this.state.detectImage} />
        </div>
    }
}

export default Images;