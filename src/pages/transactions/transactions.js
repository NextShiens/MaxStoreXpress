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
    <div>
      <h2 className='m-4 font-bold text-[25px] ml-[40%]  inline-block text-shadow-lg
      '> Transactions Record</h2>
    <div className='w-[84%] ml-[8%] mb-12 max-h-[500px] overflow-y-auto border-[3px] border-b-0 rounded-md border-solid  '>
      <table className='w-[100%]  rounded-[8px] border-collapse shadow-lg' >
        <thead className='bg-[#1F51FF] sticky top-0 '>
          <tr className='bg-[#1F51FF] p-3 text-white'>
            <th className='p-3 pl-5 text-left'>ID</th>
            <th className='p-3 text-left'>Date</th>
            <th className='p-3 text-left'>Seller</th>
            <th className='p-3 text-left'>SKU</th>
            <th className='p-3 text-left'>Type</th>
            <th className='p-3 text-left'>Status</th>
            <th className='p-3 text-left'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.getTransactions.map(transaction => (
            <tr key={transaction.id} >
              <td className='p-3 border-b-[3px]   mb-1 border-solid border-gray-300'>{transaction.id}</td>
              <td className='p-3 border-b-[3px]  mb-1 border-solid border-gray-300'>{transaction.date}</td>
              <td className='p-3 border-b-[3px]  mb-1 border-solid border-gray-300'>{transaction.seller}</td>
              <td className='p-3 border-b-[3px]  mb-1 border-solid border-gray-300'>{transaction.sku}</td>
              <td className='p-3 border-b-[3px]  mb-1 border-solid border-gray-300'>{transaction.type}</td>
              <td className='p-3 border-b-[3px]  mb-1 border-solid border-gray-300'>{transaction.status}</td>
              <td className='p-3 border-b-[3px]  border-solid border-gray-300'>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Transactions;
