import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAlbums } from 'store/actions';
import './album.scss';

/**
 * Album page component
 * 
 * @class Album
 * @extends { Component }
 */
export class Album extends Component {

    // Prop types
    static propTypes = {
        getAlbums: PropTypes.func,
        albums: PropTypes.object,
        isLoading: PropTypes.bool,
        error: PropTypes.bool,
    };

    // Default props
    static defaultProps = {
        getAlbums: () => null,
        albums: [],
        isLoading: false,
        error: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        if (!Object.keys(this.props.albums).length) {
            this.props.getAlbums();
        }
        
    }

    /**
     * Gets images belponging to a specific album ID 
     * @param  {Number} id   ID of album
     * @return {Array}       Array of images belonging to given album
     */
    getAlbumImages(id) {
        return this.props.albums[id] || [];
    }

    render() {

        const { isLoading, error, match = {} } = this.props;
        const { albumId = 'Unknown' } = match.params;
        const images = this.getAlbumImages(albumId);

        return (
            <div className="album">
                <h1>{`Album ${albumId}`}</h1>
                <div className="album__list">
                    {isLoading && (
                        <div> LOADING </div>
                    )}
                    {error && (
                        <div> ERROR </div>
                    )}
                    {!!images.length && (
                        images.map(image => (
                            <div>{image.id}</div>
                        ))
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    albums: state.gallery.albums,
    isLoading: state.gallery.isLoading,
    error: state.gallery.error,
});

const mapDispatchToProps = (dispatch) => ({
    getAlbums: () => dispatch(getAlbums())
});

export default connect(mapStateToProps, mapDispatchToProps)(Album)