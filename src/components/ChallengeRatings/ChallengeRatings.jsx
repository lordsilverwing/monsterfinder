import React, {useState} from "react"
import "./ChallengeRatings.css"

const challengeRatingList = [0,0.125,0.25,0.5,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,30]

export default function RandomMonster({onChange = () => {}}){
    const [challengeRating, setChallengeRating] = useState(0);


    function handleChange(e){
        
        const cr = parseFloat(e.target.value, 10);
        setChallengeRating(cr);
        onChange(cr); 
   
    }

    return (
        <>
            <select placeholder='Select your country' onChange={handleChange} name="challengeRating" value={challengeRating}>
                {
                    challengeRatingList.map((cr, index) => <option value={cr} key={`spa-${index}`}>{cr}</option>)        
                }
            </select>

        </>
    )
}