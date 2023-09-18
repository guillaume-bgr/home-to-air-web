import Card from "../widgets/Card";
import TopBar from "../layout/Topbar";
import NiceSelect from "../widgets/NiceSelect";
import { useContext, useEffect, useState } from "react";
import { fetchApi } from "../../utils/ApiUtil";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { escapeHtml } from "../../utils/FormUtil";
import { TimerAlert } from "../../utils/PopupUtils";

function ParkForm(props) {
    const [parks, setParks] = useState(0);
    const [park, setPark] = useState(0);
    const [name, setName] = useState(0);
    const [selectedBuilding, setSelectedBuilding] = useState(0);
    const [selectedSensors, setSelectedSensors] = useState([]);
    const [buildingsData, setBuildingsData] = useState(0);
    const [sensorsData, setSensorsData] = useState(0);
    const context = useContext(AuthContext)
    let { id } = useParams();


    useEffect(() => {
        const fetchAsync = async () => {
            try {
                let response = await fetchApi('GET', null, '/customers/'+context.userId+'/parks/', context.token);
                setParks(response)
                console.log(response)
                let buildingsData= []
                let sensorsData= []
                for (let park in response) {
                    if(response[park].id !=undefined & response[park].name !=undefined){
                       if(response[park].Buildings!=undefined){
                            buildingsData.push({value : response[park].Buildings.id, label : response[park].Buildings.name})
                        }
                        if(response[park].Sensors!=undefined){
                            for(let sensor in response[park].Sensors){
                                sensorsData.push({value : response[park].Sensors[sensor].id, label : response[park].Sensors[sensor].name})
                            }
                        }
                    }
                }
                setBuildingsData(buildingsData)
                setSensorsData(sensorsData)
                } catch (error) {
                console.log(error);
            }
        }
        fetchAsync();
    },[])

    useEffect(() => {
        const getEditedPark = async () => {
            if (props.action == 'edit'){
                try {
                    let response = await fetchApi('GET', null, '/parks/'+ id, context.token);
                    setPark(response.data);
                    setName(response.data.name);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getEditedPark();
    },[])


    const sendToApi = async () => {
        let parkName = escapeHtml(name)
        if (props.action == 'edit'){
            if (selectedSensors != []){
                var sensors_id = []
                for (let sensor in selectedSensors){
                    sensors_id.push(selectedSensors[sensor].value)
                }
            }
            fetchApi('PATCH', {name: parkName,  building_id : selectedBuilding.value, sensors : JSON.stringify(sensors_id)}, '/parks/'+id, context.token)
            .then((response) => {
                if (response.statusCode == 200) {
                    TimerAlert('Parc mis à jour !', 'success')
                }
            }).catch((error)=>{
                console.log("Api call error");
                console.log(error.message);
                TimerAlert(error.message, 'error')
            });
        }else{
            let user = await fetchApi('GET', null, '/customers/'+context.userId, context.token);
            fetchApi('POST', { name: parkName,  building_id : selectedBuilding.id, company_id: user.Companies.id}, '/parks/create', context.token)
        .then((response) => {
            TimerAlert('Parc ajouté !', 'success')
			}).catch((error)=>{
				console.log("Api call error Create Park")
				console.log(error.message)
                TimerAlert(error.message, 'error')
			});
        }
    }



    let formOptions = {
        pageTitle: 'Ajouter un parc',
        data: {
            name: park?.name,
            building: park?.Buildings,
            sensors: park?.Sensors?.id
        }
        
    }

    if (props.action == 'edit') {
        formOptions.pageTitle = 'Modifier un parc';
    }

    return (
        <div className="container">
            <TopBar 
            pageTitle={formOptions.pageTitle}
            breadcrumbs={[
                {title: 'Accueil', path: '/'},
                {title: 'Parcs', path: '/parks'},
                {title: formOptions.pageTitle}
            ]}
            buttons={[{title: 'Retour à la liste', path:'/parks', className: 'btn-secondary'}]}
            />
            <div className="row">
                <div className="col-12">
                    <Card title={formOptions.pageTitle}>
                        <form method="POST" className="py-2">
                            <input type="text" name="name" defaultValue={formOptions.data.name} className="form-input-solid shadow-none mb-3" placeholder="Nom du parc" onChange={e => setName(e.target.value)}/>
                            <NiceSelect name="address" placeholder={"Choisir un batiment"} className="mb-3" options={
                                buildingsData
                            } setSelected = {setSelectedBuilding} defaultValue={buildingsData[park?.Buildings?.id-1]} />
                            <NiceSelect name="sensors" isMulti={true} placeholder={"Choisir un / des capteur(s)"} className="mb-3" options={
                                sensorsData
                            } defaultValue={park?.Sensors} setSelected = {setSelectedSensors} />
                            <button type="button" className="btn btn-primary" onClick={() => sendToApi()}>Ajouter</button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ParkForm;