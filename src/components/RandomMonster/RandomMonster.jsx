import React from "react"
import ChallengeRating from "../ChallengeRatings/ChallengeRatings"

export default function RandomMonster(props){


    return (
        <>
        <form method="GET" action="/random">
            <label htmlFor="challengeRating">Input Monster CR </label>
            <br></br>
            <ChallengeRating />
            <input type="submit" value="Find Monsters"/>
        </form>
        </>
    )
}