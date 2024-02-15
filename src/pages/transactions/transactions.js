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
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Transaction Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Seller</th>
              <th className="px-4 py-2 border">SKU</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.getTransactions.map(transaction => (
              <tr key={transaction.id} className="text-gray-700">
                <td className="border px-4 py-2">{transaction.id}</td>
                <td className="border px-4 py-2">{transaction.date}</td>
                <td className="border px-4 py-2">{transaction.seller}</td>
                <td className="border px-4 py-2">{transaction.sku}</td>
                <td className="border px-4 py-2">{transaction.type}</td>
                <td className="border px-4 py-2">{transaction.status}</td>
                <td className="border px-4 py-2">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;