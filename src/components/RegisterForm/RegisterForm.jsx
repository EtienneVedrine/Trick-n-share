import { useState } from "react";
import "./RegisterForm.css";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  // Ici les states liés aux inputs contrôlés du formulaire  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPro, setIsPro] = useState(false);
  const [siren, setSiren] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  // on utilise useNavigate pour les redirections
  const navigate = useNavigate();

  // on définit le handler de la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
};

  // on définit le handler de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();



    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }



    // On récupère les données saisies par l'utilisateur à envoyer à l'API
    const formData = {
      firstname : firstName,
      lastname : lastName,
      email : email,
      password : password,
      adress : adress,
      zip: zip,
      city: city,
      phone : phone,
      ispro : isPro,
      siren : siren,
    };

    try {
      // on envoie la requête POST à l'API  
      const response = await axiosInstance.post(
        "/user/signup", formData
      ); // on récupère la réponse de l'API et met également en paramètre les données à envoyer

      if (response.status === 201) {
        console.log("Utilisateur créé");
        // on redirige vers la page d'accueil avec la modale de login si le register s'est bien déroulé
        navigate('/');

      } 
    } catch (error) { // on affiche une modale d'erreur si le register a échoué
      console.log(error);
    }

  };

  return (
    <div className="bg-white m-auto rounded-xl p-6 mt-20 w-3/4 shadow-xl max-w-2xl">
      <h1 className="m-3 font-bold text-center">Formulaire d'inscription</h1>
        {/*Mise en place d'un formulaire*/}
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className='w-3/4'>
            {/*Mise en place des inputs du formulaire*/}
          <label className='ml-2 font-semibold' htmlFor="firstName">Prénom</label>
          <input
            className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            placeholder="Prénom"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='w-3/4'>
          <label className='ml-2 font-semibold' htmlFor="lastName">Nom</label>
          <input
            className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            placeholder="Nom"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='w-3/4'>
          <label className='ml-2 font-semibold' htmlFor="adress">Adresse</label>
          <input
            className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="adress"
            name="adress"
            value={adress}
            placeholder="Numéro et nom de voie"
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>
        <div className='w-3/4'>
          <label className='ml-2 font-semibold' htmlFor="zip">Code postal</label>
          <input
            className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="zip"
            name="zip"
            value={zip}
            placeholder="Code postal"
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <div className='w-3/4'>
          <label className='ml-2 font-semibold' htmlFor="city">Ville</label>
          <input
            className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="city"
            name="city"
            value={city}
            placeholder="Ville"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className='w-3/4'>
          <label className='ml-2 font-semibold' htmlFor="email">email</label>
          <input
            className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            placeholder="exemple@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='w-3/4'>
          <label className='ml-2 font-semibold' htmlFor="phone">Téléphone</label>
          <input
            className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            placeholder="0601020304"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='w-3/4 mb-2'>
          <label className='ml-2 ' htmlFor="isPro">
            Vous êtes un professionnel ? Si oui, cocher:
          </label>
          <input
            className="border m-2"
            type="checkbox"
            id="isPro"
            name="isPro"
            checked={isPro}
            onChange={(e) => {
              setIsPro(e.target.checked);
            }}
          />
        </div>
        {isPro && (
          <div className='w-3/4 mt-2'>
            <label className='' htmlFor="siren" className="pl-2 ">Siret</label>
            <input
              className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="siren"
              name="siren"
              value={siren}
              placeholder="12345678912345"
              onChange={(e) => setSiren(e.target.value)}
            />
          </div>)}
        <div className='w-3/4'>
          <label className='ml-2 font-semibold' htmlFor="password">Mot de passe</label>
          <input
            className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            type={hidePassword ? 'password' : 'text'}
            id="password"
            name="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value);
                      setPasswordMatchError(false);
            }}
          />
          <button 
            type='button'
            className="ml-2 text-indigo-500 hover:text-red-500"
            onClick={togglePasswordVisibility}
          >
            {...hidePassword ? 'Afficher' : 'Cacher'} le mot de passe
          </button>
        </div>
        <div className='w-3/4 mt-2'>
          <label className='ml-2 font-semibold' htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            className="self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            type={hidePassword ? 'password' : 'text'}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => { 
              setConfirmPassword(e.target.value)
              setPasswordMatchError(false);}}
          />
        </div>
          {passwordMatchError && (
        <div className="text-red-500">
            Les mots de passe ne correspondent pas.
        </div>
)}
        <div className="flex justify-center">
            {/*Mise en place du bouton de validation du formulaire*/}
          <button
            className="m-3 flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
            type="submit"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
