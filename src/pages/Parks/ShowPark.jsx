import { useParams } from 'react-router-dom'
import Card from '../../components/widgets/Card';
import TopBar from '../../components/layout/Topbar';
import AqiChart from '../../components/widgets/AqiChart';
import SensorDataChart from '../../components/widgets/SensorDataChart'
import PercentageWidget from '../../components/widgets/PercentageWidget';
import { Link } from 'react-router-dom'
import Gauge from '../../components/widgets/Gauge';
import { ValidationAlert } from '../../utils/PopupUtils';
import { useContext, useEffect, useState } from 'react';
import { fetchApi } from '../../utils/ApiUtil';
import { AuthContext } from '../../context/AuthContext';

function ShowPark() {
    // Sensor ID
    const context = useContext(AuthContext)
    let { id } = useParams();
    const [park, setPark] = useState(0);

    const deleteItem = () => {
        ValidationAlert('Êtes-vous sûr de vouloir supprimer cet élément ?')
    } 

    useEffect(() => {
        const fetchAsync = async () => {
            try {
                let park = await fetchApi('GET', null, '/parks/'+id, context.token);
                setPark(park.data)
                console.log(park.data)
                } catch (error) {
                console.log(error);
            }
        }
        fetchAsync();
    },[])

    return (
        park ?
        <div className='show-sensor container'>
            <div className='row'>
                <div className='col-12'>
                    <TopBar  
                    pageTitle="Mon capteur"
					breadcrumbs={[
						{title: 'Accueil', path: '/'},
						{title: 'Mes parcs', path: '/parks'},
                        {title: 'Mon parc'}
					]}
					buttons={[{title: 'Retour à la liste', path:'/', className: 'btn-secondary'}]}
                    />
                </div>
                <div className="col-12">
                    <Card className="headerless sensor-card">
                        <div className='row'>
                            <div className='col-8 d-flex'>
                                <div className='border-right p-2 w-fit-content bg-body'>
                                    <AqiChart AQI={30}/>
                                </div>
                                <div className="ps-2">
                                    <div className='me-2'>
                                        <div className='d-flex align-items-baseline'>
                                            <span className='h5 mb-0'>{park.name ? park.name : '-'}</span>
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
                                        <p className='text-muted text-sm'>{park.createdAt ? park.createdAt : '-'}</p>
                                        <div className="description text-muted mt-2 d-flex">
                                            <div className='me-3'>
                                                <span className="me-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor"/>
                                                <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor"/>
                                                </svg>
                                                </span>
                                                <span>{park.Buildings ? park.Buildings.name  : '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 d-flex justify-content-end align-items-start'>
                                <button className='btn btn-primary'>Modifier le Parc</button>
                                <button className='btn btn-danger ms-2'>Supprimer le Parc</button>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* <div className='col-3 mt-4'>
                    <Card title="Humidité moyenne des capteurs" subtitle="12 dernières heures">
                        <div className='d-flex justify-content-center mt-2'>
                            <PercentageWidget percentage={50} color={'#0085FF'}/>
                        </div>
                    </Card>
                </div>
                <div className='col-9 mt-4'>
                    <Card title="Evolution du taux de CO" subtitle="12 dernières heures">
                        <SensorDataChart label="Monoxyde de carbone" pollutant="reducers" color="#80ffdb" unit="ppm" />
                    </Card>
                </div> */}
                <div className='col-12 my-4'>
                    <Card title="Capteurs du parc">
                        <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="1" />
                                </div>
                                </th>
                                <th className="">Nom</th>
                                <th className="">Dernier AQI</th>
                                <th className="">Parc</th>
                                <th className="text-end">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            { park.Sensors.map(sensor=>
                            <tr>
                                <td>
                                <div className="w-100">
                                    <input
                                    className="form-check-input mx-auto"
                                    type="checkbox"
                                    value="1"
                                    ></input>
                                </div>
                                </td>
                                <td>
                                <div className="d-flex justify-content-start flex-column">
                                    <a href="#" className="fw-bold">
                                    {sensor.name?sensor.name: '-'}
                                    </a>
                                    <span className="text-muted">{sensor.name?sensor.createdAt: '-'}</span>
                                </div>
                                </td>
                                <td>
                                    <Gauge percent={34} />
                                </td>
                                <td>
                                <div className="d-flex justify-content-start flex-column">
                                    <a href="#" className="fw-bold">
                                    {park.name?park.name: '-'}
                                    </a>
                                    <span className="text-muted">{park.Sensors.lenght?park.Sensors.lenght: '-'}</span>
                                </div>
                                </td>
                                <td>
                                <div className="d-flex justify-content-end flex-shrink-0">
                                    <Link
                                    to="/sensors/edit"
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                    >
                                    <span className="svg-icon svg-icon-3">
                                        <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            opacity="0.3"
                                            d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                            fill="currentColor"
                                        ></path>
                                        </svg>
                                    </span>
                                    </Link>
                                    <Link
                                    to="javascript:void(0)"
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                    onClick={() => deleteItem()}
                                    >
                                    <span className="svg-icon svg-icon-3">
                                        <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.5"
                                            d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            opacity="0.5"
                                            d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                                            fill="currentColor"
                                        ></path>
                                        </svg>
                                    </span>
                                    </Link>
                                </div>
                                </td>
                            </tr>
                            )}
                            </tbody>
                        </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>:
        <></>
    )
}

export default ShowPark