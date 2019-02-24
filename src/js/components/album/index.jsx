import './album.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export default class Footer extends PureComponent {
    // Prop types
    static propTypes = {

    };

    // Default props
    static defaultProps = {
        id: '',
        thumbnail: '',
        images: [],
    };

    constructor(props) {
        super(props);
    }

    render() {

        const { id, thumbnail } = this.props;

        return (
            <div className="c-album">
                <h3>{`Album ${id}`}</h3>
                <div className="c-album__thumb">
                    <img src={thumbnail} />
                </div>
            </div>
        );
    }
}