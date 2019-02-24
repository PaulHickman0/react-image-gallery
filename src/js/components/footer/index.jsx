import './footer.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormatLayout from 'components/format-layout';
import socialIcons from 'data/social';

export default class Footer extends PureComponent {
    // Prop types
    static propTypes = {

    };

    // Default props
    static defaultProps = {

    };

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="c-footer">
                <FormatLayout>
                    <div className="c-footer__container">
                        <div className="c-footer__logo">
                            <h2>AudioMastersGroup</h2>
                        </div>
                        <div className="c-footer__social">
                            {socialIcons.map((social, i) => (
                                <a className="c-footer__social-icon" href={social.link} key={`footer${i}`} target="_blank">
                                    <i className={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </FormatLayout>
            </div>
        );
    }
}