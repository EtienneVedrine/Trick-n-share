
import './Header.css'
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SettingsContext } from '../../utils/context';

function Header() {
    const {isLogged, setIsLoginModalDisplayed, setIsLogged, setIsNotificationDisplayed, setNotifMessage, setIsSuccess} = useContext(SettingsContext)

    const [isBurgerDisplayed, setIsBurgerDisplayed] = useState(false)
    const [isSearchModalDisplayed, setIsSearchModalDisplayed] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLogged(false)

        //on affiche la modale de notification de déconnexion réussie pendant 5 secondes
        setIsNotificationDisplayed(true);
        setIsSuccess(true);
        setNotifMessage("Déconnexion effectuée avec succès !")
        setTimeout((() => {
            setIsNotificationDisplayed(false);
            setIsSuccess(false);
            setNotifMessage("")
        }), 5000)
    }


    const displayLoginModal = () => {
        setIsLoginModalDisplayed(true);
        setIsBurgerDisplayed(false);
    }

    const hideAllModals = () => {
        setIsLoginModalDisplayed(false);
        setIsBurgerDisplayed(false);
        setIsSearchModalDisplayed(false);
    }

    const user = localStorage.getItem('user');
    const userId = JSON.parse(user)?.id;

    return (
        <header className='border flex justify-between items-center itbg-slate-100'>
            <div className='flex items-center'>
                {/* Logo */}
                <NavLink to="/" onClick={hideAllModals}><img src='/logo.png' alt="logo" className='w-40  p-2 xl:w-64 xl:p-4 ' /></NavLink>
            </div>

            <nav className='flex'>
                {/* Ici les liens de navigation pour les écrans moyens et grands */}
                {isLogged ? (
                    <div className='hidden md:flex text-xl items-center whitespace-nowrap'>
                        {/* <NavLink className='text-sm xl:text-xl xl-text-base m-3 hover:underline underline-offset-4 font-bold' to="/inbox" onClick={hideAllModals} aria-label='Accéder à ma messagerie'>Messagerie</NavLink> */}
                        <NavLink className='text-sm xl:text-xl xl-text-base m-3 hover:underline underline-offset-4 font-bold' to="/user" onClick={hideAllModals} aria-label='Afficher la liste des prestataires'> Prestataires</NavLink>
                        <NavLink className='text-sm xl:text-xl xl-text-base m-3 hover:underline underline-offset-4 font-bold' to="/offer" onClick={hideAllModals} aria-label='Afficher les recherches de services'> Annonces</NavLink>
                        <NavLink className='text-sm xl:text-xl xl-text-base m-3 hover:underline underline-offset-4 font-bold' to="/logout" onClick={handleLogout}>Déconnexion</NavLink>
                    </div>
                ) : (
                    <div className='hidden md:flex'>
                        <NavLink className='text-sm xl:text-xl xl-text-base m-3 hover:underline underline-offset-4 font-bold' to="/user" onClick={hideAllModals} aria-label='Afficher la liste des prestataires'> Prestataires</NavLink>
                        <NavLink className='text-sm xl:text-xl xl-text-base m-3 hover:underline underline-offset-4 font-bold' to="/offer" onClick={hideAllModals} aria-label='Afficher les recherches de services'> Annonces</NavLink>
                        <NavLink className='text-sm xl:text-xl xl-text-base m-3 hover:underline underline-offset-4 font-bold' to="/register" onClick={hideAllModals} aria-label='mes messages'>Inscription</NavLink>
                        <button className='text-sm xl:text-xl xl-text-base m-3 hover:underline underline-offset-4 font-bold' to="/login" onClick={displayLoginModal} aria-label='Se connecter'>Connexion</button>
                    </div>
                )}

                {/* Ici le bouton de profil si on est connecté */}
                {isLogged && (
                    <button className='w-10 m-4' >

                        <NavLink className='w-12' to={`/user/${userId}`} ><img src='/profil.png'></img></ NavLink>

                    </button>
                )}

                {/* Ici le bouton du menu burger qui s'affiche en version mobile */}
                <button className='md:hidden w-12 m-4' onClick={() => setIsBurgerDisplayed(!isBurgerDisplayed)}>
                    <img src='/menu-burger.png' alt="menu-burger" />
                </button>

                
                


                {/* Ici le menu qui s'affiche au clic sur le bouton burger*/}
                {isLogged ? (
                    <aside className={isBurgerDisplayed ? ('burger-menu md:hidden bg-slate-200 p-3 fixed top-32 right-0 z-40 w-64 h-screen drop-shadow-xl ') : ('hidden burger-menu md:hidden bg-slate-200 p-3 fixed top-32 right-0 z-40 w-64 h-screen drop-shadow-xl')}>
                        <button onClick={() => setIsBurgerDisplayed(!isBurgerDisplayed)} className='mb-5'>✖️</button>
                        <ul >
                            {/* <li className='m-6 hover:underline underline-offset-4 font-bold'><NavLink to="/inbox" onClick={hideAllModals} aria-label='Accéder à ma messagerie'>Messagerie</NavLink></li> */}
                            <li className='m-8 h-1 '></li>
                            <li className='m-6 hover:bg-gray-300 font-bold'><NavLink to="/user" onClick={hideAllModals} aria-label='Afficher la liste des prestataires'> Prestataires</NavLink></li>
                            <li className='m-6 hover:bg-gray-300 font-bold'><NavLink to="/user" onClick={hideAllModals} aria-label='Afficher la liste des prestataires'> Prestataires</NavLink></li>
                            <li className='m-6 hover:bg-gray-300 font-bold'><NavLink to="/offer" onClick={hideAllModals} aria-label='Afficher les recherches de services'> Annonces</NavLink></li>
                            <li className='m-6 hover:bg-gray-300 font-bold'><NavLink to="/logout" onClick={handleLogout}>Déconnexion</NavLink></li>
                        </ul>
                    </aside>
                ) : (
                    <aside className={isBurgerDisplayed ? ('burger-menu md:hidden bg-slate-200 p-3 fixed top-32 right-0 z-40 w-64 h-screen drop-shadow-xl ') : ('hidden burger-menu md:hidden bg-slate-200 p-3 fixed top-32 right-0 z-40 w-64 h-screen drop-shadow-xl')}>
                        <button onClick={() => setIsBurgerDisplayed(!isBurgerDisplayed)} className='mb-5'>✖️</button>
                        <ul >
                            <li className='m-8 h-1 '></li>
                            <li className='m-6 hover:bg-gray-300 font-bold'><NavLink to="/user" onClick={hideAllModals} aria-label='Afficher la liste des prestataires'> Prestataires</NavLink></li>
                            <li className='m-6 hover:bg-gray-300 font-bold'><NavLink to="/offer" onClick={hideAllModals} aria-label='Afficher les recherches de services'> Annonces</NavLink></li>
                            <li className='m-6 hover:bg-gray-300 font-bold'><button aria-label='Se connecter' onClick={displayLoginModal}>Connexion</button></li>
                            <li className='m-6 hover:bg-gray-300 font-bold'><NavLink to="/register" onClick={hideAllModals} aria-label='mes messages'>Inscription</NavLink></li>
                        </ul>
                    </aside>
                )}

                {/* Ici la modale de recherche au clic sur l'icône loupe en mode mobile*/}
                <div id="defaultModal" tabIndex="-1" aria-hidden="true" className={isSearchModalDisplayed ? ("fixed top-1/4 left-10 right-10 z-50 w-auto p-4") : ("hidden fixed top-1/4 left-10 right-10 z-50 w-2/4 p-4")}>
                    <div className="relative w-full max-w-2xl max-h-full">           
                        <div className="relative bg-white h-40 rounded-lg shadow">                           
                            <div className="flex items-start justify-between p-4">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Faire une recherche
                                </h3>
                                <button type="button" onClick={() => setIsSearchModalDisplayed(!isSearchModalDisplayed)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
                            </div>

                            <input id='search-input-modal' className='block w-3/4 m-auto p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ' type="text" placeholder='Que recherchez-vous ?'/>

                        </div>
                    </div>
                </div>
            </nav>

        </header>
    )

}




export default Header

