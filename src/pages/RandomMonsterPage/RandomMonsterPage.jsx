import React, {useState, useEffect} from 'react'
import RandomMonsterCard from "../../components/RandomMonsterCard/RandomMonsterCard"
import {useParams, useLocation} from "react-router-dom"
import queryString from "query-string"


export default function RandomMonsterPage(props){
    const [loaded, setLoaded] = useState(false)
    const [monster, setMonster] = useState("");

    const location = useLocation();
    const parsed = queryString.parse(location.search)
    const monsterCr = parsed.challengeRating
    console.log(parsed)

    useEffect(() => {
        if (loaded) return;
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/?challenge_rating=${monsterCr}`
        const makeApiCall = () => {
          fetch(dungeonsAndDragons5Url)
            .then((res) => res.json())
            .then((data) => {
              setLoaded(true)
              setMonster(data)
            })
         }
        makeApiCall();
       }, [monsterCr]);

       return(
        <RandomMonsterCard />
       )
}