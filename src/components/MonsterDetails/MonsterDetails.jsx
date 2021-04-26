import React from 'react'



export default function MonsterDetails({monster}){

    return(
        <>
            <h2>{monster.name}</h2>
            <div>{monster.size} <span>{monster.alignment}</span></div>
            <div>{monster.type} <span>{monster.subtype}</span></div>
            <div>Armor Class: {monster.armor_class}</div><div>Default HP:{monster.hit_points} <span>HD:{monster.hit_dice}</span></div>
            <div>CR: {monster.challenge_rating}</div>
            <h3>Attributes</h3>
            <div>Strength:{monster.strength}</div>
            <div>Dexterity:{monster.dexterity}</div>
            <div>Constitution:{monster.constitution}</div>
            <div>Intelligence:{monster.intelligence}</div>
            <div>Wisdom:{monster.wisdom}</div>
            <div>Charisma:{monster.charisma}</div>

            <div>{monster.languages}</div>
            
        </>
    )

} 