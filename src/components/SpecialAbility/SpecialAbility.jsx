import React from 'react'


export default function SpecialAbility(ability){
    return(
        <>
        <dt><strong>{ability.name}</strong></dt> 
        <dd>{ability.desc}</dd>
        </>
    )
}