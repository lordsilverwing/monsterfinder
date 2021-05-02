import React from "react"
import ChallengeRating from "../ChallengeRatings/ChallengeRatings"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)

export default function RandomMonster(props){
    

    return (
        <>
        <form method="GET" action="/random">
            <label htmlFor="challengeRating">Input Monster CR </label>
            <br></br>
            <ChallengeRating />
            <button type="submit"><FontAwesomeIcon icon={["fas", "dice-d6"]} size="lg" /> Submit</button>
        </form>
        </>
    )
}