import React from 'react'

const DashbordCard = ({background,heading,total,today}) => {
  return (
    <div style={{width:"100%",height:"250px",background:`${background}`}} className='bg-warning rounded shadow p-3 d-flex justify-content-between align-items-center dashboardCard'>
        <div className='w-50'>
            
            <div className='rounded-circle bg-light d-flex flex-column align-items-center justify-content-center text-dark' style={{width:"100px",height:"100px"}}>
            <h6>today</h6>
                <h3>{today?today:"0"}</h3>
            </div>
            <h5 className='text-center mt-3'>{heading}</h5>
        </div>
        <div className='w-50 border p-3'>
            <h4 className='text-center'>{total?total:"0"}</h4>
            <h6>Total {heading}</h6>
        </div>
    </div>
  )
}

export default DashbordCard