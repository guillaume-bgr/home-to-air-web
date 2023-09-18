import TopBar from "../components/layout/Topbar"
import Card from "../components/widgets/Card"
import { useState, useEffect, useContext } from "react"
import PercentageWidget from "../components/widgets/PercentageWidget"
import SensorList from "../components/widgets/SensorList"
import HelpWidget from "../components/widgets/HelpWidget"
import AqiChart from "../components/widgets/AqiChart"
import AqiBarChart from "../components/widgets/AqiBarChart"
import { fetchApi } from "../utils/ApiUtil"
import { AuthContext } from "../context/AuthContext"
import loadingIcon from './../assets/img/loading.svg'

export const Data = [
    {
    name: "Humidité",
    percentage: 95
    },
    {
    name: "Non humidité",
    percentage: 10,
    },
];

function Home() {
    const context = useContext(AuthContext)
    const [customer, setCustomer] = useState({})
    const [minHumidity, setMinHumidity] = useState()
    const [maxHumidity, setMaxHumidity] = useState()
    const [cityIndexes, setCityIndexes] = useState();
    const [weather, setWeather] = useState();
    const [date, setDate] = useState(new Date());
    const [latLng, setLatLng] = useState()

    useEffect(() => {
        const fetchAsync = async () => {
            try {
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        setLatLng(latitude+','+longitude);
                    }, (error) => {
                        return `Error: ${error.message}`;
                    });
                } else {
                    let error = 'Geolocation is not available in this browser.';
                }
                let customer = await fetchApi('GET', null, '/customers/'+context.userId, context.token);
                setCustomer(customer);
                let minAndMax = await fetchApi('GET', null, '/sensors/least-max-polluant?polluant=humidity', context.token)
                setMinHumidity(minAndMax.min)
                setMaxHumidity(minAndMax.max)
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchAsync();
    }, [])

    useEffect(() => {
        const fetchCityAqi = async () => {
            try {
                let aqiResp = await fetchApi('GET', null, 'https://api.weatherapi.com/v1/forecast.json?key=ce4df03667f84a2a84c65956230609&q='+latLng+'&aqi=yes', null, true);
                setWeather(aqiResp)
                let aqiData = {oxydants: aqiResp.current.air_quality.no2, reducers: aqiResp.current.air_quality.co, pm2_5: aqiResp.current.air_quality.pm2_5, pm10: aqiResp.current.air_quality.pm10}
                let indexes = await fetchApi('POST', {sensorHistory: JSON.stringify(aqiData)}, '/sensors/aqi');
                setCityIndexes(indexes)
            } catch (error) {
                console.log(error.message);
            }
        }
        if (latLng !== undefined) {
            fetchCityAqi();
        }
    }, [latLng])

	return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <TopBar 
                    pageTitle="Accueil"
                    breadcrumbs={[
                        {title: 'Accueil', path: '/'},
                        {title: 'Dashboards'}
                    ]}
                    />
                </div>
                <div className="col-12 col-lg-7 mb-4">
                    <Card title={customer?.first_name ? 'Bienvenue ' + customer?.first_name + ' !' : 'Bienvenue !'}>
                        <p>Votre AQI moyen est de 12</p>
                    </Card>
                </div>
                <div className="col-12 col-lg-5 mb-4">
                    <Card title="Votre taux d'humidité"
                    helper={
                        <HelpWidget modalDirection="left">
                            <p className="pb-1">
                                Bien qu’un taux d’humidité acceptable dépende de nombreux facteurs, l'humidité idéale pour une maison doit généralement être comprise entre 40 et 70 %.
                            </p>
                            <p className="pb-1">
                                En dessous de 40%, vous ferez face à un air très sec. Pourront se multiplier les sensations d’irritations ou de gorge sèche ou d’yeux secs.
                            </p>
                            <p className="pb-1">
                                Au-delà de 70%, vous risquez de faire face à un fort taux d’humidité. De la moisissure risque d’apparaître. Outre le côté inesthétique, elle peut entraîner des difficultés respiratoires (asthme, allergies, essoufflements, etc.).
                            </p>
                        </HelpWidget>
                    }
                    >
                        <div className="row">
                            <div className="col-6 d-flex flex-column align-items-center">
                                <p className="text-center mb-3">Humidité la plus importante</p>
                                <PercentageWidget color={"#c22020"} percentage={maxHumidity} />
                            </div>
                            <div className="col-6 d-flex flex-column align-items-center">
                                <p className="text-center mb-3">Humidité la plus faible</p>
                                <PercentageWidget color={"#0085FF"} percentage={minHumidity}  />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                        </div>
                    </Card>
                </div>
                <div className="col-12 mb-4">
                    <SensorList />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <Card 
                    title={<div className="d-flex align-items-center"><p>{weather ? weather.location.name + " - " : null}</p><img className="weather-icon" src={weather?.current?.condition?.icon}></img></div>} 
                    subtitle={"le "+String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear()}
                    >
                        <div className="d-flex justify-content-center">
                            {cityIndexes ? 
                            <>
                                <AqiChart AQI={cityIndexes.globalAQI}/>
                                <div className="ms-2 d-flex flex-column justify-content-between fs-small">
                                    <p>CO: <span className="fw-bold">277</span></p>
                                    <p>NO²: <span className="fw-bold">7.7</span></p>
                                    <p>PM2,5: <span className="fw-bold">15.9</span></p>
                                    <p>PM10: <span className="fw-bold">17.2</span></p>
                                </div>
                            </>
                            :
                            <div className="d-flex justify-content-center"><img className="w-50" src={loadingIcon} alt="Logo" /></div>}
                        </div>
                    </Card>
                </div>
                <div className="col-12 col-md-6 col-xl-9">
                    <Card title="Vos AQI des douze dernières heures"
                    helper={
                        <HelpWidget modalDirection="left" width={400}>
                            <p className="pb-1">
                            L'Indice de Qualité de l'Air (AQI) est un système de mesure qui évalue la pollution de l'air dans une région donnée. Il fournit une valeur numérique pour informer le public sur la qualité de l'air en fonction de divers polluants atmosphériques.
                            </p>
                            <p className="pb-1">
                                0-50 : <span style={{color: '#2ecc3b'}}>Bon</span>
                            </p>
                            <p className="pb-1">
                                51-100 :  <span style={{color: '#ebdb4b'}}>Modéré</span> 
                            </p>
                            <p className="pb-1">
                                101-150 : <span style={{color: '#ff7e00'}}>Mauvais pour les groupes sensibles</span>
                            </p>
                            <p className="pb-1">
                                151-200 : <span style={{color: '#c22020'}}>Mauvais</span>
                            </p>
                            <p className="pb-1">
                                201-300 : <span style={{color: '#8f3f97'}}>Très mauvais</span>
                            </p>
                            <p className="pb-1">
                            301 et plus : <span style={{color: '#7e0023'}}>Dangereux</span>
                            </p>
                        </HelpWidget>   
                    }
                    >
                        <AqiBarChart></AqiBarChart>
                    </Card>
                </div>
            </div>
        </div>
	);
}

export default Home;