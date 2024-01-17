
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfferCard from '../OfferCard/OfferCard';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';


export default function Offer() {

    const [offerList, setOfferList] = useState([]); // Utilisation de useState pour stocker les offres récupérées
    const [categorySkillsList, setCategorySkillsList] = useState([])
    const [departementsList, setDepartementsList] = useState([]);
    const [zip, setZip] = useState("");
    const [catSkillId, setCatSkillId] = useState("");

    useEffect(() => {
        fetchOfferList(); // Appel à fetchOfferList lors du montage du composant
        fetchCatSkills();
        fetchDepartementsList();
    }, []);

    useEffect(() => {
        fetchOffersFiltered();
    }, [zip, catSkillId])

    // Pour récupérer toutes les offres
    const fetchOfferList = async () => {
        try {
            const response = await axiosInstance.get(
                "/offer"
            );

            if (response.status === 200) {
                console.log("Récupération réussie");

                // on raccourcit les descriptions pour l'affichage en card

                const shortenedDescriptionOffers = response.data.map((offer) => {
                    const newOffer = {
                        id: offer.id,
                        title: offer.title,
                        description: (offer.description.length > 31 ? (`${offer.description.slice(0, 150)}...`) : (offer.description)),
                        shorterDescription: (offer.description.length > 31 ? (`${offer.description.slice(0, 60)}...`) : (offer.description)),
                        adress: offer.adress,
                        city: offer.city,
                        zip: offer.zip,
                        img_url: offer.img_url,
                        user: offer.user,
                        categorySkill: offer.categorySkill,
                        typeOffer: offer.typeOffer
                    }
                    return (newOffer)
                })
                setOfferList(shortenedDescriptionOffers); // Mise à jour de l'état avec les offres récupérées
            }
        } catch (error) {
            console.log(error);
        }
    };

    // fonction pour récupérer la liste des départements
    const fetchDepartementsList = async () => {
        try {
            const { data } = await axios.get('https://geo.api.gouv.fr/departements');
            setDepartementsList(data);
        } catch (error) {
            console.log(error)
        }
    }

    // Pour récupérer toutes les catskills
    const fetchCatSkills = async () => {
        try {
            const { data } = await axiosInstance.get('/categoryskill');

            setCategorySkillsList(data);

        } catch (error) {
            console.log(error)
        }
    }

    // fonction pour récupérer les annonces filtrées
    const fetchOffersFiltered = async () => {
        try {
            const { data } = await axiosInstance.get(`/offer?catSkillId=${catSkillId}&zip=${zip}`);
            const shortenedDescriptionOffers = data.map((offer) => {
                const newOffer = {
                    id: offer.id,
                    title: offer.title,
                    description: (offer.description.length > 31 ? (`${offer.description.slice(0, 150)}...`) : (offer.description)),
                    shorterDescription: (offer.description.length > 31 ? (`${offer.description.slice(0, 60)}...`) : (offer.description)),
                    adress: offer.adress,
                    city: offer.city,
                    zip: offer.zip,
                    img_url: offer.img_url,
                    user: offer.user,
                    categorySkill: offer.categorySkill,
                    typeOffer: offer.typeOffer
                }
                return (newOffer)
            })
            setOfferList(shortenedDescriptionOffers);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='p-6 mt-2'>
            <h1 className=' text-center font-bold text-2xl'>Liste des annonces</h1>

            <div className='mt-8 flex flex-wrap justify-center'>
    
                    <div className='flex flex-wrap justify-center mb-8 w-full'>
                        <div className='flex flex-wrap justify-center p-4'>
                            <p className='font-semibold m-4 text-center'>Rechercher par département</p>
                            <select className=' h-12 hover:bg-gray-100' name="departements" id="departements" onChange={(e) => setZip(e.target.value)}>
                                {departementsList?.map((departement) =>
                                    <option key={departement.code} value={departement.code}>{departement.nom}</option>
                                )}
                            </select>
                        </div>
                        <div className='flex flex-wrap justify-center p-4'>
                            <p className='font-semibold m-4'>Rechercher par compétence</p>
                            <select className='w-60 h-12 hover:bg-gray-100' name="catskills" id="catskills" onChange={(e) => setCatSkillId(e.target.value)}>
                                {categorySkillsList?.map((skill) =>
                                    <option key={skill.id} value={skill.id}>{skill.label}</option>
                                )}
                            </select>
                        </div>
                    </div>


                    <Link
                        className='w-19 py-3 p-4 inline-flex rounded-md bg-green-100 border border-green-500 font-semibold text-green-500 hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
                        to='/offer/create'>
                        CREER UNE ANNONCE
                    </Link>
            </div>
            <div className='flex flex-wrap ml-4 mr-4'>
                {offerList.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
            </ div>
        </div>
    )
}
