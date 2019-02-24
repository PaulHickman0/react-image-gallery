import './image-slider.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

export default class ImageSlider extends PureComponent {
    // Prop types
    static propTypes = {
        data: PropTypes.array,
        interval: PropTypes.number,
        className: PropTypes.string
    };

    // Default props
    static defaultProps = {
        data: [],
        interval: 6000,
        transitionDuration: 2000,
        className: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };

        this.sliderInterval = null;
        this.nextImage = this.nextImage.bind(this);

        this.defaultStyle = {
            transition: `opacity ${props.transitionDuration}ms ease-in-out`,
            opacity: 0,
        };

        this.transitionStyles = {
            entering: { opacity: 0 },
            entered:  { opacity: 1 },
            exiting: { opacity: 1 },
            exited: {  }
        };
    }

    componentDidMount() {
        this.sliderInterval = setInterval(this.nextImage, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.sliderInterval);
    }

    nextImage() {
        let { activeIndex } = this.state;
        const { data } = this.props;

        const index = ++activeIndex < data.length ? activeIndex : 0;
        this.setState({activeIndex: index});
    }

    render() {

        const { data, transitionDuration, className } = this.props;
        const { activeIndex } = this.state;

        return (
            <div className={`c-image-slider__container ${className}`}>
                {data.map((image, index) => (
                    <Transition key={`image_slider${index}`} in={activeIndex === index} timeout={transitionDuration}>
                        {(state) => (
                            <div
                                className="c-image-slider__item"
                                style={{backgroundImage: `url(${image})`, ...this.defaultStyle, ...this.transitionStyles[state]}}
                            />
                        )}
                    </Transition>
                ))}
            </div>
        );
    }
}