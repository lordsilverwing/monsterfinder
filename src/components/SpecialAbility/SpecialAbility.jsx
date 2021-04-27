import React from 'react'


export default function SpecialAbility(ability){
    return(
        <div><strong>{ability.name}</strong> {ability.desc}</div>
    )
}