import React from 'react'
import RandomMonsterCard from "../../components/MonsterCard/MonsterCard"

export default function Profile({user, favoriteApi}){

    console.log(user.favoriteMonsters)
    let monsters = user.favoriteMonsters
    return(
        <>
            <h2>{user.username} saved monsters</h2>
            {monsters.map((value, index) => <RandomMonsterCard monster={{name: value.monsterName, index: value.monsterIndex}} key={`RandomMonster-${index}`}/>)}
        </>
    )
}