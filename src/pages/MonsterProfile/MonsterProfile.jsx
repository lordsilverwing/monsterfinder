import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import MonsterDetails from "../../components/MonsterDetails/MonsterDetails"
import MonsterInput from "../../components/MonsterInput/MonsterInput"



export default function MonsterProfile(props){

    const [monsterData, setMonsterData] = useState("");
    const [loaded, setLoaded] = useState(false)
    const {monsterIndex} = useParams();
    console.log(monsterIndex)

    
    useEffect(() => {
        if (loaded) return;
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/${monsterIndex}`
        console.log(monsterIndex, "useEffect")
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
            {loaded && monsterData && <MonsterDetails monster={monsterData} />} 
        </>
      )

    // return(
    //     <>
    //     {monsterName && monsterData 
    //         ?<MonsterDetails monster={monsterData} />
    //         :<div>Monster Appears Here</div>
    //     }
    //     </>
    // )
}