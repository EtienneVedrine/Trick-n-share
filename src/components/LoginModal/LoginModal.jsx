import './LoginModal.css'
import { useContext, useState } from 'react';
import { SettingsContext } from '../../utils/context';
import axiosInstance from '../../utils/axiosInstance';


function LoginModal() {
    // Ici les states liés aux inputs contrôlés du formulaire
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const { setIsLogged, setIsLoginModalDisplayed, setIsNotificationDisplayed, setNotifMessage, setIsSuccess } = useContext(SettingsContext);

    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    // Définition du handler du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: userId,
            password: userPassword
        };

        try {
            const response = await axiosInstance.post(
                "/user/login", formData);

            if (response.status === 200) {
                console.log("Connexion réussie");
                // on récupère le JWT et on le stocke dans le local storage
                const token = response.data.token;
                const user = response.data.user

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user))

                // on modifie le state global isLogged
                setIsLogged(true);

                //on ferme la modale de connexion
                setIsLoginModalDisplayed(false);

                //on affiche la modale de notification de connexion réussie pendant 5 secondes
                setIsNotificationDisplayed(true);
                setIsSuccess(true);
                setNotifMessage("Authentification réussie !")
                setTimeout((() => {
                    setIsNotificationDisplayed(false);
                    setIsSuccess(false);
                    setNotifMessage("")
                }), 5000)

            }

        } catch (error) { // on affiche une modale d'erreur si l'authentification a échoué
            console.log(error);

            // on informe l'utilisateur que l'authentification ne s'est pas faite
            setIsNotificationDisplayed(true);
                setIsSuccess(false);
                setNotifMessage("Echec de l'authentification : veuillez réessayer")
                setTimeout((() => {
                    setIsNotificationDisplayed(false);
                    setIsSuccess(false);
                    setNotifMessage("")
                }), 5000)
        }

    };

    return (
        <div className='z-10 fixed top-0 left-0 h-full w-full bg-gray-50 bg-opacity-70 grid place-items-center'>
            <div className='bg-slate-400 flex flex-col items-center w-3/4 p-4 m-auto'>
                <button
                    className='self-end'
                    onClick={() => setIsLoginModalDisplayed(false)}
                >
                    ✖️
                </button>
                <h1 className='font-bold m-3'>Se connecter</h1>
                <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                    <div className='self-end'>
                        <label htmlFor='userId'>Identifiant :</label>
                        <input
                            className="border m-2"
                            placeholder='Email'
                            type='text'
                            id='userId'
                            name='userId'
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className='self-end'>
                        <label htmlFor='userPassword'>Mot de passe :</label>
                        <input
                            className="border m-2"
                            placeholder='Mot de passe'
                            type={hidePassword ? 'password' : 'text'}
                            id='userPassword'
                            name='userPassword'
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className='text-indigo-800 hover:text-red-600'
                        type='button'
                        onClick={togglePasswordVisibility}
                    >
                        {...hidePassword ? 'Afficher' : 'Cacher'} le mot de passe
                    </button>

                    {/*Mise en place du bouton de validation d'authentification'*/}
                    <button
                        className="m-3 flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                        type="submit"
                    >
                        Se connecter
                    </button>

                </form>
            </div>
        </div>
    )
}


export default LoginModal;