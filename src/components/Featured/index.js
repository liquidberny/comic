import Carousel from 'react-bootstrap/Carousel';

import image1 from '../../assets/images/featured1.jpg';
import image2 from '../../assets/images/featured2.jpg';

function Featured() {
  return (
    <Carousel>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={image2}
          alt="First slide"
          width="800" height="500"
        />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
            className="d-block w-100"
            src={image1}
            alt="Second slide"
            width="800" height="500"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Featured;