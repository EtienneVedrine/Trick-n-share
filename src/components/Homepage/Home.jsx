import { useEffect, useState } from "react";
import axiosInstance from '../../utils/axiosInstance.js';
import CustomCarousel from "../CustomCarousel/CustomCarousel.jsx";
import CarouselOfferCard from "../CarouselOfferCard/CarouselOfferCard.jsx";
import { Link } from "react-router-dom";
import CarouselUserCard from "../CarouselUserCard/CarouselUserCard.jsx";


const HomepageContent = () => {
    const [offerList, setOfferList] = useState([]); // Utilisation de useState pour stocker les offres récupérées
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        fetchLastOffersList(); // Appel à fetchOfferList lors du montage du composant
        fetchLastUsersList(); // Appel à fetchUsersList lors du montage
    }, []);

    // on crée une fonction qui va récupérer les quatre dernières annonces publiées
    const fetchLastOffersList = async () => {
        try {
            const response = await axiosInstance.get(
                "/offer"
            );

            if (response.status === 200) {
                console.log("Récupération réussie");
                const offers = response.data;

                // on ne conserve que les quatre derniers éléments du tableau offers
                const arrayLength = offers.length;
                const fourLastOffers = offers.toSpliced(0, (arrayLength - 4));

                // on raccourcit les descriptions pour l'affichage en card
                const shortenedDescriptionOffers = fourLastOffers.map((offer) => {
                    const newOffer = {
                        id: offer.id,
                        title: offer.title,
                        description: `${offer.description.slice(0, 80)} ...`,
                        adress: offer.adress,
                        img_url: offer.img_url,
                        user: offer.user,
                        categorySkill: offer.categorySkill,
                        typeOffer: offer.typeOffer
                    }
                    return (newOffer)
                }
                )

                // on envoie les 4 dernieres offers avec description raccourcie dans le state
                setOfferList(shortenedDescriptionOffers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLastUsersList = async () => {
        try {
            const response = await axiosInstance.get(
                "/user"
            );

            if (response.status === 200) {
                console.log("Récupération réussie");
                const users = response.data;

                // on ne conserve que les quatre derniers éléments du tableau offers
                const arrayLength = users.length;
                const fourLastUsers = users.toSpliced(0, (arrayLength - 4));

                // on raccourcit les présentations trop longues pour l'affichage en card
                const shortenedPresentationUsers = fourLastUsers.map((user) => {
                    const newUser = {
                        id : user.id,
                        firstname : user.firstname,
                        lastname : user.lastname,
                        nickname : user.nickname,
                        adress : user.adress,
                        presentation : user.presentation === null ? ('Pas encore de présentation') : (`${user.presentation?.slice(0,80)} ...`),
                        city : user.city,
                        zip : user.zip,
                        ispro : user.ispro,
                        categorySkill : user.categorySkill
                    }
                    return newUser;
                })

                // on envoie les 4 dernieres offers avec description raccourcie dans le state
                setUsersList(shortenedPresentationUsers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="">
            <div className="xl:flex justify-center ml-3">
                {/* En-tête */}
                <img className="md:p-12 p-2 w-1/3 rounded-full  drop-shadow-xl xl:m-0 m-auto mt-4 self-center" src="/homepic.jpg">
                </img>
                <div id="frontPage" className="h-40 xl:justify-start md:self-center p-4">
                    <p className="xl:mr-0 font-bold text-4xl md:text-6xl text-center"> Bienvenue sur Trick'n Share</p>
                    <p className="text-lg mt-2 md:text-2xl text-center">Votre marketplace de services, pour les particuliers et les pros</p>
                </div>
            </div>

            {/* Carrousel des annonces */}

            <div className="max-w-4xl p-3 m-auto">
                <div id="offers-carousel" className="col-span-2 md:col-span-1 p-3 mt-12 mb-10">
                    <h2 className="font-bold text-4xl text-cyan-500 mb-2">Les dernières annonces</h2>
                    <CustomCarousel>
                        {offerList.map((offer) => <CarouselOfferCard key={offer.id} offer={offer}></CarouselOfferCard>)}
                    </CustomCarousel >
                </div>
                <div className="flex justify-center">
                    <Link className=" text-white bg-cyan-500 hover:text-black p-3 rounded-lg shadow-lg font-bold" to='offer'>Voir toutes les annonces</Link>
                </div>

                {/* Carrousel des prestataires */}
                <div id="users-carousel" className="col-span-2 md:col-span-1 p-3 mt-16 mb-6">
                    <h2 className="font-bold text-4xl text-red-400 mb-2">Utilisateurs récents</h2>
                    <CustomCarousel>
                        {usersList.map((user) => <CarouselUserCard key={user.id} user={user}></CarouselUserCard> )}
                    </CustomCarousel >
                </div>
                <div className="flex justify-center">
                    <Link className="text-white bg-red-400 hover:text-black p-3 rounded-lg shadow-lg font-bold" to='user'>Voir tous les utilisateurs</Link>
                </div>

            </div>
        </div>
    )
}

export default HomepageContent;



