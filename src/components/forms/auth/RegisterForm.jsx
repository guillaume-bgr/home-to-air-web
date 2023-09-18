import { useState } from "react";
import { TimerAlert, ToastAlert } from "../../../utils/PopupUtils";
import { verifyEmail, verifyOnlyLetters, verifyPassword, escapeHtml } from "../../../utils/FormUtil";
import { fetchApi } from "../../../utils/ApiUtil";

export default function RegisterForm() {
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    
    const verifyForm = async () => {
        let pwd = false , vpwd = false, mail = false, lName = false, fName = false
        if(verifyOnlyLetters(first_name, "Le Prénom").verif != true){
            ToastAlert(verifyOnlyLetters(first_name, "Le Prénom").message)
        }else{
            setFirstname(verifyOnlyLetters(first_name, "Le Prénom").text)
            fName = true
        }
        if(verifyOnlyLetters(last_name).verif != true){
            ToastAlert(verifyOnlyLetters(last_name).message)
        }else{
            setLastname(verifyOnlyLetters(last_name).text)
            lName = true
        } 
        if(verifyEmail(email).verif != true){
            ToastAlert(verifyEmail(email).message)
        }else{
            setEmail(verifyEmail(email).text)
            mail = true
        } 
        if(verifyPassword(password).verif != true){
            ToastAlert(verifyPassword(password).message)
        }else{
            setPassword(verifyPassword(password).text)
            pwd= true
            if(password != escapeHtml(repeatPassword)){
                ToastAlert('Le mot de passe et sa confirmation doivent être identiques')
            }else{vpwd = true}
        }
        if (pwd == true & vpwd == true & mail == true & lName == true & fName == true){
            handleSubmit()
        }  
    }
    const handleSubmit = async () => {
        fetchApi('POST', {first_name, last_name, email, password}, '/customers/create')
        .then((response) => {
            if (response.statusCode == 201) {
                TimerAlert('Compte crée !', 'success')
            }
        }).catch((error)=>{
            console.log("Api call error");
            console.log(error.message);
            TimerAlert(error.message, 'error')
        });
    }
	return (
        <form>
            <div className="row mx-5 pt-4">
                <div className="col-6">
                    <div className="form-floating">
                        <input type="text" className="form-control form-input-solid" placeholder="Nom" id="floatingInput" onChange={e => setLastname(e.target.value)}/>
                        <label htmlFor="floatingInput">Nom</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-floating">
                        <input type="text" className="form-control form-input-solid" placeholder="Prénom" id="floatingInput" onChange={e => setFirstname(e.target.value)}/>
                        <label htmlFor="floatingInput">Prénom</label>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <div className="form-floating">
                        <input type="email" className="form-control form-input-solid" id="floatingInput" onChange={e => setEmail(e.target.value)}/>
                        <label htmlFor="floatingInput">Adresse mail</label>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <div className="form-floating">
                        <input type="password" className="form-control connect-input" placeholder="name@exemple.com" id="floatingPassword" onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Mot de passe</label>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <div className="form-floating">
                        <input type="password" className="form-control connect-input" placeholder="Mot de passe" id="floatingPassword" onChange={e => setRepeatPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Confirmer le mot de passe</label>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-center mt-4">
                    <button type="button" className="btn btn-primary mx-auto mb-3" onClick={() => verifyForm()}>Inscription</button>
                </div>
            </div>
        </form>
	);
}