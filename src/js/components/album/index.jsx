import './album.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'


export class CAlbum extends PureComponent {
    // Prop types
    static propTypes = {
        id: PropTypes.string,
        thumbnail: PropTypes.string,
    };

    // Default props
    static defaultProps = {
        id: '',
        thumbnail: '',
    };

    constructor(props) {
        super(props);
    }

    /**
     * Pushes new route to navigate browser to a specific album
     * @param  {Number} id   Id of album to navigate to
     */
    navigateToAlbum(id) {
        this.props.history.push(`/album/${id}`)
    }

    render() {

        const { id, thumbnail } = this.props;

        return (
            <div className="c-album">
                <h3>{`Album ${id}`}</h3>
                <div
                    className="c-album__thumb"
                    onClick={() => this.navigateToAlbum(id)}
                >
                    <img src={thumbnail} />
                </div>
            </div>
        );
    }
}

export default withRouter(CAlbum);