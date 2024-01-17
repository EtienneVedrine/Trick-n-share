import { useContext, useEffect, useState } from "react";
import axiosInstance from '../../utils/axiosInstance.js';
import { useNavigate } from "react-router-dom";
import { SettingsContext } from "../../utils/context.jsx";


export default function CreateOffer() {

    // on va stocker les categoryskills et les typeoffers dans des states
    const [categorySkills, setCategorySkills] = useState([]);
    const [typeOffers, setTypeOffers] = useState([])

    // on doit envoyer title, description, adress, img_url (optionnel), user_id, type_offer_id, category_skill_id + le JWT
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [adress, setAdress] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [img_url, setImg_url] = useState('')
    const [type_offer_id, setType_offer_id] = useState(undefined)
    const [category_skill_id, setCategory_skill_id] = useState([])

    // on utilise useNavigate pour les redirections
    const navigate = useNavigate();

    // on importe du state global les setters permettant de modifier les states de la notification
    const { setIsNotificationDisplayed, setNotifMessage, setIsSuccess } = useContext(SettingsContext)

    const fetchCategorySkills = async () => {
        try {
            const fetchedCategorySkills = await axiosInstance.get("/categoryskill");
            setCategorySkills(fetchedCategorySkills.data);
        } catch (error) {
            console.log("Erreur dans la récupération des categoryskills")
        }
    }

    const fetchTypeOffers = async () => {
        try {
            const fetchedTypeOffers = await axiosInstance.get("/typeoffer");
            setTypeOffers(fetchedTypeOffers.data);
        } catch (error) {
            console.log("Erreur dans la récupération des typeoffers")
        }

    }

    useEffect(() => {
        fetchCategorySkills();
        fetchTypeOffers();
    }, [])


    const handleClick = async (e) => {
        e.preventDefault()


        const offerData = {
            title,
            description,
            zip,
            city,
            adress,
            img_url,
            type_offer_id: Number(type_offer_id),
            catskillid: category_skill_id.toString()

        }

        console.log(offerData);

        try {
            const response = await axiosInstance.post(
                "/offer", offerData);

            if (response.status === 200) {
                // on informe l'utilisateur que son annonce a bien été publiée
                setIsNotificationDisplayed(true);
                setIsSuccess(true);
                setNotifMessage("Votre annonce a bien été postée !")
                setTimeout((() => {
                    setIsNotificationDisplayed(false);
                    setIsSuccess(false);
                    setNotifMessage("")
                }), 5000)

                // on redirige vers la liste des offres si l'annonce a bien été créée
                navigate('/offer')

            }

        } catch (error) { // on affiche une modale d'erreur si l'authentification a échoué
            console.log(error);
            // on informe l'utilisateur que la création d'annonce n'a pu aboutir
            setIsNotificationDisplayed(true);
                setIsSuccess(false);
                setNotifMessage("Votre annonce n'a pu être publiée. Veuillez réessayer plus tard.")
                setTimeout((() => {
                    setIsNotificationDisplayed(false);
                    setIsSuccess(false);
                    setNotifMessage("")
                }), 5000)
        }

    };

    const toggleCategorySkillIdOnCategorySkillsList = (id) => {
        if (category_skill_id.includes(id)) {
            const newList = category_skill_id.filter((element) => element !== id);
            console.log("id déjà présent");
            console.log(newList);
            setCategory_skill_id(newList)
        } else {
            const baseList = category_skill_id
            baseList.push(id);
            const newList = baseList;
            console.log("id pas déjà présent");
            console.log(baseList);
            setCategory_skill_id(newList)
        }
    }

    return (
        <div className="w-3/4 max-w-2xl min-w-fit mt-4 border-solid border-2 container mx-auto block rounded-lg bg-white p-6">
            <h1 className="m-3 font-bold text-center">Création d'annonce</h1>
            <form className="p-2" action="">


                <fieldset className="mb-5">
                    <legend className="mb-3 font-semibold">Quelles sont les compétences requises ?</legend>
                    {categorySkills.map((skill) => {
                        return (
                            <div key={skill.id}>
                                <input
                                    className="mr-3"
                                    type="checkbox"
                                    id={skill.label}
                                    name={skill.label}
                                    value={skill.id}
                                    onClick={(e) => toggleCategorySkillIdOnCategorySkillsList(Number(e.target.value))}
                                ></input>
                                <label htmlFor={skill.label}>{skill.label}</label>
                            </ div>
                        )
                    })}
                </fieldset>
             
                    <div className="mt-0.5">
                        <label className="ml-1 font-semibold" htmlFor="title">Titre :</label>
                        <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="title"
                            id="title"
                            maxLength="32"
                            placeholder="Donnez un titre à votre annonce"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mt-2 mb-0.5">
                        <label className="ml-1 font-semibold" htmlFor="description">Description :</label>
                        <textarea className="border h-24 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline justify-items-start resize-none"
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Décrivez votre annonce"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                <div className="my-5">
                    <label className="ml-1 font-semibold" htmlFor="adress">Adresse :</label>
                    <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="adress"
                        id="adress"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                    />
                </div>

                {/* Changer le set pour récupérer l'adresse ET le code postal/la ville ? */}

                <div className="my-5">
                    <label className="ml-1 font-semibold" htmlFor="City">Ville :</label>
                    <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="City"
                        id="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label className="ml-1 font-semibold" htmlFor="zip">Code postal :</label>
                    <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="zip"
                        id="zip"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label className="ml-1 font-semibold" htmlFor="img_url">Photo :</label>
                    <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="img_url"
                        id="img_url"
                        placeholder="Lien vers votre image"
                        value={img_url}
                        onChange={(e) => setImg_url(e.target.value)}
                    />
                </div>


                <div className="my-5">
                    <label className="ml-1 font-semibold" htmlFor="type_offer_id">Type d'offre :</label>
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 pr-8 rounded shadow leading-tight 🔎"
                            onChange={(e) => setType_offer_id(e.target.value)}
                    >
                        <option selected disabled>Sélectionnez une option</option>
                        {typeOffers.map((typeOffer) => <option
                            key={typeOffer.id}
                            value={typeOffer.id}
                        >
                            {typeOffer.name}
                        </option>)}
                    </select>
                </div>

                <div className="flex justify-center ">
                    <button className=" m-3 bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" onClick={handleClick}>Publier</button>
                </div>
            </form>
        </div>
    )
}

