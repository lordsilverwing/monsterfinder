import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "./MonsterCard.css"

library.add(fas)

export default function RandomMonsterCard({monster}){

    const [monsterData, setMonsterData] = useState("");
    const [loaded, setLoaded] = useState(false)




    
    useEffect(() => {
        if (loaded) return;
        let dungeonsAndDragons5Url = `https://www.dnd5eapi.co/api/monsters/${monster.index}`
        const makeApiCall = () => {
          fetch(dungeonsAndDragons5Url)
            .then((res) => res.json())
            .then((data) => {
              setLoaded(true)
              setMonsterData(data)
            })
         }
        makeApiCall();
       }, [monster.index, loaded]);

    

    return(
    
        <Card centered={true} id="monsterCard">
            <Card.Header>
                <h3>{monster.name}</h3>
            </Card.Header>
            <Card.Content textAlign="left">
                <div id="monsterLink">
                    <Link to={location => `${monster.index}`} >Go to Details<FontAwesomeIcon icon={["fas", "scroll"]} size="2x" /></Link>
                </div>
                <h4>{monsterData.size} {monsterData.type} {monsterData.subtype} , {monsterData.alignment}</h4>
                <div><strong>Challenge Rating</strong> {monsterData.challenge_rating}</div>
                
            </Card.Content>
            
        </Card>
    

       
    )
}