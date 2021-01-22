import axios from 'axios';

//Configuration du plugin axios qui permet d'envoyer des requêtes http depuis le client avec Vue

export default axios.create({
    //Attention : changer l'URL en fonction du port indiqué 
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json"
    }   
});