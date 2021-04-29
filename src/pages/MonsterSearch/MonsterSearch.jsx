import React, { useEffect, useState } from "react";
import {Redirect} from "react-router-dom"
import MonsterInput from "../../components/MonsterInput/MonsterInput"
import RandomMonster from "../../components/RandomMonster/RandomMonster"

export default function MonsterSearch({handleLogout}){

    const [monsterName, setMonsterName] = useState("");
    const [monsterData, setMonsterData] = useState("");
    const [challengeRating, setChallengeRating] = useState("");

    const handleSubmit = (name) => {    
        let index = name.toLowerCase()
        setMonsterName(index)
      }

      const handleRandom = (cr) => {
        console.log(challengeRating)    
        setChallengeRating(cr)
      }
    
    useEffect(() => {
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/${monsterName}`
        const makeApiCall = () => {
          fetch(dungeonsAndDragons5Url)
            .then((res) => res.json())
            .then((data) => {
              setMonsterData(data)
            })
        }
        makeApiCall();
      }, [monsterName]);

      if (monsterData.index) return <Redirect to={`/${monsterData.index}`}/>
    return(
        <>
        <div>Find a Monster</div>
        <MonsterInput handleSubmit={handleSubmit} />
        <RandomMonster handleRandom={handleRandom} />
        
        </>
    )
}