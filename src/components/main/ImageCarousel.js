import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = () => {
    return (
        <div>
            <Carousel autoPlay showIndicators={false} dynamicHeight={true} showThumbs={false} height={"70%"}>
                <div>
                    <img height="600px" src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
                </div>
                <div>
                    <img height="600px" src="https://images.unsplash.com/photo-1437846972679-9e6e537be46e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" />
                </div>
                <div>
                    <img height="600px" src="https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
                </div>
            </Carousel>
        </div>
    );
};

export default ImageCarousel;