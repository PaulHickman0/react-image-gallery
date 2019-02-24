import './services.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormatLayout from 'components/format-layout';

export default class Services extends PureComponent {
    // Prop types
    static propTypes = {
        data: PropTypes.array
    };

    // Default props
    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);
    }

    render() {

        const { data } = this.props;

        return (
            <div className="c-services__container">
                <FormatLayout>
                    <h1 className="c-services__title">Services</h1>
                    <div className="c-services__items">
                        {data.map((service, i) => (
                            <div key={`service${i}`} className="c-services__item">
                                <i className={`fas fa-${service.icon} c-services__item-icon`} />
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </FormatLayout>
            </div>
        );
    }
}