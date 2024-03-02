import React, { PureComponent } from 'react';
import { useQuery,gql } from '@apollo/client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
const GET_DATA=gql`
query{
    chartData{
    name
    value
    
  }
}
`;
const pieParams = { width:350, height: 350, margin: { right: 5 }  };
const palette  = ['#00193B', '#7c3aed', '#FFBB28', '#FF8042'];


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
    <Stack direction="row" width="100%" textAlign="center" spacing={2}>
    <Box flexGrow={1}>
      <PieChart
      
       colors={palette}
        series={[{ data: data.chartData }]}
        {...pieParams}
    
      />
    </Box>
  </Stack>
  );
}



