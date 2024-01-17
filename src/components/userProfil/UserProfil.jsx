
import { useState, useEffect, useContext } from 'react';
import './userProfil.css'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'
import { SettingsContext } from '../../utils/context';




export default function Profil() {

    // Récupération du statut de login dans le state global
    const { isLogged, setIsLoginModalDisplayed } = useContext(SettingsContext);

    // Création d'un state pour définir si l'utilisateur consulté est l'utilisateur connecté
    const [isUser, setIsUser] = useState(false);
    // Création d'un state pour stocker l'utilisateur dont on consulte le profil
    const [user, setUser] = useState([]);

    // Récupération du navigate pour les redirections
    const navigate = useNavigate();

    // Récupération de l'id de l'utilisateur
    const { id } = useParams();

    useEffect(() => {
        fetchUser(id); // Appel à fetchUser lors du montage du composant
    }, [id]);

    useEffect(() => {
        checkUser(); // Appel à checkUser pour vérifier si l'utilisateur est sur sa propre page de profil
    }, [user])


    const fetchUser = async (id) => {
        try {
            // POUR MEMOIRE Récupération de l'id de l'utilisateur depuis le localStorage
            // const userId = JSON.parse(localStorage.getItem('user')).id;

            // Requête GET vers l'API pour aller chercher les données de l'utilisateur
            const response = await axiosInstance.get(
                `/user/${id}`
            );
            console.log(response.data)
            if (response.status === 200) {
                console.log("Récupération réussie");
                setUser(response.data); // Mise à jour de l'état avec les offres récupérées
                console.log(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkUser = () => {
        if (window.localStorage.getItem('user')) {
            const loggedUser = JSON.parse(window.localStorage.getItem('user'));
            const isSameUser = (user.id === loggedUser.id);
            setIsUser(isSameUser);
        } else {
            setIsUser(false)
        }
    }



    return (

        <div className="w-2/4 max-w-2xl min-w-fit mt-4 border-solid border-2 container mx-auto block rounded-lg bg-white p-6">
            <Link to='/user' className='font-bold text-indigo-700 hover:text-red-500 underline'>Retour à la liste des utilisateurs</Link>
            <p className='grid place-content-center rounded-md text-2xl mb-6 mx-2 mt-8'>Détails du profil</p>
            <div >
                <div className=' w-full mb-2 pb-1 mx-0.5'>
                    <h1 className=' pb-2 pt-2 mt-2 mb-4 p-2 grid place-content-center text-2xl rounded-md bgColorH font-bold shadow-lg'>{`${user.firstname?.charAt(0).toUpperCase() + user.firstname?.slice(1)} ${user.lastname?.charAt(0).toUpperCase() + user.lastname?.slice(1)}`}</h1>
                </div>
                <div className=' w-full'>
                    <div className='skills'>
                        <p className='grid place-content-center rounded-md text-lg bg-blue-200  mb-2 font-semibold mx-2 mt-2'>Compétences</p>
                        {user.categorySkill?.length > 0 ?
                            (
                                <ul className='flex flex-wrap justify-evenly space-x-2 mt-2 mx-2 font-semibold'>
                                    {user.categorySkill.map((skill) => {
                                        return (
                                            <li className='bg-indigo-800 text-white p-2 rounded-md justify-between text-center hover:no-underline shrink-0 my-1' key={skill.id}>{skill.label}</li>
                                        )
                                    })}
                                </ul>
                            ) : (
                                <p className='text-center'>Cet utilisateur n'a pas de compétences répertoriées</p>
                            )}
                    </div>
                </div>

                <section className='m-2 pt-2 pb-2 rounded'>
                    {/*Ici un champs pour afficher la description */}
                    <div className=''>
                        <h2 className='grid place-content-center rounded-md text-lg bg-blue-200  mb-1 font-semibold mt-2 sectionTitle'>Présentation</h2>
                        <p className='border-solid border-color-black border-2 rounded-md mt-2 p-2 bg-gray-100'>{user.presentation ? user.presentation : "Cet utilisateur n'a pas encore saisi sa présentation."}</p>
                    </div>
                </section>
                {/*Ici un champs pour afficher les coordonnées */}
                <section className='m-2 pt-2 pb-2 rounded'>
                    <h2 className='grid place-content-center rounded-md text-lg bg-blue-200  mb-1 font-semibold mt-2 sectionTitle'>Coordonnées</h2>
                    
                    {/*Les coordonnées ne s'affichent que si l'utilisateur est connecté */}
                    {isLogged ? (
                        <>
                            <p className='border-solid border-color-black border-2 rounded-md mt-2 p-2 bg-gray-100'> <strong>Email :</strong> {user.email ? user.email : ""}</p>
                            <p className='border-solid border-color-black border-2 rounded-md mt-2 mb-2 p-2 bg-gray-100 cordonnate'><strong>Téléphone :</strong> {user.phone ? user.phone : ""}</p>
                            <p className='border-solid border-color-black border-2 rounded-md mt-2 p-2 bg-gray-100 font'> <strong>Adresse postale :</strong> {user.adress ? user.adress : "Adresse postale"} - {user.zip ? user.zip : "Code postal"} - {user.city ? user.city : "Ville"} </p>
                        </>
                    ) : (
                        <div className='border-solid border-color-black border-2 rounded-md mt-2 p-2 bg-gray-100 flex flex-col'>
                            <p className='my-3 mx-4 self-center'>Seuls les utilsateurs connectés peuvent consulter les coordonnées des autres membres.</p>
                            <button className='self-center  text-white bg-cyan-500 hover:text-black p-3 rounded-lg shadow-lg font-bold'
                                onClick={() => setIsLoginModalDisplayed(true)}>Se connecter</button>
                            <p className='my-3 self-center'>Pas encore inscrit ?</p>
                            <button className='self-center  text-white bg-cyan-500 hover:text-black p-3 rounded-lg shadow-lg font-bold'
                                onClick={() => navigate('/register')}>S'inscrire</button>
                        </div>
                    )}

                    {/*Le bouton de modification de profil n'apparait que si l'on est sur son propre profil*/}
                    {isUser && (
                        <div className=' w-full grid place-content-center mt-6 mb-auto '>
                            <NavLink to="/user/profil/editprofile">
                                <button className=' text-white bg-red-600 hover:text-black p-1.5 rounded-lg shadow-lg font-bold'>Modifier le profil</button>
                            </NavLink>
                        </div>
                    )}
                </section>
                {/*Ici un champs pour afficher les annonces de l'utilisateur POUR UNE EVENTUELLE V2*/}
                <section className="border">

                </section>
            </div>
        </div>
    )
}

