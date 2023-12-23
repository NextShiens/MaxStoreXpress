import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const ProductSkeleton = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="text" width={210} />
      <Skeleton variant="text" width={210} />
    </div>
  );
};

export default ProductSkeleton;