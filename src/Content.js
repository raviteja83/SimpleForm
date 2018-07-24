import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';

import LoanAction from './LoanAction';

const Content = ({ data, onRepay, onAdd }) => {
    return (
        <div className="content">
            <div className="content-header">
                <div>{data.length} loans</div>
                <Button bsStyle="primary" onClick={onAdd}>
                    +
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Loan Type</th>
                        <th>Loan Amount</th>
                        <th>Loan Term</th>
                        <th>Installments Paid</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => {
                        const {
                            loanType,
                            term,
                            amount,
                            id,
                            installmentsPaid
                        } = item;

                        return (
                            <tr className="loan" key={id}>
                                <td>{loanType}</td>
                                <td>{amount}</td>
                                <td>{term}</td>
                                <td>{installmentsPaid}</td>
                                <td>
                                    <LoanAction
                                        loan={item}
                                        onSubmit={onRepay}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

Content.propTypes = {
    data: PropTypes.array.isRequired,
    onRepay: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default Content;
