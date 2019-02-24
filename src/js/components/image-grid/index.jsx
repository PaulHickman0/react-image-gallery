import './image-grid.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ImageGrid extends PureComponent {
    // Prop types
    static propTypes = {
        className: PropTypes.string,
        isLoading: PropTypes.bool,
        error: PropTypes.bool,
    };

    // Default props
    static defaultProps = {
        className: '',
        isLoading: false,
        error: false,
    };

    constructor(props) {
        super(props);
    }

    render() {

        const { className, children, isLoading, error } = this.props;

        return (
            <div className={`c-image-grid ${className}`}>
                {!isLoading && !error && children}
            </div>
        );
    }
}