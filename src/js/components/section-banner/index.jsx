import './section-banner.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FormatLayout extends PureComponent {
    // Prop types
    static propTypes = {
        hideBottom: PropTypes.bool,
    };

    // Default props
    static defaultProps = {
        hideBottom: false,
    };

    constructor(props) {
        super(props);
    }

    render() {

        const { hideBottom, children } = this.props;

        return (
            <div className={`c-section-banner ${hideBottom ? 'has-no-bottom' : ''}`}>
                <div className="c-section-banner__top" />
                <div className="c-section-banner__content">
                    {children}
                </div>
                {!hideBottom && <div className="c-section-banner__bottom" />}
            </div>
        );
    }
}