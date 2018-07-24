import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    FormControl,
    ControlLabel,
    FormGroup,
    Button
} from 'react-bootstrap';

class Repay extends Component {
    state = {
        loading: false
    };

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleClick = () => {
        const { id } = this.props;
        this.setState({ loading: true });
        setTimeout(() => {
            this.mounted &&
                this.setState(
                    {
                        loading: false
                    },
                    () => {
                        this.props.onRepay(id);
                    }
                );
        }, 2000);
    };

    render() {
        const { amount, onHide } = this.props;
        const { loading } = this.state;

        return (
            <Modal show bsSize="sm" onHide={onHide}>
                <Modal.Header closeButton>Loan Re-payment</Modal.Header>
                <Modal.Body>
                    <div className="loan-repayment">
                        <FormGroup>
                            <ControlLabel>Amount</ControlLabel>
                            <FormControl
                                type="number"
                                placeholder="Loan Amount"
                                value={amount}
                                disabled
                            />
                        </FormGroup>
                    </div>
                    <Button onClick={this.handleClick}>
                        {loading ? 'Repaying...' : 'Repay'}
                    </Button>
                </Modal.Body>
            </Modal>
        );
    }
}

Repay.propTypes = {
    amount: PropTypes.number.isRequired,
    onRepay: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired
};

export default Repay;
