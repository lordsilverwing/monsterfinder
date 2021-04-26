import React, { useEffect, useState } from "react";
import MonsterInput from "../../components/MonsterInput/MonsterInput"
import MonsterDetails from "../../components/MonsterDetails/MonsterDetails"


export default function MonsterSearch(props){

    const [monsterName, setMonsterName] = useState("");
    const [monsterData, setMonsterData] = useState("");

    const handleSubmit = (name) => {    
        let index = name.toLowerCase()
        console.log("App monsterName", index)
        setMonsterName(index)
      }
    
    useEffect(() => {
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/${monsterName}`
        console.log(monsterName, "useEffect")
        const makeApiCall = () => {
          fetch(dungeonsAndDragons5Url)
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              setMonsterData(data)
            })
        }
        makeApiCall();
      }, [monsterName]);

    return(
        <>
        <div>Find a Monster</div>
        <MonsterInput handleSubmit={handleSubmit} />
        {monsterName 
            ?<MonsterDetails monster={monsterData} />
            :<div>Monster Appears Here</div>
        }
        </>
    )
}