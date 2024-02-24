import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StraightIcon from '@mui/icons-material/Straight';
import Piechart from './chart';
import CountUp from 'react-countup';
import { useQuery,gql } from '@apollo/client';
const GET_DATA=gql`
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
export default function Customerpage() {
    const { loading, error, data } = useQuery(GET_DATA);
if(loading) {
    return <div>Loading Data...</div>;
}
if (error) {
    return <div className=' text-red-500 '>Error... </div>;
}
if (data) {
    console.log(data);
    return (
        <div className="pl-7 grid grid-cols-6 gap-y-5 gap-x-[34px] grid-rows-[auto,auto]">
            <div className=' m-7 h-40 mt-16 flex flex-col items-center justify-center text-[22px] w-60 shadow-lg shadow-inset rounded-lg col-span-1  row-span-1 '>
                <PeopleAltIcon className='text-blue-500 scale-[200%] mb-4' />
                <CountUp className='text-[22px] ' start={0} end={data.customerData.all} duration={0.9} delay={0.7} />
                All Customers
            </div>
            <div className=' m-7  mt-16 h-40  flex flex-col items-center justify-center text-[22px] w-60 shadow-lg inset-0 shadow-inset rounded-lg col-span-1  row-span-1 '>
                <PersonAddIcon className='text-pink-600 scale-[200%] mb-4' />
                <CountUp className='text-[22px] ' start={0} end={data.customerData.new} duration={0.9} delay={0.7} />
                New Customers
            </div>
            <div className=' m-7 h-40 mt-16 flex flex-col items-center justify-center text-[22px] w-60 shadow-lg shadow-inset rounded-lg col-span-1  row-span-1'>
                <AccountCircleIcon className='text-purple-600 scale-[200%] mb-4' />
                <CountUp className='text-[22px] ' start={0} end={data.customerData.regular} duration={0.9} delay={0.7} />
                Regular Customers
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
                                <td>+{data.customerData.new}</td>
                                <td>$34%</td>
                            </tr>

                        </table>
                    </div>
                    <div className='ml-3 regular-customer-count'>
                        <h1 className='text-[25px] font-bold customer-count-numbers'>
                            $ <CountUp start={0} end={data.customerData.all} duration={0.9} delay={0.7} />
                        </h1>
                    </div>
                    <div className='new-customer-count'>
                        <h1 className='customer-count-numbers text-[25px] font-bold ml-4'><span className='text-green-600'>+</span><CountUp start={0} end={data.customerData.new} duration={0.9} delay={0.7} />
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

                <ProgressBar className='mb-[25px] mt-2'
                    transitionDuration="1s"
                    transitionTimingFunction="ease"
                    animateOnRender
                    dir="auto"
                    height="18px"
                    bgColor="#00193B"
                    labelSize="13.5px"
                    completed={data.customerData.ageLess18}
                    maxCompleted={100} />
                <p className='font-bold	'>Age 25-45</p>
                <ProgressBar className='mb-[25px] mt-2'
                    transitionDuration="1s"
                    transitionTimingFunction="ease"
                    animateOnRender
                    dir="auto"
                    height="18px"
                    bgColor="#00193B"
                    labelSize="13.5px"
                    completed={data.customerData.age18_25}
                    maxCompleted={100} />
                <p className='font-bold	'>Age over 45 </p>
                <ProgressBar className='mb-[25px] mt-2'
                    transitionDuration="1s"
                    transitionTimingFunction="ease"
                    animateOnRender
                    dir="auto"
                    height="18px"
                    bgColor="#00193B"
                    labelSize="13.5px"
                    completed={data.customerData.age25_45}
                    maxCompleted={100} />
                <p className='font-bold	'> Age less 18</p>
                <ProgressBar className='mb-[12px] mt-2 '
                    transitionDuration="1s"
                    transitionTimingFunction="ease"
                    animateOnRender
                    dir="auto"
                    height="18px"
                    bgColor="#00193B"
                    labelSize="13.5px"
                    completed={data.customerData.ageOver45}
                    maxCompleted={100} />

            </div>
        </div>
    );}
}