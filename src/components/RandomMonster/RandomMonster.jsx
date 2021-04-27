import React, {useState} from "react"
import ChallengeRating from "../ChallengeRatings/ChallengeRatings"

export default function RandomMonster(props){


    return (
        <>
        <form method="GET">
            <label htmlFor="challengeRating">Monster CR:</label>
            <ChallengeRating />
            <input type="submit" value="Find Monster"/>
        </form>
        </>
    )
}