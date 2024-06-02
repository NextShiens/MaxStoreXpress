import React from 'react'
import { Skeleton } from '@mui/material';

const SkeletonHome = () => (
    <div>
        <div className="flex items-center w-full px-5 py-3 bg-gray-100">
            <Skeleton variant="rectangular" width={100} height={40} className='rounded' />
            <div className="flex-grow flex justify-center px-5">
                <Skeleton variant="rectangular" width="30%" height={40} className='rounded' />
            </div>
            <Skeleton variant="circular" width={40} height={40} />
        </div>
    </div>
);
export default SkeletonHome;    