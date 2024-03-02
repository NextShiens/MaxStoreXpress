import { React, useState, useEffect } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StraightIcon from '@mui/icons-material/Straight';
import Piechart from './chart';
import { useQuery, gql } from '@apollo/client';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
const GET_DATA = gql`
    query{
     customerData{
        all
        new 
        regular
        ageLess18
        age18_25
        age25_45
        ageOver45
     }   
     }`;
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 17,
    borderRadius: 9,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 9,
        backgroundColor: '#00193B',
    },
}));
export default function Customerpage() {
    const { loading, error, data } = useQuery(GET_DATA);
    const [allCus, setAllCus] = useState(0);
    const [newCus, setNewCus] = useState(0);
    const [regularCus, setRegularCus] = useState(0);
    const [ageLess, setageLess] = useState(0);
    const [age18, setAge18] = useState(0);
    const [age25, setAge25] = useState(0);
    const [age45, setAge45] = useState(0);

    useEffect(() => {
        if (data && data.customerData && allCus < data.customerData.all) {
            const totalCustomers = data.customerData.all;
            let increment = 1;
            if (allCus + 111 <= totalCustomers) {
                increment = 111;
               }
            setAllCus(prev => (prev + increment));
        }
        if (data && data.customerData && newCus < data.customerData.new) {
            const totalCustomers = data.customerData.new;
            let increment = 1;
            if (newCus + 111 <= totalCustomers) {
                increment = 111;
               }
            setNewCus(prev => (prev + increment));
        }
        if (data && data.customerData && regularCus < data.customerData.regular) {
            const totalCustomers = data.customerData.regular;
            let increment = 1;
            if (regularCus + 111 <= totalCustomers) {
                increment = 111;
               }
            setRegularCus(prev => (prev + increment));
        }
        
        
if (data && data.customerData && ageLess < data.customerData.ageLess18) {
    setageLess(prev => prev + 1)
}
if (data && data.customerData && age18 < data.customerData.age18_25) {
    setAge18(prev => prev + 1)
}
if (data && data.customerData && age25 < data.customerData.age25_45) {
    setAge25(prev => prev + 1)
}
if (data && data.customerData && age45 < data.customerData.ageOver45) {
   setAge45(prev => prev + 1)
}
    }, [data, ageLess, setageLess, age18, setAge18, age25, setAge25, age45, setAge45,allCus, setAllCus,newCus, setNewCus,regularCus, setRegularCus]);
if (loading) {
    return <div>Loading Data...</div>;
}
if (error) {
    return <div className=' text-red-500 '>Error... </div>;
}
if (data) {
    return (
        <div className="pl-7 grid grid-cols-6 gap-y-5 gap-x-[34px] grid-rows-[auto,auto]">
            <div className=' m-7 h-40 mt-16 flex flex-col items-center justify-center text-[22px] w-60 shadow-lg shadow-inset rounded-lg col-span-1  row-span-1 '>
                <PeopleAltIcon className='text-blue-500 scale-[200%] mb-4' />
                <span className='text-[22px]'>{allCus}</span>
                All Customers
            </div>
            <div className=' m-7  mt-16 h-40  flex flex-col items-center justify-center text-[22px] w-60 shadow-lg inset-0 shadow-inset rounded-lg col-span-1  row-span-1 '>
                <PersonAddIcon className='text-pink-600 scale-[200%] mb-4' />
                <span className='text-[22px]'>{newCus}</span>                New Customers
            </div>
            <div className=' m-7 h-40 mt-16 flex flex-col items-center justify-center text-[22px] w-60 shadow-lg shadow-inset rounded-lg col-span-1  row-span-1'>
                <AccountCircleIcon className='text-purple-600 scale-[200%] mb-4' />
                <span className='text-[22px]'>{regularCus}</span>                Regular Customers
            </div>
            <div className='m-7 ml-12 mt-16 gap-y-[13px] gap-x-[13px] h-40  flex flex-col items-center justify-center w-[599px]   shadow-lg shadow-inset rounded-lg col-span-3  row-span-1   '>
                <h4 className='text-[23px] m-0 font-bold'>Conversion Rate</h4>

                <div className=' flex flex-row items-center content-center'>
                    <div className=" ">
                        <table className='mr-[9px]'>

                            <tr className="w-full  border-b">
                                <th className="w-1/3 px-1 ">Year</th>
                                <th className="w-1/3 px-1 ">Customers</th>
                                <th className="w-1/3 px-1">trend</th>
                            </tr>

                            <tr className='m-[6px]' >
                                <td>2022</td>
                                <td>45</td>
                                <td>$12%</td>
                            </tr>
                            <tr className='m-[6px]'>
                                <td>2023</td>
                                <td>+{newCus}</td>
                                <td>$34%</td>
                            </tr>

                        </table>
                    </div>
                    <div className='ml-3 regular-customer-count'>
                        <h1 className='text-[25px] font-bold customer-count-numbers'>
                            $ {allCus}
                        </h1>
                    </div>
                    <div className='new-customer-count'>
                        <h1 className='customer-count-numbers text-[25px] font-bold ml-4'><span className='text-green-600'>+</span>{newCus}
                            <StraightIcon className='text-green-500 pb-[6px] scale-150' />
                        </h1>
                    </div>
                </div>
            </div>

            <div className=' mr-[33px] ml-6 w-[56%] col-span-2 row-span-2 '>
                <div className=''>
                    <h5 className=' font-bold w-[100%] text-[18px]'>Customer Retention Rate</h5>
                    <div >< Piechart /></div>
                </div>
            </div >
            <div className=' list-none text-[18px]  mb-4 col-span-2 row-span-2'>
                <h6 className='text-[20px]  font-bold '>Total customers</h6>
                <p className='m-4 mb-6 mt-7 text-[17px]'>this is the Pie chart of our customers .Indicating our sales in 2020 to 2024 .
                    the fluctuation can be observes caused by our policies markiting startigies and other factors.</p>
                <ul className='list-none m-[4px 0px 4px 9px]'>
                    <li class="relative mb-4">
                        <span class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-pink-600 text-pink-600 h-3 w-3 flex justify-center items-center rounded-full"></span>
                        <span class="ml-8 mb-2">New customers </span>
                    </li>
                    <li class="relative mb-4">
                        <span class=" mb-2 absolute top-1/2 left-0 transform -translate-y-1/2 bg-purple-600 text-purple-600 h-3 w-3 flex justify-center items-center rounded-full"></span>
                        <span class="ml-8 mb-2">Regular customers  </span>
                    </li>
                    <li class="relative mb-4">
                        <span class=" mb-2 absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-700 text-blue-700 h-3 w-3 flex justify-center items-center rounded-full"></span>
                        <span class="ml-8 mb-2">Idle users</span>
                    </li>
                    <li class="relative mb-3">
                        <span class="mb-2 absolute top-1/2 left-0 transform -translate-y-1/2 bg-yellow-500 text-yellow-500 h-3 w-3 flex justify-center items-center rounded-full"></span>
                        <span class="ml-8 mb-2">Cart abondoners  </span>
                    </li>
                </ul>
            </div>

            <div className=' w-[400px] col-span-2 row-span-2'>
                <h6 className='text-[20px] ml-[90px] mb-7 font-bold m-[8px 0px 9px 38%]'>
                    Customers Age Groups
                </h6>

                <p className='font-bold	'>Age 18-25 </p>


                <BorderLinearProgress className='mb-[25px] mt-2' variant="determinate" value={ageLess} />

                <p className='font-bold	'>Age 25-45</p>

                <BorderLinearProgress className='mb-[25px] mt-2' variant="determinate" value={age18} />
                <p className='font-bold	'>Age over 45 </p>

                <BorderLinearProgress className='mb-[25px] mt-2' variant="determinate" value={age25} />
                <p className='font-bold	'> Age less 18</p>

                <BorderLinearProgress className='mb-[25px] mt-2' variant="determinate" value={age45} />

            </div>
        </div>
    );
}
}