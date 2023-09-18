import { useState, useEffect, useContext } from 'react'
import { fetchApi } from '../../utils/ApiUtil';
import { AuthContext } from '../../context/AuthContext';
import Card from "./Card";
import { Link } from 'react-router-dom'

function SensorList() {
    const [sensors, setSensors] = useState([]);
    const context = useContext(AuthContext)

    useEffect(() => {
        const fetchAsync = async () => {
            try {
                let response = await fetchApi('GET', null, '/customers/'+context.userId+'/parks/', context.token);
                let sensors = [];
                for (let park of response) {
                    for (let sensor of park.Sensors) {
                        sensors.push(sensor);
                    }
                }
                setSensors(sensors);
            } catch (error) {
            }
        }
        fetchAsync();
    },[])

    return (
        <div className="sensor-list d-flex">
            <div className="row" style={{width: '90%', marginRight: '0'}}>
                { sensors.slice(0, 3).map(sensor=>  
                    <div className="col-4" key={sensor.id}>
                        <Card className="sensor">
                            <div className="row">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <span className="text-primary"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 2.375L22 9.57501V20.575C22 21.175 21.6 21.575 21 21.575H3C2.4 21.575 2 21.175 2 20.575V9.57501L11 2.375C11.6 1.875 12.4 1.875 13 2.375ZM18.6 11.975C18.9 11.575 18.8 10.875 18.4 10.575C14.6 7.87501 9.40001 7.87501 5.60001 10.575C5.20001 10.875 4.99999 11.475 5.39999 11.975C5.69999 12.375 6.29999 12.575 6.79999 12.175C9.89999 9.97499 14.1 9.97499 17.3 12.175C17.5 12.275 17.7 12.375 17.9 12.375C18.1 12.475 18.4 12.275 18.6 11.975ZM14 18.575C14.3 18.175 14.2 17.475 13.8 17.175C12.8 16.375 11.4 16.375 10.3 17.175C9.89999 17.475 9.70001 18.075 10.1 18.575C10.4 18.975 11 19.175 11.5 18.775C11.8 18.575 12.3 18.575 12.7 18.775C12.9 18.875 13.1 18.975 13.3 18.975C13.5 18.975 13.8 18.775 14 18.575ZM16.3 15.275C16.6 14.875 16.5 14.175 16.1 13.875C13.7 12.175 10.3 12.175 8 13.875C7.6 14.175 7.39999 14.775 7.79999 15.275C8.19999 15.775 8.70001 15.875 9.20001 15.475C10.9 14.275 13.3 14.275 15 15.475C15.2 15.575 15.4 15.675 15.6 15.675C15.8 15.675 16.1 15.575 16.3 15.275Z" fill="currentColor"/>
                                    </svg>
                                    </span>
                                </div>
                                <div className="col-9">
                                    <p className="mb-0">{sensor?.name}</p>
                                    <span className="mb-0 text-sm">En ligne</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                ) }
                {sensors.length < 3 ? 
                <div className="col-4">
                    <Card className="sensor">
                            <div className="h-100 d-flex justify-content-center align-items-center hover-primary">
                                <p className='me-1'>Ajouter</p>
                                <span className=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                                <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor"/>
                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"/>
                                </svg>
                                </span>
                            </div>
                    </Card>
                </div>
                :
                null
                }
            </div>
            <div style={{width: '10%'}}>
                <Link to="/sensors" className='d-flex justify-content-center align-items-center w-100 h-100 card-button btn'>Voir tout</Link>
            </div>
        </div>
        
    )
}

export default SensorList