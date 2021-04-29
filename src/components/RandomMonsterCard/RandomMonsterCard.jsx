import React from 'react'
import {Link} from 'react-router-dom'


export default function RandomMonsterCard({monster}){
    console.log(monster)
    return(
        
       <Link to={location=> `${monster.index}`}>{monster.name}</Link>
    )
}