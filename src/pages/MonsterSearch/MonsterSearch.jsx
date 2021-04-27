import React, { useEffect, useState } from "react";
import {Redirect} from "react-router-dom"
import Header from "../../components/Header/Header"
import MonsterInput from "../../components/MonsterInput/MonsterInput"

export default function MonsterSearch({handleLogout}){

    const [monsterName, setMonsterName] = useState("");
    const [monsterData, setMonsterData] = useState("");

    const handleSubmit = (name) => {    
        let index = name.toLowerCase()
        setMonsterName(index)
      }
    
    useEffect(() => {
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/${monsterName}`
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

      if (monsterData.index) return <Redirect to={`/${monsterData.index}`}/>
    return(
        <>
        <Header handleLogout={handleLogout}/>
        <div>Find a Monster</div>
        <MonsterInput handleSubmit={handleSubmit} />
        </>
    )
}