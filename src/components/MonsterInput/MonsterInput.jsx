import React from "react";
import Typeahead from "../Typeahead/Typeahead"



export default function MonsterInput(props){

    return (
        <>
        <Typeahead 
            fetchAllOnOpen={true}
            maxSuggestions={4}
            placeholder={"Find Monster..."}
            getSuggestions={() => props.monsterData.map(m => ({ id: m.index, text: m.name}))}
            performAction={props.onChange}
            inputDelay = {500}
        />
        </>
    )
}
