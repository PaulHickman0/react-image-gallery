import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getImages } from 'store/actions';
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
        getImages: PropTypes.func,
        images: PropTypes.array,
        isLoading: PropTypes.bool,
        error: PropTypes.bool,
    };

    // Default props
    static defaultProps = {
        getImages: () => null,
        images: [],
        isLoading: false,
        error: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getImages();
        console.log('MOUNT')
    }

    render() {

        const { images, isLoading, error } = this.props;

        return (
            <div className="c-home">
                {isLoading && (
                    <div> LOADING </div>
                )}
                {error && (
                    <div> ERROR </div>
                )}
                {!!images.length && (
                    <div>{`HAS ${images.length} IMAGES`}</div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    images: state.gallery.images,
    isLoading: state.gallery.isLoading,
    error: state.gallery.error,
})

const mapDispatchToProps = (dispatch) => ({
    getImages: () => dispatch(getImages())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)