import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    FormControl,
    FormGroup,
    ControlLabel,
    InputGroup,
    DropdownButton,
    MenuItem,
    HelpBlock,
    Button
} from 'react-bootstrap';

import './apply-loan-form.css';

const termOptions = [
    { label: 'Weeks', value: 'weeks' },
    { label: 'Months', value: 'months' },
    { label: 'Years', value: 'years' }
];

const loanOptions = [
    { label: 'Personal Loan', value: 'Personal Loan' },
    {
        label: 'Small/Medium Business Loan',
        value: 'Small/Medium Business Loan'
    },
    { label: 'Large Business Loan', value: 'Large Business Loan' }
];

class ApplyLoanForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired
    };
    state = {
        term: 0,
        amount: 0,
        installment: 0,
        termError: '',
        amountError: '',
        installmentError: '',
        termType: termOptions[0].value,
        loanType: loanOptions[0].value,
        loading: false
    };

    handleLoanAmount = ({ target: { value } }) => {
        const num = parseInt(value, 10);
        this.setState({
            amount: num,
            amountError: !num ? 'Please enter a value greater than zero' : ''
        });
    };

    handleLoanTerm = ({ target: { value } }) => {
        const num = parseInt(value, 10);
        this.setState({
            term: num,
            termError: !num ? 'Please enter a value greater than zero' : ''
        });
    };

    handleRepayChange = ({ target: { value } }) => {
        const num = parseInt(value, 10);
        this.setState({
            installment: num,
            installmentError:
                num > this.state.amount
                    ? 'Repay amount should not be greater than total amount'
                    : num === 0
                        ? 'Please enter a value greater than zero'
                        : ''
        });
    };

    handleTermChange = value => {
        this.setState({
            termType: value
        });
    };

    handleLoanTypeChange = value => {
        this.setState({
            loanType: value
        });
    };

    handleSubmit = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState(
                {
                    loading: false
                },
                () => {
                    const {
                        term,
                        amount,
                        loanType,
                        termType,
                        installment
                    } = this.state;

                    this.props.onSubmit({
                        amount,
                        term: `${term} ${termType}`,
                        loanType,
                        installment
                    });
                }
            );
        }, 2000);
    };

    render() {
        const {
            termType,
            amount,
            amountError,
            term,
            termError,
            loanType,
            loading,
            installment,
            installmentError
        } = this.state;

        return (
            <Modal bsSize="sm" show onHide={this.props.onHide}>
                <Modal.Header closeButton>Apply New Loan</Modal.Header>
                <Modal.Body>
                    <form className="apply-loan-form">
                        <FormGroup>
                            <ControlLabel>Loan Amount</ControlLabel>
                            <InputGroup>
                                <FormControl
                                    type="number"
                                    min={0}
                                    placeholder="Loan Amount"
                                    onChange={this.handleLoanAmount}
                                    value={amount}
                                />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="amount-dropdown"
                                    title="SGD"
                                    disabled
                                >
                                    <MenuItem key="SGD" eventKey="SGD">
                                        SGD
                                    </MenuItem>
                                </DropdownButton>
                            </InputGroup>
                            <HelpBlock>{amountError}</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Loan Term</ControlLabel>
                            <InputGroup>
                                <FormControl
                                    type="number"
                                    min={0}
                                    placeholder="Term duration"
                                    onChange={this.handleLoanTerm}
                                    value={term}
                                />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="term-dropdown"
                                    onSelect={this.handleTermChange}
                                    title={termType}
                                >
                                    {termOptions.map(({ label, value }) => {
                                        return (
                                            <MenuItem
                                                active={value === termType}
                                                key={value}
                                                eventKey={value}
                                            >
                                                {label}
                                            </MenuItem>
                                        );
                                    })}
                                </DropdownButton>
                            </InputGroup>
                            <HelpBlock>{termError}</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>
                                Loan Repay installment Amount
                            </ControlLabel>
                            <InputGroup>
                                <FormControl
                                    type="number"
                                    min={0}
                                    onChange={this.handleRepayChange}
                                    value={installment}
                                />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="repay-dropdown"
                                    title="SGD"
                                    disabled
                                >
                                    <MenuItem key="SGD" eventKey="SGD">
                                        SGD
                                    </MenuItem>
                                </DropdownButton>
                            </InputGroup>
                            <HelpBlock>{installmentError}</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Loan Type</ControlLabel>
                            <DropdownButton
                                componentClass={InputGroup.Button}
                                id="loanType-dropdown"
                                title={loanType}
                                onSelect={this.handleLoanTypeChange}
                            >
                                {loanOptions.map(({ label, value }) => {
                                    return (
                                        <MenuItem key={value} eventKey={value}>
                                            {label}
                                        </MenuItem>
                                    );
                                })}
                            </DropdownButton>
                        </FormGroup>
                        <Button
                            bsStyle="primary"
                            disabled={!!(amountError || termError)}
                            onClick={this.handleSubmit}
                        >
                            {loading ? 'Applying...' : 'Apply Loan'}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ApplyLoanForm;
