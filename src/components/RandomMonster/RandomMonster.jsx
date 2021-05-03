import React from "react"
import ChallengeRating from "../ChallengeRatings/ChallengeRatings"
import {Button} from "semantic-ui-react"
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
            <Button animated='vertical' type="submit">
                <Button.Content hidden>Submit</Button.Content>
                <Button.Content visible>
                    <FontAwesomeIcon icon={["fas", "dice-d6"]} size="lg" />
                </Button.Content>
            </Button>
        </form>
        </>
    )
}