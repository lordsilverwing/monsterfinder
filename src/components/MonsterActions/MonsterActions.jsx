import React from 'react'


export default function SpecialAbility(action){
    return(
        <div><strong>{action.name}</strong> {action.desc}</div>
    )
}