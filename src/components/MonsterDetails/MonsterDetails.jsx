import React, {useState} from 'react'
import { Card, Icon} from 'semantic-ui-react'
import SpecialAbility from '../SpecialAbility/SpecialAbility'
import MonsterActions from '../MonsterActions/MonsterActions'
import Proficiencies from '../Proficiencies/Proficiencies'

export default function MonsterDetails({monster = {
    speed: {}
}, favoriteApi:{addFavorite, removeFavorite}, user}){
    console.log(user)
    const favoriteIndexNumber = user.favoriteMonsters.findIndex(favoriteMonsters => favoriteMonsters.monsterName === monster.name);
    const [isFavorited, setIsFavorited] = useState(favoriteIndexNumber > - 1)

    let speed = ["Speed: "]
    let senses = ["Senses: "]
    let vuln = ["Vulnerabilities: "]
    let resist = ["Resistances: "]
    let immune = ["Immune: "]
    for (const prop in monster.speed){
         speed.push(prop + " " + monster.speed[prop] + " ")
     }
    for (const prop in monster.senses){
        senses.push(prop + " " + monster.senses[prop] + " ")
    }
    for (const prop in monster.damage_vulnerabilities){
        vuln.push(monster.damage_vulnerabilities[prop] + " ")
    }

    for (const prop in monster.damage_immunities){
        immune.push(monster.damage_immunities[prop] + " ")
    }

    for (const prop in monster.damage_resistances){
        resist.push(monster.damage_resistances[prop] + " ")
    }
    const favMon = user.favoriteMonsters
    console.log(favMon, favoriteIndexNumber)


    const clickHandler = isFavorited
        ? () => {removeFavorite(favMon[favoriteIndexNumber]._id).then(() => setIsFavorited(false)) }
        : () => {addFavorite({name:monster.name, index: monster.index}).then(() => setIsFavorited(true))}
    const favoriteColor = isFavorited ? 'yellow' : 'grey';
    //let speed = Object.keys(monster.speed).map((value) => console.log([value]))
    console.log(monster.proficiencies[0])



    
    return(
        <>
         <Icon name={'star'} size='large' onClick={clickHandler} color={favoriteColor} />
            <h2>{monster.name}</h2>
            <div>{monster.size} <span>{monster.alignment}</span></div>
            <div>{monster.type} <span>{monster.subtype}</span></div>
            <div></div>
            <div>{speed}</div>
            <div>{senses}</div>
            <div>Armor Class: {monster.armor_class}</div><div>Default HP:{monster.hit_points} <span>HD:{monster.hit_dice}</span></div>
            <div>CR: {monster.challenge_rating}</div>
            <h3>Attributes</h3>
            <dl>
            <dt>Strength</dt><dd>{monster.strength}</dd>
            <dt>Dexterity</dt><dd>{monster.dexterity}</dd>
            <dt>Constitution</dt><dd>{monster.constitution}</dd>
            <dt>Intelligence</dt><dd>{monster.intelligence}</dd>
            <dt>Wisdom</dt><dd>{monster.wisdom}</dd>
            <dt>Charisma</dt><dd>{monster.charisma}</dd> 
            </dl>
            { typeof(monster.proficiencies) === typeof([]) &&
           
           <ul>
               {monster.proficiencies.map((value, index) => <li key={`spa-${index}`}><Proficiencies {...value} /></li>)}
           </ul>
           }

            <div>{monster.languages}</div>
            <div>{vuln}</div>
            <div>{resist}</div>
            <div>{immune}</div>
           { typeof(monster.special_abilities) === typeof([]) &&
           
            <dl>
                {monster.special_abilities.map((value, index) => <div key={`spa-${index}`}><SpecialAbility {...value} /></div>)}
            </dl>
            }
            <h3>Actions</h3>
            { typeof(monster.actions) === typeof([]) &&
            <dl>
                {monster.actions.map((value, index) => <div key={`spa-${index}`}><MonsterActions {...value} /></div>)}
            </dl>
            }
            
            <div>Experience Points: {monster.xp}</div>
            
        </>
    )

} 