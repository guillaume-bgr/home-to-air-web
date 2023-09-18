import Card from "../widgets/Card";
import TopBar from "../layout/Topbar";
import { useContext, useEffect, useState } from "react";
import { fetchApi } from "../../utils/ApiUtil";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { escapeHtml } from "../../utils/FormUtil";
import { TimerAlert } from "../../utils/PopupUtils";

function CompaniesForm(props) {
    const [companies, setCompanies] = useState(0);
    const [name, setName] = useState(0);
    const context = useContext(AuthContext)
    let { id } = useParams();

    useEffect(() => {
        const getEditedPark = async () => {
            console.log(id)
            if (props.action == 'edit'){
                try {
                    let response = await fetchApi('GET', null, '/companies/'+ id, context.token);
                    setCompanies(response.data);
                    setName(response.data.name);
                    console.log(response.data)
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getEditedPark();
    },[])


    const sendToApi = async () => {
        let companyName = escapeHtml(name)
        if (props.action == 'edit'){
            fetchApi('PATCH', {name: companyName, actualOwner: companies.owner}, '/companies/'+id, context.token)
            .then((response) => {
                if (response.statusCode == 200) {
                    TimerAlert('Espace mis à jour !', 'success')
                }
            }).catch((error)=>{
                console.log("Api call error");
                console.log(error.message);
                TimerAlert(error.message, 'error')
            });
        }else{
            let user = await fetchApi('GET', null, '/companies', context.token);
            fetchApi('POST', { name: companyName, owner: context.userId}, '/companies/create', context.token)
        .then((response) => {
            TimerAlert('Espace ajouté !', 'success')
			}).catch((error)=>{
				console.log("Api call error Create companies")
				console.log(error.message)
                TimerAlert(error.message, 'error')
			});
        }
    }



    let formOptions = {
        pageTitle: 'Ajouter un espace',
        data: {
            name: companies?.name,
            building: companies?.Buildings,
            sensors: companies?.Sensors?.id
        }
        
    }

    if (props.action == 'edit') {
        formOptions.pageTitle = 'Modifier un espace';
    }

    return (
        <div className="container">
            <TopBar 
            pageTitle={formOptions.pageTitle}
            breadcrumbs={[
                {title: 'Accueil', path: '/'},
                {title: 'Espaces', path: '/companies'},
                {title: formOptions.pageTitle}
            ]}
            buttons={[{title: 'Retour à la liste', path:'/parks', className: 'btn-secondary'}]}
            />
            <div className="row">
                <div className="col-12">
                    <Card title={formOptions.pageTitle}>
                        <form method="POST" className="py-2">
                            <input type="text" name="name" defaultValue={formOptions.data.name} className="form-input-solid shadow-none mb-3" placeholder="Nom de l'espace" onChange={e => setName(e.target.value)}/>
                            <button type="button" className="btn btn-primary" onClick={() => sendToApi()}>Ajouter</button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CompaniesForm;