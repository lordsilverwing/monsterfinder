import React, {useState} from "react"

const challengeRatingList = [0,0.125,0.25,0.5,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,30]

export default function RandomMonster(props){
    const [challengeRating, setChallengeRating] = useState('')

    const handleRandom = e => {
        e.preventDefault();
        props.handleRandom(challengeRating)
        
        setChallengeRating('')
        console.log(challengeRating)
    };



    return (
        <>
        <form onSubmit={handleRandom}>
            <label htmlFor="challengeRating">Monster CR:</label>
            <select id="challengeRating" name="challengeRating">
                {
                    challengeRatingList.map((cr, index) => <option value={cr} key={`spa-${index}`}>{cr}</option>)        
                }
            </select>
            <input type="submit" value="Find Monster"/>
        </form>
        </>
    )
}