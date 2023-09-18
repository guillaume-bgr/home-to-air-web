import TopBar from '../../components/layout/Topbar'
import Card from '../../components/widgets/Card'
import { ValidationAlert, TimerAlert} from '../../utils/PopupUtils'
import { Link } from 'react-router-dom'
import { fetchApi } from '../../utils/ApiUtil'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Companies() {

    const context = useContext(AuthContext)
    const [myCompanies, setMyCompanies] = useState(0);
    const [invitedCompanies, setInvitedCompanies] = useState(0);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchAsync = async () => {
            try {
                let user = await fetchApi('GET', null, '/customers/'+context.userId, context.token);
                console.log(user.Companies.id);
                let response = await fetchApi('GET', null, '/companies/user/'+context.userId, context.token);
                setMyCompanies(response.data)
                let res = await fetchApi('GET', null, '/companies/'+user.Companies.id+'/user/'+context.userId, context.token);
                setInvitedCompanies(res.data)
                console.log(res.data)

                console.log(response)
                console.log(myCompanies)
                } catch (error) {
                console.log(error);
            }
        }
        fetchAsync();
    },[reload])

    const deleteItem = (id) => {
        ValidationAlert('Êtes-vous sûr de vouloir supprimer cet espace ?', deleteCompanies, id)
      }

      const deleteCompanies = async (id) => {
        try {
          let response = await fetchApi('DELETE', {actualOwner: context.userId}, '/companies/'+id, context.token);
          TimerAlert('Espace suprimé', 'success')
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
                            {title: 'Espace'}
                        ]}
                        buttons={[{title: 'Ajouter un espace', path:'/companies/add'}, {title: 'Retour au menu', path:'/', className: 'btn-secondary'}]}
                    />
            </div>
            {myCompanies.length > 0 ?
            <div className="col-12">
            <Card title="Mes espaces" subtitle={myCompanies.length+" résultat(s)"}>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="1" />
                            </div>
                            </th>
                            <th className="">Nom</th>
                            <th className="">Nombre de membres</th>
                            <th className="text-end">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        { myCompanies.map(company=>
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
                               {company.name }
                                </a>
                            </div>
                            </td>
                            <td>
                                <a href='#' className='fw-bold'>{company.Customers.length} </a>
                            </td>
                            <td>
                            <div className="d-flex justify-content-end flex-shrink-0">
                                <Link
                                to={"/companies/edit/"+company.id}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
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
                                        opacity="0.3"
                                        d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                        fill="currentColor"
                                    ></path>
                                    <path
                                        d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                        fill="currentColor"
                                    ></path>
                                    </svg>
                                </span>
                                </Link>
                                <Link
                                to="javascript:void(0)"
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 "
                                onClick={() => deleteItem(company.id)}
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
                                to={"/companies/:id"}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                >
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.0173 9H15.3945C14.2833 9 13.263 9.61425 12.7431 10.5963L12.154 11.7091C12.0645 11.8781 12.1072 12.0868 12.2559 12.2071L12.6402 12.5183C13.2631 13.0225 13.7556 13.6691 14.0764 14.4035L14.2321 14.7601C14.2957 14.9058 14.4396 15 14.5987 15H18.6747C19.7297 15 20.4057 13.8774 19.912 12.945L18.6686 10.5963C18.1487 9.61425 17.1285 9 16.0173 9Z" fill="currentColor"/>
                                        <rect opacity="0.3" x="14" y="4" width="4" height="4" rx="2" fill="currentColor"/>
                                            <path d="M4.65486 14.8559C5.40389 13.1224 7.11161 12 9 12C10.8884 12 12.5961 13.1224 13.3451 14.8559L14.793 18.2067C15.3636 19.5271 14.3955 21 12.9571 21H5.04292C3.60453 21 2.63644 19.5271 3.20698 18.2067L4.65486 14.8559Z" fill="currentColor"/>
                                        <rect opacity="0.3" x="6" y="5" width="6" height="6" rx="3" fill="currentColor"/>
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
            </div> : <> </>}

            {invitedCompanies.length>0 ?
            <div className="col-12 my-4">
            <Card title="Les espaces où je suis invité(e)" subtitle="1 résultat">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="1" />
                            </div>
                            </th>
                            <th className="">Nom</th>
                            <th className="text-end">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        { invitedCompanies.map(company=>
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
                               {company.name}
                                </a>
                            </div>
                            </td>
                            <td>
                            <div className="d-flex justify-content-end flex-shrink-0">
                                <Link
                                to={"/"}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
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
                                        d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z"
                                        fill="currentColor"
                                    ></path>
                                    <path
                                        opacity="0.3"
                                        d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z"
                                        fill="currentColor"
                                    ></path>
                                    </svg>
                                </span>
                                </ Link>
                            </div>
                            </td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </Card>
            </div>
            :<></>}
        </div>
        </div>
    )
    }

export default Companies
