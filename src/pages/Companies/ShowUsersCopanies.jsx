import TopBar from '../../components/layout/Topbar'
import Card from '../../components/widgets/Card'
import { ValidationAlert, TimerAlert} from '../../utils/PopupUtils'
import { Link } from 'react-router-dom'
import { fetchApi } from '../../utils/ApiUtil'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

function ShowUsersCompanies() {

    const context = useContext(AuthContext)
    const [myCompanies, setMyCompanies] = useState(0);
    const [reload, setReload] = useState(false);
    const [mail, setMail] = useState(0);

    useEffect(() => {
        const fetchAsync = async () => {
            try {
                let response = await fetchApi('GET', null, '/companies/user/'+context.userId, context.token);
                setMyCompanies(response.data)
                console.log(response.data);
                } catch (error) {
                console.log(error);
            }
        }
        fetchAsync();
    },[reload])

    const deleteItem = (id, idUser) => {
        ValidationAlert('Êtes-vous sûr de vouloir supprimer cette personne de votre espace ?', deleteUserCompanies, idUser)
      }

      const deleteUserCompanies = async (userId) => {
        try {
            console.log(userId);
          let response = fetchApi('PATCH', {companies_id: null}, '/customers/'+userId, context.token)
          TimerAlert('Perssonne retirée', 'success')
          setReload(!reload)
          } catch (error) {
          console.log(error);
          TimerAlert(error.message, 'error')
      }
      }

      const tranferOwnership = (id, userId) => {
        ValidationAlert('Êtes-vous sûr de vouloir transmettre votre espace à cette personne ?', changeOwner, {id: id, userId: userId})
      }

      const changeOwner = async (params) => {
        try {
            console.log(params.userId)
          let response = fetchApi('PATCH', {actualOwner: context.userId, owner: params.userId}, '/companies/'+params.id, context.token)
          TimerAlert('Le propriétaire de cet espace a bien été modifié', 'success')
          setReload(!reload)
          } catch (error) {
          console.log(error);
          TimerAlert(error.message, 'error')
      }
      }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <TopBar 
                            pageTitle="Espace"
                            breadcrumbs={[
                                {title: 'Accueil', path: '/'},
                                {title: 'Espace', path:'/companies'},
                                {title: 'Membre(s) de mon space'}
                            ]}
                            buttons={[{title: 'Retour au menu', path:'/', className: 'btn-secondary'}]}
                        />
                </div>
                <div className="col-12">
                <Card title="Ajouter un membre">
                <form method="POST" className="py-2 d-flex">
                        <input type="text" name="name"  className="form-input-solid shadow-none mb-3 " placeholder="Adresse mail du membre à ajouter" onChange={e => setMail(e.target.value)}/>
                        <button type="button" className="btn btn-primary ms-4 h-50" onClick={() =>console.log('log')}>Ajouter</button>
                </form>
                </Card>
                </div>
                {myCompanies.length > 0 ?
                 myCompanies.map(company=>
                <div className="col-12">
                <Card title="Les membres">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="1" />
                                        </div>
                                    </th>
                                    <th className="">Prénom</th>
                                    <th className="">Nom</th>
                                    <th className="">Mail</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {company.Customers.map(customer=>
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
                                    {customer.first_name }
                                        </a>
                                    </div>
                                </td>
                                <td>
                                    <a href='#' className='fw-bold'>{customer.last_name} </a>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-start flex-column">
                                        <a href="#" className="fw-bold">
                                    {customer.email }
                                        </a>
                                    </div>
                                </td>
                                <td>
                                <div className="d-flex justify-content-end flex-shrink-0">
                                    <Link
                                    to="javascript:void(0)"
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 "
                                    onClick={() => deleteItem(company.id, customer.id)}
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
                                    </Link >
                                    <Link
                                    to="javascript:void(0)"
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 "
                                    onClick={() => tranferOwnership(company.id, customer.id)}
                                    >

                                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.4 7H4C3.4 7 3 7.4 3 8C3 8.6 3.4 9 4 9H17.4V7ZM6.60001 15H20C20.6 15 21 15.4 21 16C21 16.6 20.6 17 20 17H6.60001V15Z" fill="currentColor"/>
                                            <path opacity="0.3" d="M17.4 3V13L21.7 8.70001C22.1 8.30001 22.1 7.69999 21.7 7.29999L17.4 3ZM6.6 11V21L2.3 16.7C1.9 16.3 1.9 15.7 2.3 15.3L6.6 11Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    </Link >
                                </div>
                            </td>
                        </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
                </div>
            ): <></>}
            </div>
        </div>
            
        )}

export default ShowUsersCompanies
