import Card from "../widgets/Card";
import TopBar from "../layout/Topbar";
import NiceSelect from "../widgets/NiceSelect";
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { fetchApi } from "../../utils/ApiUtil";
import { AuthContext } from "../../context/AuthContext";
import { escapeHtml } from "../../utils/FormUtil";
import { TimerAlert } from "../../utils/PopupUtils";

function SensorForm(props) {

    const [selected, setSelected] = useState(0);
    const [sensor, setSensor] = useState(0);
    const[user, setUser] = useState(0);
    const [parks , setParks] = useState(0);
    const [parksData , setParksData] = useState(0);
    const [name, setName] = useState('');
    const context = useContext(AuthContext);
    let { id } = useParams();

    useEffect(() => {
        const getEditedSensor = async () => {
            if (props.action == 'edit'){
                try {
                    let response = await fetchApi('GET', null, '/sensors/'+ id, context.token);
                    console.log(response);
                    setSensor(response.data);
                    setName(response.data.name);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getEditedSensor();
    },[])

    useEffect(() => {
        const fetchAsync = async () => {
            try {
                let parks = await fetchApi('GET', null, '/parks', context.token);
                setParks(parks)
                let parksData = []
                for (let park in parks) {
                    if(parks[park].id !=undefined & parks[park].name !=undefined){
                        parksData.push({id : parks[park].id,  label: parks[park].name})
                    }
                }
                setParksData(parksData)
                } catch (error) {
                console.log(error);
            }
        }
        fetchAsync();
    },[])

    const sendToApi = async () => {
        let sondeName = escapeHtml(name)
        if (props.action == 'edit'){
            fetchApi('PATCH', {name: sondeName, parks_id: selected.id}, '/sensors/'+sensor.id)
            .then((response) => {
                if (response.statusCode == 200) {
                    TimerAlert('Sondes mise à jour !', 'success')
                }
            }).catch((error)=>{
                console.log("Api call error");
                console.log(error.message);
                TimerAlert(error.message, 'error')
            });
        }else{
            let user = await fetchApi('GET', null, '/customers/'+context.userId, context.token);
            fetchApi('POST', { name: sondeName,  parks_id: selected.id, companies_id: user.Companies.id}, '/sensors/create', context.token)
        .then((response) => {
			console.log(response);
            TimerAlert('Sondes mise à jour !', 'success')
			}).catch((error)=>{
				console.log("Api call error (selectedSecondaryEntity)")
				console.log(error.message)
                TimerAlert(error.message, 'error')
			});
        }
    }

    let formOptions = {
        pageTitle: 'Ajouter un capteur',
        data: {
            name: sensor?.name,
        }
    }

    if (props.action == 'edit') {
        formOptions.pageTitle = 'Modifier un capteur';
    }

    return (
        <div className="container">
            <TopBar 
            pageTitle={formOptions.pageTitle}
            breadcrumbs={[
                {title: 'Accueil', path: '/'},
                {title: 'Capteurs', path: '/sensors'},
                {title: formOptions.pageTitle}
            ]}
            buttons={[{title: 'Retour à la liste', path:'/sensors', className: 'btn-secondary'}]}
            />
            <div className="row">
                <div className="col-12">
                    <Card title={formOptions.pageTitle}>
                        <form method="POST" className="py-2">
                            <input type="text" name="name" defaultValue={formOptions.data.name} className="form-input-solid shadow-none mb-3" placeholder="Nom du capteur" onChange={e => setName(e.target.value)}/>
                            <NiceSelect className="mb-2" options={
                                parksData
                            } setSelected = {setSelected}
                        />
                            <button type="button" className="btn btn-primary" onClick={() => sendToApi()}>Ajouter</button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default SensorForm;