import React, { useEffect, useState } from "react";
import MonsterInput from "../../components/MonsterInput/MonsterInput"


export default function MonsterSearch(props){

    const [monsterName, setMonsterName] = useState("");
    //const [monsterData, setMonsterData] = useState("");

    const handleSubmit = (name) => {
        console.log("App monsterName", name)
        setMonsterName(name)
      }
    
    useEffect(() => {
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/${monsterName}`
    
        const makeApiCall = () => {
          fetch(dungeonsAndDragons5Url)
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              //setMonsterData(data)
            })
        }
        makeApiCall();
      }, [monsterName]);

    return(
        <>
        <div>Best Movie App Ever</div>
        <MonsterInput handleSubmit={handleSubmit} />
        </>
    )
}