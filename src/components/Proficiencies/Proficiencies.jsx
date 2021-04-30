import React from 'react'


export default function Proficiencies(pro){
    return(
        <div>{pro.proficiency.name} : <strong>{pro.value}</strong>  </div>
    )
}