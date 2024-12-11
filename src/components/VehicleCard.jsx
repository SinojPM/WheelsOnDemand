import React from 'react'
import { Button, Card } from 'react-bootstrap'
import serverUrl from '../Services/serverUrl'
import { useNavigate } from 'react-router-dom'
import { addRecentViewApi } from '../Services/allApi'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const VehicleCard = ({vehicle,insideGarage}) => {
    const handleOnClick = ()=>{
        addToRecentViews()
        navigate(insideGarage?`/admin/${vehicle?._id}/view`:`/${vehicle?._id}/view`)
    }
    const addToRecentViews = async()=>{
        const reqBody = {
            vehicleId:vehicle?._id,
            make:vehicle?.make,
            model:vehicle?.model,
            image:vehicle?.image,
            rate:vehicle?.rate
        }
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try{
                const result = await addRecentViewApi(reqBody,reqHeader)
                if(result.status==200){
                 console.log("successfully added to recents");
                    
                }else{
                    console.log(result.response.data);
                    
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }
    const navigate = useNavigate()
    return (
        <div>
            <Card onClick={handleOnClick} className='bg-dark text-light border-success shadow vehicle-card' style={{ width: '18rem',opacity:"1" }}>
                <Card.Img width={"100%"} height={"150px"} variant="top" src={`${serverUrl}/uploads/${vehicle?.image}`} />
                <Card.Body>
                    <Card.Title>{vehicle?`${vehicle?.make}-${vehicle?.model}`:"title"}</Card.Title>
                    <Card.Text>
                        {
                            insideGarage &&
                            <h5>REG--{vehicle?vehicle?.registrationNumber:"number"}</h5>
                        }
                    </Card.Text>
                    <h5 className='text-end text-light p-3 bg-warning rounded'>{vehicle?.rate} Rs</h5>
                </Card.Body>
            </Card>
        </div>
    )
}

export default VehicleCard