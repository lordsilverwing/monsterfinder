import React, { useEffect, useState } from "react";
import {Redirect} from "react-router-dom"
import MonsterInput from "../../components/MonsterInput/MonsterInput"
import RandomMonster from "../../components/RandomMonster/RandomMonster"

export default function MonsterSearch(){


    const [monsterData, setMonsterData] = useState("");
    const [challengeRating, setChallengeRating] = useState("");
    console.log(monsterData)

    const onChange = (index) => {
      setMonsterData({index})
    }


      const handleRandom = (cr) => {
        console.log(challengeRating)    
        setChallengeRating(cr)
      }
    
    useEffect(() => {
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/`
        const makeApiCall = () => {
          fetch(dungeonsAndDragons5Url)
            .then((res) => res.json())
            .then((data) => {
              setMonsterData(data)
            })
        }
        makeApiCall();
      }, []);

      if (monsterData.index) return <Redirect to={`/${monsterData.index}`}/>
    return(
        <>
        <div>Find a Monster</div>
        <MonsterInput monsterData={monsterData.results} onChange={onChange}/>
        <RandomMonster handleRandom={handleRandom} />
        
        </>
    )
}