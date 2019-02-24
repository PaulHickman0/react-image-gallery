import './header.scss';
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends PureComponent {
    // Prop types
    static propTypes = {

    };

    // Default props
    static defaultProps = {

    };

    constructor(props) {
        super(props);

        window.addEventListener('scroll', this.onWindowScroll.bind(this));
        this.smallNav = false;
    }

    onWindowScroll(e) {

        if (window.innerWidth < 600) {
            return;
        }

        const scrollTop = window.pageYOffset;

        if (scrollTop > 20 && !this.smallNav) {
            this.smallNav = true;

            if (this.logoImage) {
                this.logoImage.style.transform = 'translateY(-100px)';
            }

            if (this.logoContainer) {
                this.logoContainer.style.height = '30px';
            }

            if (this.logoText) {
                this.logoText.style.transform = 'translate(-60px, -24px)';
                this.logoText.style.fontSize = '16px';

            }
        }

        if (scrollTop <= 10 && this.smallNav) {
            this.smallNav = false;

            if (this.logoImage) {
                this.logoImage.style = {};
            }

            if (this.logoContainer) {
                this.logoContainer.style = {};
            }

            if (this.logoText) {
                this.logoText.style = {};
            }
        }
    }

    links = [{
        label: 'Home',
        path: '/'
    }, {
        label: 'About',
        path: '/about'
    }]

    render() {

        return (
            <div className="c-header__container">
                <div ref={ref => this.logoContainer = ref} className="c-header__logo" >
                    <img ref={ref => this.logoImage = ref} src={require('images/header_logo.png')} />
                    <span ref={ref => this.logoText = ref}>AUDIOMASTERSGROUP</span>
                </div>
                <li className="c-header__navigation">
                    <ul>
                        {this.links.map((link, index) => (
                            <NavLink
                                key={`nav${index}`}
                                className="c-header__nav-item"
                                activeClassName="is-active"
                                exact
                                to={link.path}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </ul>
                </li>
            </div>
        );
    }
}