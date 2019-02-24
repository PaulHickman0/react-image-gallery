import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAlbums } from 'store/actions';
import Album from 'components/album';
import FormatLayout from 'components/format-layout';
import ImageGrid from 'components/image-grid';
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
        albums: {},
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

    render() {

        const { albums, isLoading, error } = this.props;

        return (
            <div className="home">
                <FormatLayout>
                    <h1>Image Gallery</h1>
                    <ImageGrid
                        className="home__gallery"
                        isLoading={isLoading}
                        error={error}
                    >
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
                    </ImageGrid>
                </FormatLayout>
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