import React from 'react'
import Skeleton from 'react-loading-skeleton';

const AlbumRootSkeleton = () => {
  return (
   <div className=' w-full opacity-40 flex flex-col ' >
 <div className='ml-2 mb-2'>
 <Skeleton height={20} width={180}  baseColor='gray' />
    
  
 </div>
   <div className='flex gap-1'>
   {[...Array(6)].map((index) => (
        <div className="  w-[200px] h-[200px] bg-gray-900  hidden lg:block md:block mx-auto p-2 rounded-md  ">
    <Skeleton height={140} inline={true} width={180} baseColor='gray'  containerClassName="flex-1" />
    <Skeleton height={20} width={180}  baseColor='gray' />
  </div>
    ) )}
   {[...Array(3)].map((index) => (
        <div className=" w-[120px]  h-[180px] bg-gray-900 mx-auto  lg:hidden md:hidden p-2 rounded-md  ">
    <Skeleton height={140} inline={true} width={125} baseColor='gray'  containerClassName="flex-1" />
    <Skeleton height={20} width={125}  baseColor='gray' />
  </div>
    ) )}
   </div>

{/*   
  {[...Array(7)].map((_, index) => (
       {/* <SkeletonLoading/> */}
          ))} */}
   </div>
  )
}

export default AlbumRootSkeleton
