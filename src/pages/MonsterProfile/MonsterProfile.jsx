import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Header from "../../components/Header/Header"
import MonsterDetails from "../../components/MonsterDetails/MonsterDetails"




export default function MonsterProfile({user, handleLogout}){

    const [monsterData, setMonsterData] = useState("");
    const [loaded, setLoaded] = useState(false)
    const {monsterIndex} = useParams();
    console.log(monsterIndex)

    
    useEffect(() => {
        if (loaded) return;
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/${monsterIndex}`
        const makeApiCall = () => {
          fetch(dungeonsAndDragons5Url)
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              setLoaded(true)
              setMonsterData(data)
            })
         }
        makeApiCall();
       }, [monsterIndex]);

      return(
        <> 
            <Header handleLogout={handleLogout}/>
            {loaded && monsterData && <MonsterDetails monster={monsterData} />} 
        </>
      )

}