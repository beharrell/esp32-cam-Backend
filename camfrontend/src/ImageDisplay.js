import React from 'react';

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            currentImage: "None",
            detectImage: "None",
            detectedImages: [],
            currentTimeStamp: "",
            detectedTimeStamp: ""
        };
    }

    HandleNewImage(imageData) {
        if (imageData === null) {
            return
        }

        if (imageData.current !== null) {
            this.setState({ currentImage: '../../' + imageData.current })
            var nameParts = imageData.current.split("_")
            var timestamp = nameParts[nameParts.length - 2] + " " + nameParts[nameParts.length - 1]
            this.setState({ currentTimeStamp: timestamp })
        }

        if (imageData.detect != null) {
            var imageName = '../../' + imageData.detect
            if (!this.state.detectedImages.includes(imageName)) {
                nameParts = imageData.detect.split("_")
                var imageSeries = nameParts[nameParts.length - 2]
                console.log(`series ${imageSeries}`);
                if (this.state.detectedImages.length === 0 ||
                    !this.state.detectedImages[0].includes(imageSeries)) {
                    console.log("Setting " + imageName);
                    this.setState({
                        detectedImages: [imageName],
                        detectedTimeStamp: imageSeries,
                    });

                }
                else {
                    console.log("Adding " + imageName);
                    this.setState({ detectedImages: this.state.detectedImages.concat([imageName]) })
                    console.log(`list len ${this.state.detectedImages.length}`);
                }

                this.setState({ detectImage: imageName })
            }
        }
    }

    componentDidMount() {
        console.log("From " + window.location.origin);
        if (this.state.events == null) {
            console.log("Requesting event source");
            var callBack = new EventSource('http://localhost:8080/../../events');

            callBack.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                console.log("Got Message" + event.data);
                this.HandleNewImage(parsedData)
            }
            callBack.onerror = (event) => {
                console.log("Got error ");
            }
            callBack.onopen = (event) => {
                console.log("Opened connection to " + this.state.events.url);
            }
            this.setState({ events: callBack });
        }

    }

    render() {
        return <div>
            <h2>Current</h2>
            <img id="current" src={this.state.currentImage} alt="current" />
            <br />
            {this.state.currentTimeStamp}
            <br />
            <h2>Detected</h2>
            {this.state.detectedTimeStamp}
            <br />
            {
                this.state.detectedImages.map(function (d, idx) {
                    return (<img id={idx} src={d} alt={d} width="160" />)
                })}
        </div>
    }
}

export default Images;