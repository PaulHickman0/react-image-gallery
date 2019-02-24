import './image.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default class Image extends PureComponent {
    // Prop types
    static propTypes = {
        title: PropTypes.string,
        url: PropTypes.string,
        thumbnailUrl:  PropTypes.string,
    };

    // Default props
    static defaultProps = {
        title: '',
        url: '',
        thumbnailUrl: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            isPreviewMode: false,
        };
        this.togglePreview = this.togglePreview.bind(this);
    }

    /**
     * Toggle preview state for image
     * Sets state to opne up Lightbox
     */
    togglePreview() {
        this.setState({ isPreviewMode: !this.state.isPreviewMode })
    }

    render() {

        const { title, thumbnailUrl, url } = this.props;
        const { isPreviewMode } = this.state;

        return (
            <div className="c-image">
                <h5>{`${title}`}</h5>
                <img src={thumbnailUrl} onClick={this.togglePreview} />
                {isPreviewMode && (
                    <Lightbox
                        mainSrc={url}
                        onCloseRequest={this.togglePreview}
                    />
                )}
            </div>
        );
    }
}