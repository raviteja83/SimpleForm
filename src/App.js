import React, { Component, Fragment } from 'react';
import shortid from 'shortid';
import moment from 'moment';

import ApplyLoanForm from './ApplyLoanForm';
import NoLoans from './NoLoans';
import Content from './Content';

import './app.css';

class App extends Component {
    state = {
        loans: [],
        showAddModal: '',
        showRepayModal: ''
    };

    handleNewLoan = loan => {
        this.hideAddModal();
        this.setState(({ loans, ...rest }) => {
            return {
                ...rest,
                loans: [
                    {
                        id: shortid.generate(),
                        ...loan,
                        nextPayment: moment()
                            .add(1, 'week')
                            .valueOf(),
                        installmentsPaid: 0
                    },
                    ...loans
                ]
            };
        });
    };

    showAddModal = () => {
        this.setState({
            showAddModal: true
        });
    };

    hideAddModal = () => {
        this.setState({
            showAddModal: false
        });
    };

    handleRepay = loanId => {
        const { loans } = this.state;

        const index = loans.findIndex(({ id }) => loanId === id);
        if (index > -1) {
            this.setState({
                loans: [
                    ...loans.slice(0, index),
                    {
                        ...loans[index],
                        nextPayment: moment()
                            .add(1, 'week')
                            .valueOf(),
                        installmentsPaid: loans[index].installmentsPaid + 1
                    },
                    ...loans.slice(index + 1)
                ]
            });
        }
    };

    render() {
        const { showAddModal, loans } = this.state;

        return (
            <Fragment>
                {showAddModal && (
                    <ApplyLoanForm
                        onSubmit={this.handleNewLoan}
                        onHide={this.hideAddModal}
                    />
                )}
                {loans.length > 0 ? (
                    <Content
                        data={loans}
                        onRepay={this.handleRepay}
                        onAdd={this.showAddModal}
                    />
                ) : (
                    <NoLoans onClick={this.showAddModal} />
                )}
            </Fragment>
        );
    }
}

export default App;
