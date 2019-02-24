import './image.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Image extends PureComponent {
    // Prop types
    static propTypes = {
        id: PropTypes.string,
        thumbnailUrl:  PropTypes.string,
    };

    // Default props
    static defaultProps = {
        id: '',
        thumbnailUrl: '',
    };

    constructor(props) {
        super(props);
    }

    render() {

        const { id, thumbnailUrl } = this.props;

        return (
            <div className="c-image">
                <h4>{`Image ${id}`}</h4>
                <img src={thumbnailUrl} />
            </div>
        );
    }
}