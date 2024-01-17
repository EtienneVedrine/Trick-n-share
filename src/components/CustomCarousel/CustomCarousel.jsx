import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types'
import './CustomCarousel.css' 

const CustomCarousel = ({ children }) => {
    return (
        <Carousel width='100%' showThumbs={false} showStatus={false} infiniteLoop={true} emulateTouch={true}>
            {children} 
        </Carousel>
        
    )
}

/* class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
}); */

CustomCarousel.propTypes = {
    children: PropTypes.node
}

export default CustomCarousel;