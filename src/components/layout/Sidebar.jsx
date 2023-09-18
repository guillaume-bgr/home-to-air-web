import logo from './../../assets/img/logos/logo-Home2Air-white.png'
import placeholder from './../../assets/img/placeholder/woman.jpg'
import MainMenu from './MainMenu';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { fetchApi } from '../../utils/ApiUtil';

function Sidebar() {
    const [user, setUser] = useState()
    const context = useContext(AuthContext);
    const removeToken = ()=>{
        context.setToken('')
        console.log(context.token);
    }

    useEffect(() => {
        const fetchAsync = async () => {
            try {
                let response = await fetchApi('GET', null, '/customers/'+ context.userId, context.token);
                setUser(response)
                } catch (error) {
                console.log(error);
            }
        }
        fetchAsync();
    },[])

    return (
        <div id="sidebar" className='d-flex flex-column justify-content-between'>
            <div className="sidebar-top">
                <div className="logo px-4 py-2">
                    <img className="img-fluid" src={logo} alt="Logo" />
                </div>
                <div className="separator">
                </div>
                <MainMenu />
            </div>
            <div className="sidebar-bottom">
                <div className="separator">
                </div>
                <div className="account">
                    <span className="text-white text-center w-100 d-block">Bonjour, {user?.first_name} {user?.last_name}</span>
                    <Link to="/profile" className="profile-picture d-block" style={{textDecoration: 'none'}}>
                        <div className='d-flex justify-content-center align-items-center text-white rounded me-0' style={{height: 64, width: 64}}>
                            <p className='h4 mb-0'>{user ? user.first_name[0] : null}{user ? user.last_name[0] : null   }</p>
                        </div>
                    </Link>
                    <span className="disconnect text-center w-100 d-block" onClick={() => removeToken()}>Se déconnecter</span>
                </div>
            </div> 
        </div>
	);
}

export default Sidebar
