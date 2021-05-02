import React from 'react'


export default function Proficiencies(pro){
    return(
        <span>{pro.proficiency.name} : {pro.value}</span>
    )
}