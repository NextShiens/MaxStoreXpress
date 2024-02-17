import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_TRANSACTIONS = gql`
  query {
    getTransactions {
      id
      date
      seller
      sku
      type
      status
      amount
    }
  }
`;

const Transactions = () => {
  const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.getTransactions) {
    return <p>No transactions found.</p>;
  }

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Arial, sans-serif', textShadow: '1px 1px 2px #888888' }}>Transaction Table</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '8px',marginBottom:'12px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>Date</th>
            <th style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>Seller</th>
            <th style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>SKU</th>
            <th style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>Type</th>
            <th style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.getTransactions.map(transaction => (
            <tr key={transaction.id} style={{ backgroundColor: '#fff' }}>
              <td style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>{transaction.id}</td>
              <td style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>{transaction.date}</td>
              <td style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>{transaction.seller}</td>
              <td style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>{transaction.sku}</td>
              <td style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>{transaction.type}</td>
              <td style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>{transaction.status}</td>
              <td style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
