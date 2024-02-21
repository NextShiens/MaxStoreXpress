import React, { PureComponent } from 'react';
import { useQuery,gql } from '@apollo/client';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const GET_DATA=gql`
query{
    chartData{
    name
    value
    
  }
}
`;
const COLORS = ['#00193B', '#7c3aed', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Piechart() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) {
    return <div>Loading Data...</div>;
  }

  if (error) {
    return <div className='font-bold text-red-500 text-[17px]'>Error fetching data...</div>;
  }
  if (!Array.isArray(data?.chartData)) {
    return <div>Data is not in the expected format</div>;
  }

  return (
    <div>
      <ResponsiveContainer width="170%" height={400}>
        <PieChart>
          <Pie
            data={data.chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={180}
            fill="#8884d8"
            dataKey="value"
          >
            {data.chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}



