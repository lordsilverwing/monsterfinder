import React, { useState } from "react";


export default function MonsterInput(props){
    const [monsterName, setMonsterName] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        props.handleSubmit(monsterName)
        setMonsterName('')
    };

    const handleChange = e => {
        const name = e.target.value
        setMonsterName(name)
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="monsterName">Monster:</label>
            <input
                id="monsterName"
                type="text"
                value={monsterName}
                onChange={handleChange}
            />
            <input type="submit" value="Find Monster"/>
        </form>
        </>
    )


}