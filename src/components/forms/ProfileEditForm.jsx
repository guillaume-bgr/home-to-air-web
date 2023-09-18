import { useState, useContext } from "react";
import { fetchApi } from "../../utils/ApiUtil";
import { TimerAlert } from "../../utils/PopupUtils";    
import { AuthContext } from "../../context/AuthContext";

function ProfileEditForm(props) {
    const context = useContext(AuthContext)
    const [firstName, setFirstName] = useState(props.data?.first_name);
    const [lastName, setLastName] = useState(props.data?.first_name);

    console.log(props.data?.first_name);

    const updateCustomer = async () => {
        fetchApi('PATCH', {first_name: firstName, last_name: lastName}, '/customers/'+context.userId, context.token)
        .then((response) => {
            if (response.statusCode == 200) {
                TimerAlert('Utilisateur mis à jour !', 'success')
            }
        }).catch((error)=>{
            console.log("Api call error");
            console.log(error.message);
            TimerAlert(error.message, 'error')
        });
    }
    

    return (
        <form className="py-2">
            <input type="text" name="name" defaultValue={props.data?.first_name} onChange={e => setFirstName(e.target.value)} className="form-input-solid shadow-none mb-3" placeholder="Prénom" />
            <input type="text" name="name" defaultValue={props.data?.last_name} onChange={e => setLastName(e.target.value)} className="form-input-solid shadow-none mb-3" placeholder="Nom" />
            <button type="button" className="btn btn-primary" onClick={() => updateCustomer()}>Ajouter</button>
        </form>
    )
}

export default ProfileEditForm;