  import axios from 'axios'

// l'idée c'est de créer une instance d'axios préconfigurée que l'on pourra utiliser partout dans notre code


// on crée une instance avec une URL de base, on aura juste à compléter l'URL au besoin, lorsqu'on effectuera des requêtes
// ex : axiosInstance.get('/recipes') fera une requete sur 'http://localhost:3001/recipes' 
const axiosInstance = axios.create({
    baseURL: "https://projet-tricknshare-back-production.up.railway.app"
})

// on peut aussi utiliser un middleware pour configurer notre requête avant de l'envoyer
axiosInstance.interceptors.request.use((config) => {

    // ici le MW essaye de récupérer le user dans le storage
    const token = window.localStorage.getItem('token')

    // si il le trouve, il ajoute un headers Authorization avec comme valeur le token du localstorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default axiosInstance;

