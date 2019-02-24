import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAlbums } from 'store/actions';
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
        albums: PropTypes.array,
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

        return (
            <div className="c-home">
                <div className="c-home__gallery">
                    {isLoading && (
                        <div> LOADING </div>
                    )}
                    {error && (
                        <div> ERROR </div>
                    )}
                    {!!albums.length && (
                        <div>{`HAS ${albums.length} albums`}</div>
                )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    albums: state.gallery.albums,
    isLoading: state.gallery.isLoading,
    error: state.gallery.error,
})

const mapDispatchToProps = (dispatch) => ({
    getAlbums: () => dispatch(getAlbums())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)