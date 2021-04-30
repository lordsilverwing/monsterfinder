import React from 'react'


export default function SpecialAbility(action){
    return(
        <>
        <dt><strong>{action.name}</strong></dt> <dd>{action.desc}</dd>
        </>
    )
}