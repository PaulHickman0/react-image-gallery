import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAlbums } from 'store/actions';
import Album from 'components/album';
import './home.scss';

/**
 * Home page component
 * 
 * @class Home
 * @extends { Component }
 */
export class Home extends Component {

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
        this.props.getAlbums();
    }

    render() {

        const { albums, isLoading, error } = this.props;
        console.log('HERE', Object.entries(albums))
        return (
            <div className="c-home">
                <h1>Image Gallery</h1>
                <div className="c-home__gallery">
                    {isLoading && (
                        <div> LOADING </div>
                    )}
                    {error && (
                        <div> ERROR </div>
                    )}
                    {!!Object.keys(albums).length && (
                        Object.entries(albums).map(([albumId, images]) => (
                            <Album
                                key={`album_${albumId}`}
                                id={albumId}
                                images={images}
                                thumbnail={images[0].thumbnailUrl}
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)