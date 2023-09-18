import { useContext, useState } from "react";
import { verifyEmail, verifyPassword } from "../../../utils/FormUtil";
import { fetchApi } from "../../../utils/ApiUtil";
import { TimerAlert, ToastAlert } from "../../../utils/PopupUtils";
import { AuthContext } from "../../../context/AuthContext"; 

export default function ConnectForm() {
    const [email, setEmail] = useState('guillaumebongrand1@gmail.com');
    const [password, setPassword] = useState('Password2k1!');
    const context = useContext(AuthContext);

    const verifyForm = async () => {
        let pwd = false , mail = false
        if(verifyPassword(password).verif != true){
            ToastAlert(verifyPassword(password).message)
        }else{
            setPassword(verifyPassword(password).text)
            pwd= true
        }
        if(verifyEmail(email).verif != true){
            ToastAlert(verifyEmail(email).message)
        }else{
            setEmail(verifyEmail(email).text)
            mail = true
        } 
        if (pwd == true & mail == true){
            handleSubmit()
        }  
    }
    const handleSubmit = async () => {
        fetchApi('POST', {email, password}, '/customers/authenticate')
        .then((response) => {
            context.setRefresh(response.data.refresh);
            context.setUserId(response.data.customer.id);
            context.setToken(response.data.token);
        }).catch((error)=>{
            
            // if (response?.statusCode == 500 || response == undefined) {
            //     TimerAlert("Il y a eu un problème durant l'authentification", 'error')
            // }
        });
    }
	return (
        <form>
            <div className="row mx-5">
                <div className="form-floating col-12 mt-4">
                    <input type="email" defaultValue="GuillaumeBongrand1@gmail.com" className="form-control form-input-solid" id="floatingInput" onChange={e => setEmail(e.target.value)} placeholder="name@exemple.com"/>
                    <label htmlFor="floatingInput" className="ms-2">Adresse mail</label>
                </div>
                <div className="form-floating col-12 mt-4">
                    <input type="password" defaultValue="Password2k1!" className="form-control connect-input" id="floatingPassword" onChange={e => setPassword(e.target.value)} placeholder="mot de passe"/>
                    <label htmlFor="floatingPassword" className="ms-2">Mot de passe</label>
                </div>
                <div className="w-100 d-flex justify-content-center mt-4">
                    <button type="button" className="btn btn-primary mx-auto mb-3" onClick={verifyForm}>Connexion</button>
                </div>
            </div>
        </form>
	);
}
