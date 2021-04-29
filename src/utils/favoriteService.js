import tokenService from './tokenService';



const BASE_URL = '/api';

export async function create(userID, monster){
    console.log(monster)
    
    const response = await fetch(`${BASE_URL}/user/${userID}/favorite`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
        body: JSON.stringify({
            monster
        })
    })
    const favoriteMonsters = await response.json()
    tokenService.setFavoriteMonsters(favoriteMonsters)
    return favoriteMonsters
}


export async function removeFavorite(favID){
    const response = await fetch(`${BASE_URL}/favorite/${favID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    })
    const favoriteMonsters = await response.json()
    tokenService.setFavoriteMonsters(favoriteMonsters)
    return favoriteMonsters
}