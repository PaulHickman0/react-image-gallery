import './image-board.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ImageBoard extends PureComponent {
    // Prop types
    static propTypes = {
        data: PropTypes.array
    };

    // Default props
    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);
    }

    render() {

        const { data } = this.props;

        return (
            <div className="c-image-board__container">
                {data.map((image, i) => (
                    <div key={`image_${i}`} className="c-image-board__item">
                        <div className="c-image-board__item-title">
                            <h3>{image.title}</h3>
                        </div>
                        <img src={image.image} className="c-image-board__item-background" />
                    </div>
                ))}
            </div>
        );
    }
}