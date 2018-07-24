import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Repay from './Repay';

class LoanAction extends Component {
    state = {
        showModal: false
    };

    showModal = () => {
        this.setState({
            showModal: true
        });
    };

    hideModal = () => {
        this.setState({
            showModal: false
        });
    };

    handleSubmit = id => {
        this.hideModal();
        this.props.onSubmit(id);
    };

    render() {
        const {
            loan: { nextPayment, id, installment }
        } = this.props;
        const { showModal } = this.state;

        const isToday = moment(nextPayment).diff(moment(), 'day') <= 1;

        return (
            <div>
                {isToday ? (
                    <Button
                        bsStyle="primary"
                        bsSize="xsmall"
                        onClick={this.showModal}
                    >
                        Repay
                    </Button>
                ) : (
                    `Next Installment is due ${moment(nextPayment).fromNow()}`
                )}
                {showModal && (
                    <Repay
                        id={id}
                        onRepay={this.handleSubmit}
                        amount={installment}
                        onHide={this.hideModal}
                    />
                )}
            </div>
        );
    }
}

LoanAction.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loan: PropTypes.object.isRequired
};

export default LoanAction;
