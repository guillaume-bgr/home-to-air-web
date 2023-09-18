import { useParams } from 'react-router-dom'
import Card from '../../components/widgets/Card';
import TopBar from '../../components/layout/Topbar';
import AqiChart from '../../components/widgets/AqiChart';
import SensorDataChart from '../../components/widgets/SensorDataChart'
import { useContext, useEffect, useState } from 'react';
import { fetchApi } from '../../utils/ApiUtil';
import { AuthContext } from '../../context/AuthContext';

function ShowSensor() {
    // Sensor ID
    const context = useContext(AuthContext)
    let { id } = useParams();
    const [sonde, setSonde] = useState(0);
    const [park, setPark] = useState(0);
    const [building, setBuilding] = useState(0);
    const [indexes, setIndexes] = useState(0);
    
    useEffect(() => {
        const fetchAsync = async () => {
            try {
                let sensor = await fetchApi('GET', null, '/sensors/'+id, context.token);
                setSonde(sensor.data)
                let park = await fetchApi('GET', null, '/parks/'+sensor.data.parks_id, context.token);
                setPark(park.data)
                let building = await fetchApi('GET', null, '/buildings/'+park.data.building_id, context.token);
                setBuilding(building.data)
                let sensorHistory = await fetchApi('GET', null, '/sensors/sensor-history/'+sensor.data.id);
                let aqiResponse = await fetchApi('POST', {sensorHistory: JSON.stringify(sensorHistory.data)}, '/sensors/aqi');
                setIndexes(aqiResponse);
                } catch (error) {
                console.log(error);
            }
        }
        fetchAsync();
    },[])

    return (
        <div className='show-sensor container'>
            <div className='row'>
                <div className='col-12'>
                    <TopBar  
                    pageTitle={sonde ? (sonde.name ? sonde.name : "-") : "-"}
					breadcrumbs={[
						{title: 'Accueil', path: '/'},
						{title: 'Mes capteurs', path: '/sensors'},
                        {title: 'Mon capteur'}
					]}
					buttons={[{title: 'Retour à la liste', path:'/', className: 'btn-secondary'}]}
                    />
                </div>
                <div className="col-12">
                    <Card className="headerless sensor-card">
                        <div className='row'>
                            <div className='col-8 d-flex'>
                                <div className='border-right p-2 w-fit-content bg-body'>
                                    <AqiChart AQI={indexes.globalAQI}/>
                                </div>
                                <div className="ps-2">
                                    <div className='me-2'>
                                        <div className='d-flex align-items-baseline'>
                                            <span className='h5 mb-0'>{sonde ? (sonde.name ? sonde.name : "-") : "-"}</span>
                                            <div className='status ms-2'>
                                                <span className='me-1 text-success'>En ligne</span>
                                                <span className="text-success vertical-align-top">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                                                <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="currentColor"/>
                                                </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <p className='text-muted text-sm'>Ajouté le {sonde ? (sonde.created_at ? sonde.created_at : "-") : "-"}</p>
                                        <div className="description text-muted mt-2 d-flex">
                                            <div className='me-3'>
                                                <span className="me-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 7H3C2.4 7 2 6.6 2 6V3C2 2.4 2.4 2 3 2H6C6.6 2 7 2.4 7 3V6C7 6.6 6.6 7 6 7Z" fill="currentColor"/>
                                                    <path opacity="0.3" d="M13 7H10C9.4 7 9 6.6 9 6V3C9 2.4 9.4 2 10 2H13C13.6 2 14 2.4 14 3V6C14 6.6 13.6 7 13 7ZM21 6V3C21 2.4 20.6 2 20 2H17C16.4 2 16 2.4 16 3V6C16 6.6 16.4 7 17 7H20C20.6 7 21 6.6 21 6ZM7 13V10C7 9.4 6.6 9 6 9H3C2.4 9 2 9.4 2 10V13C2 13.6 2.4 14 3 14H6C6.6 14 7 13.6 7 13ZM14 13V10C14 9.4 13.6 9 13 9H10C9.4 9 9 9.4 9 10V13C9 13.6 9.4 14 10 14H13C13.6 14 14 13.6 14 13ZM21 13V10C21 9.4 20.6 9 20 9H17C16.4 9 16 9.4 16 10V13C16 13.6 16.4 14 17 14H20C20.6 14 21 13.6 21 13ZM7 20V17C7 16.4 6.6 16 6 16H3C2.4 16 2 16.4 2 17V20C2 20.6 2.4 21 3 21H6C6.6 21 7 20.6 7 20ZM14 20V17C14 16.4 13.6 16 13 16H10C9.4 16 9 16.4 9 17V20C9 20.6 9.4 21 10 21H13C13.6 21 14 20.6 14 20ZM21 20V17C21 16.4 20.6 16 20 16H17C16.4 16 16 16.4 16 17V20C16 20.6 16.4 21 17 21H20C20.6 21 21 20.6 21 20Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span>{park ? (park.name ? park.name : "-") : "-"}</span>
                                            </div>
                                            <div className='me-3'>
                                                <span className="me-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor"/>
                                                <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor"/>
                                                </svg>
                                                </span>
                                                <span>{building ? (building.name ? building.name : "-") : "-"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 d-flex justify-content-end align-items-start'>
                                <button className='btn btn-primary'>Modifier le capteur</button>
                                <button className='btn btn-danger ms-2'>Supprimer le capteur</button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='col-12 mt-3'>
                    <Card title="Données des 12 dernières heures">
                        <div className='row'>
                            <div className='col-6'>
                                <SensorDataChart id={id} label="Oxydes d'azote" pollutant="oxydants" color="#7400b8" aqi={indexes.AQIs?.oxydants} unit="ppm"/>
                            </div>
                            <div className='col-6'>
                                <SensorDataChart id={id} label="Monoxyde de carbone" pollutant="reducers" color="#80ffdb" aqi={indexes.AQIs?.reducers} unit="ppm"/>
                            </div>
                            <div className='col-6'>
                                <SensorDataChart id={id} label="Particule PM1" pollutant="pm2_5" color="#4ea8de" aqi={indexes.AQIs?.pm2_5} unit="ppm"/>
                            </div>
                            <div className='col-6'>
                                <SensorDataChart id={id} label="Particules PM10" pollutant="pm10" color="#5390d9" aqi={indexes.AQIs?.pm10} unit="ppm"/>
                            </div>
                            <div className='col-6'>
                                <SensorDataChart id={id} label="Ammoniac" pollutant="nh3" color="#5e60ce" unit="ppm"/>
                            </div>
                            <div className='col-6'>
                                <SensorDataChart id={id} label="Humidité" pollutant="humidity" color="#64dfdf" unit="%"/>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ShowSensor