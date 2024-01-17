import UserCard from '../UserCard/UserCard.jsx'
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

export default function UsersList() {

    const [usersList, setUsersList] = useState([]); // Utilisation de useState pour stocker tous les users récupérés
    const [departementsList, setDepartementsList] = useState([]);
    const [categorySkillsList, setCategorySkillsList] = useState([]);
    const [zip, setZip] = useState("");
    const [catSkillId, setCatSkillId] = useState("");


    useEffect(() => {
        fetchUsersList(); // Appel à fetchUserList lors du montage du composant
        fetchDepartementsList();
        fetchCatSkills();
    }, []);

    useEffect(() => {
        fetchUsersFiltered();
    }, [zip, catSkillId])

    // fonction pour récupérer la liste des utilisateurs
    const fetchUsersList = async () => {
        try {
            const response = await axiosInstance.get(
                "/user"
            );

            if (response.status === 200) {
                setUsersList(response.data); // Mise à jour de l'état avec les utilisateurs récupérés
            }
        } catch (error) {
            console.log(error);
        }
    };

    // fonction pour récupérer les utilisateurs filtrés
    const fetchUsersFiltered = async () => {
        try {
            const { data } = await axiosInstance.get(`/user?catSkillId=${catSkillId}&zip=${zip}`);
            setUsersList(data);
        } catch (error) {
            console.log(error)
        }
    }

    // fonction pour récupérer la liste des départements
    const fetchDepartementsList = async () => {
        try {
            const { data } = await axios.get('https://geo.api.gouv.fr/departements');
            setDepartementsList(data);
        } catch (error) {
            console.log(error)
        }
    }

    // fonction pour récupérer la liste des catskills
    const fetchCatSkills = async () => {
        try {
            const { data } = await axiosInstance.get('/categoryskill');

            setCategorySkillsList(data);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        
        <div className='p-6'>

            <h1 className=' text-center font-bold text-2xl mb-6'>Liste des utilisateurs</h1>
            <div className='flex flex-wrap justify-center  gap-5'>

                <div className=''>

                    <p>Rechercher par département</p>
                    <select name="departements" id="departements" onChange={(e) => setZip(e.target.value)}>

                        {departementsList?.map((departement) =>
                            <option key={departement.code} value={departement.code}>{departement.nom}</option>
                        )}
                    </select>
                </div>
                <div>

                    <p>Rechercher par compétence</p>
                    <select name="catskills" id="catskills" onChange={(e) => setCatSkillId(e.target.value)}>

                        {categorySkillsList?.map((skill) =>
                            <option key={skill.id} value={skill.id}>{skill.label}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className='flex flex-wrap ml-4 mr-4 mt-8'>
                {usersList?.map((user) => (

                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    )
}