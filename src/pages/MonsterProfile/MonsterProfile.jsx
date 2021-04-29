import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import MonsterDetails from "../../components/MonsterDetails/MonsterDetails"
import * as favoriteApi from '../../utils/favoriteService';



export default function MonsterProfile({user}){

    const [monsterData, setMonsterData] = useState("");
    const [loaded, setLoaded] = useState(false)

    const {monsterIndex} = useParams();

    async function addFavorite(user, monster){
        try {
          const data = await favoriteApi.create(user, monster)
          console.log(data, ' response from addLike')
           // get the updated posts
        } catch(err){
          console.log(err)
        }
      }
  
      async function removeFavorite(favoriteId){
        try{  
          const data = await favoriteApi.removeFavorite(favoriteId);
          console.log(data, ' response from removeFavorite')
            
        } catch(err){
          console.log(err)
        }
      }

    
    useEffect(() => {
        if (loaded) return;
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/${monsterIndex}`
        const makeApiCall = () => {
          fetch(dungeonsAndDragons5Url)
            .then((res) => res.json())
            .then((data) => {
              setLoaded(true)
              setMonsterData(data)
            })
         }
        makeApiCall();
       }, [monsterIndex]);

      return(
        <> 
            {loaded && monsterData && <MonsterDetails 
            monster={monsterData} 
            addFavorite={addFavorite} 
            removeFavorite={removeFavorite}
            user={user}
            />} 
        </>
      )

}