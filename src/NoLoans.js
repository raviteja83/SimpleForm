import React from 'react';
import PropTypes from 'prop-types';

import './no-loans.css';

const NoLoans = ({ onClick }) => {
    return (
        <div className="no-loans-container">
            <div className="no-loans-container__content">
                <div className="no-loans-container__icon">
                    <i className="fa fa-usd" />
                </div>
                <div>You do not have any active loans</div>
                <button
                    className="btn btn-primary no-loans-container__action"
                    onClick={onClick}
                >
                    Apply New Loan
                </button>
            </div>
        </div>
    );
};

NoLoans.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default NoLoans;
