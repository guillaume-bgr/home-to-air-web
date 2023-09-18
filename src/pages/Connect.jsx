import logo from '../assets/img/logos/logo-Home2Air-black.png'
import ConnectForm from '../components/forms/auth/ConnectForm';
import RegisterForm from '../components/forms/auth/RegisterForm';
export default function Connect() {

	return (
        <>
            <div className="container w-25 p-5 mt-5 rounded-3">
                <img className="img-fluid m-auto" src={logo} alt="Logo" />
            </div>
            <div className="connect-page container p-2 card-width">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Connexion</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Inscription</button>
                    </li>
                </ul>
                <div className="tab-content connect" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <ConnectForm/>
                </div>
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                    <RegisterForm/>
                </div>
                </div>
            </div>
        </>
	);
}
