import { useState, useEffect, useContext } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { SettingsContext } from '../../utils/context'

export default function EditProfile() {

  const [nickname, setNickname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [presentation, setPresentation] = useState('')
  const [adress, setAdress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isPro, setIsPro] = useState(false)
  const [siren, setSiren] = useState('')

  // Appel de l'API pour récupérer les données de l'utilisateur et la liste des skills
  const [user, setUser] = useState([]);
  const [skills, setSkills] = useState([]);

  // on importe les setters des states de la notification depuis le state global
  const { setIsNotificationDisplayed, setIsSuccess, setNotifMessage } = useContext(SettingsContext)

  useEffect(() => {
    fetchUser(); // Appel à fetchUser lors du montage du composant
    fetchSkills();
  }, []);

  const fetchUser = async () => {
    try {
      // Récupération de l'id de l'utilisateur depuis le localStorage
      const userId = JSON.parse(localStorage.getItem('user')).id;
      // Requête GET vers l'API pour aller chercher les données de l'utilisateur
      const response = await axiosInstance.get(
        `user/${userId}`
      );
      console.log(response.data)
      if (response.status === 200) {
        console.log("Récupération réussie");
        setUser(response.data); // Mise à jour de l'état avec les offres récupérées
        setFirstname(response.data.firstname)
        setLastname(response.data.lastname)
        setNickname(response.data.nickname)
        setPresentation(response.data.presentation)
        setAdress(response.data.adress)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        setIsPro(response.data.ispro)
        setSiren(response.data.siren)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSkills = async () => {
    try {
      const { data } = await axiosInstance.get('/categoryskill');
      console.log(data);
      setSkills(data);
    } catch (error) {
      console.log(error)
    }
  }

  // Définition du handler du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupération de l'id de l'utilisateur depuis le localStorage
    const userIdPost = JSON.parse(localStorage.getItem('user')).id;

    // Création d'un objet contenant les données du formulaire
    const formData = {
      nickname,
      firstname,
      lastname,
      presentation,
      adress,
      email,
      phone,
      ispro: isPro,
      siren
    };
    //Appel de l'API pour mettre à jour les données de l'utilisateur
    try {
      // Requête PATCH vers l'API pour mettre à jour les données de l'utilisateur
      const response = await axiosInstance.patch(
        `/user/${userIdPost}`, formData);

      if (response.status === 200) {

        setIsNotificationDisplayed(true);
        setIsSuccess(true);
        setNotifMessage("Modification de profil prise en compte !")
        setTimeout((() => {
          setIsNotificationDisplayed(false);
          setIsSuccess(false);
          setNotifMessage("")
        }), 5000)
      }

    } catch (error) { // on affiche une modale d'erreur si l'authentification a échoué
      console.log(error.response.data.message);
      setIsNotificationDisplayed(true);
      setIsSuccess(false);
      setNotifMessage("La modification de profil a échoué. Veuillez réessayer plus tard !")
      setTimeout((() => {
        setIsNotificationDisplayed(false);
        setIsSuccess(false);
        setNotifMessage("")
      }), 5000)
    }

  };

  // Fonction pour ajouter un skill à l'utilisateur
  const handleAddSkillClick = async (skillId) => {
    try {
      const response = await axiosInstance(`/user/categoryskill/${skillId}`);
      fetchUser();
      setIsNotificationDisplayed(true);
      setIsSuccess(true);
      setNotifMessage("Nouvelle compétence ajoutée avec succès!")
      setTimeout((() => {
        setIsNotificationDisplayed(false);
        setIsSuccess(false);
        setNotifMessage("")
      }), 5000)
      return response
    } catch (error) {
      console.log(error)
      setIsNotificationDisplayed(true);
      setIsSuccess(false);
      setNotifMessage("Echec de l'ajout de compétence, merci de réeesayer plus tard!")
      setTimeout((() => {
        setIsNotificationDisplayed(false);
        setIsSuccess(false);
        setNotifMessage("")
      }), 5000)
    }
  }

  const handleRemoveSkillClick = async (skillId) => {
    try {
      const response = await axiosInstance(`/categoryskill/${skillId}/user`);
      fetchUser();
      setIsNotificationDisplayed(true);
      setIsSuccess(true);
      setNotifMessage("Compétence supprimée avec succès!")
      setTimeout((() => {
        setIsNotificationDisplayed(false);
        setIsSuccess(false);
        setNotifMessage("")
      }), 5000)
      return response
    } catch (error) {
      console.log(error)
      setIsNotificationDisplayed(true);
      setIsSuccess(false);
      setNotifMessage("Echec de la suppression de compétence, merci de réeesayer plus tard!")
      setTimeout((() => {
        setIsNotificationDisplayed(false);
        setIsSuccess(false);
        setNotifMessage("")
      }), 5000)
    }
  }




  return (
    <div className="bg-white m-auto rounded-xl p-6 mt-20 sm:w-3/4 max-w-2xl shadow-xl ">
      <h1 className="m-3 text-center rounded-md text-lg   mb-4 font-semibold mx-2 mt-2">Modifier votre profil</h1>
      {user && (
        <div>
          <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <div className='w-3/4'>
              <label className='ml-2 font-semibold' htmlFor="nickname">Pseudo</label>
              <input
                className='self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                type="text"
                name="nickname"
                id="nickname"
                placeholder={user.nickname}
                value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </div>
            <div className='w-3/4'>
              <label className='ml-2 font-semibold' htmlFor="firstname">Prénom</label>
              <input
                className='self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                type="text"
                name="firstname"
                id="firstname"
                placeholder={user.firstname}
                value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div className='w-3/4'>
              <label className='ml-2 font-semibold' htmlFor="lastname">Nom</label>
              <input
                className='self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                type="text"
                name="lastname"
                id="lastname"
                placeholder={user.lastname}
                value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div className='w-3/4'>
              <label className='ml-2 font-semibold' htmlFor="adress">Adresse</label>
              <input
                className='self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                type="text"
                name="adress"
                id="adress"
                value={adress} onChange={(e) => setAdress(e.target.value)} />
            </div>
            <div className='w-3/4'>
              <label className='ml-2 font-semibold' htmlFor="email">Email</label>
              <input
                className='self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                type="email"
                name="email"
                id="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='w-3/4'>
              <label className='ml-2 font-semibold' htmlFor="phone">Téléphone</label>
              <input
                className='self-end border m-2 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                type="tel"
                name="phone"
                id="phone"
                value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className='w-3/4'>
              <label className='ml-2 font-semibold' htmlFor="presentation">Présentation</label>
              <textarea
                className='border h-32 block appearance-none bg-white border-gray-400 hover:border-gray-500 w-full ml-2 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline justify-items-start resize-none'
                type="text"
                name="presentation"
                id="presentation"
                value={presentation} onChange={(e) => setPresentation(e.target.value)} />
            </div>
            <div className='w-3/4 mt-4'>
              <label className='ml-2' htmlFor="isPro">Professionnel</label>
              <input
                className='self-end border m-2'
                type="checkbox"
                name="isPro"
                id="isPro"
                value={isPro}
                checked={isPro}
                onChange={(e) => setIsPro(e.target.checked)} />
            </div>
            {isPro && (
              <div>
                <label htmlFor="siret" className="pl-8">Siret</label>
                <input
                  className='self-end border m-2'
                  type="text"
                  id="siret"
                  name="siret"
                  value={siren}
                  placeholder="12345678912345"
                  onChange={(e) => setSiren(e.target.value)}
                />
              </div>)}
            {/* On affiche la liste des compétences de l'utilisateur  */}
            <p className=" m-3 pt-4 font-bold">Vos compétences</p>
            <div className='flex flex-wrap'>
              {user.categorySkill?.length > 0 ? (
                user.categorySkill.map((skill) => {
                  return (
                    <div key={skill.id} className='mt-2 mx-2 flex'>
                      <div className=' bg-indigo-800 text-white p-2 rounded-md text-center hover:no-underline  my-1' >{skill.label}
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className='text-center'>Vous n'avez pas de compétence enregistrée pour le moment.</p>
              )}
            </div>

            {/* On affiche la liste des compétences et les boutons pour les ajouter ou les enlever */}
            <p className=" mt-12 mb-2 font-semibold">Ajouter/supprimer des compétences</p>
            <div className='mt-4 sm:flex flex-wrap '>
              {skills.map((skill) => {
                return (
                  <div key={skill.id} className='sm:w-1/2 pr-8 flex justify-between my-1 '>
                    <div>{skill.label}</div>
                    <div className='self-center'>
                      <span className=' cursor-pointer font-bold bg-indigo-800 text-white rounded-full  p-0.5 px-1.5 text-center'
                        onClick={() => handleAddSkillClick(skill.id)}>➕</span>
                      <span className='cursor-pointer font-bold bg-white text-indigo-800 rounded-full  p-0.5 px-1.5 text-center border border-gray-400 ml-2'
                        onClick={() => handleRemoveSkillClick(skill.id)}>➖</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='mt-8'>
              <button
                className="m-3 flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                type="submit">Valider</button>
            </div>
          </form>



        </div>
      )}
    </div>
  )
}
