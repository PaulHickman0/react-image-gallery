import React, { Component } from 'react';
import './home.scss';

/**
 * Home page component
 * 
 * @class Home
 * @extends { Component }
 */
export default class Home extends Component {

    // Prop types
    static propTypes = {

    };

    // Default props
    static defaultProps = {

    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        return (
            <div className="c-home">
                
            </div>
        );
    }
}