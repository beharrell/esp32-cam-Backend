import React from 'react';
import { model } from './Model'

class ImageDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div class="container">
                <img src="../../uploads/processedImages/im_ec62609df44816_53_593dect.jpg" />
                <img src="http://placehold.it/50" />
                <img src="http://placehold.it/50" />
        </div>
    }
}

export default ImageDisplay;