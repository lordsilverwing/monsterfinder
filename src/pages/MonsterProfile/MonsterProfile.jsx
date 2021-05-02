import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import MonsterDetails from "../../components/MonsterDetails/MonsterDetails"



export default function MonsterProfile({user, favoriteApi}){


    const [monsterData, setMonsterData] = useState("");
    const [loaded, setLoaded] = useState(false)

    const {monsterIndex} = useParams();



    
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
       }, [monsterIndex, loaded]);

      return(
        <> 
            {loaded && monsterData && <MonsterDetails 
            monster={monsterData} 
            favoriteApi={favoriteApi}
            user={user}
            />} 
        </>
      )

}