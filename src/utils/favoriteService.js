import tokenService from './tokenService';


const BASE_URL = '/api';

export function create(userID, monster){
    console.log(monster)
    return fetch(`${BASE_URL}/user/${userID}/favorite`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
        body: JSON.stringify({
            monster
        })
    }).then(res => res.json())
}


export function removeFavorite(favID){
    return fetch(`${BASE_URL}/favorite/${favID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json())
}