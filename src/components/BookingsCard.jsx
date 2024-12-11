import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import img3 from '../assets/img3.jpg'
import serverUrl from '../Services/serverUrl'
import { useNavigate } from 'react-router-dom'

const BookingsCard = ({data}) => {
    const navigate = useNavigate()
    return (
        <>
            <Card onClick={()=>navigate(`/bookings/${data.vehicleId}/${data._id}/view`)} style={{ width: '18rem',height:'auto' }} className='bg-warning text-light shadow'>
                <Card.Img variant="top" src={`${serverUrl}/uploads/${data.image}`} />
                <Card.Body>
                    <Card.Title className='text-dark'>{data.Make}-{data.Model}</Card.Title>
                    <h6>Booking Date:{data.bookedOn}</h6>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item><span className='fs-bolder text-success'>User:</span>{data.name}</ListGroup.Item>
                    <ListGroup.Item><span className='fs-bolder text-success'>Booked-For:</span>{data.bookedFor.startDate}- <br />{data.bookedFor.endDate}</ListGroup.Item>
                    <ListGroup.Item><span className='fs-bolder text-success'>Status:</span>{data.status}</ListGroup.Item>
                    <ListGroup.Item><span className='fs-bolder text-success'>Booking Id</span>{data._id}</ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    )
}

export default BookingsCard