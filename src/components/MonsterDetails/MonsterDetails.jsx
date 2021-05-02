import React, {useState} from 'react'
import { Card, Icon, Grid, Divider} from 'semantic-ui-react'
import './MonsterDetails.css'
import SpecialAbility from '../SpecialAbility/SpecialAbility'
import MonsterActions from '../MonsterActions/MonsterActions'
import Proficiencies from '../Proficiencies/Proficiencies'

export default function MonsterDetails({monster = {
    speed: {}
}, favoriteApi:{addFavorite, removeFavorite}, user}){
    console.log(user)
    const favoriteIndexNumber = user.favoriteMonsters.findIndex(favoriteMonsters => favoriteMonsters.monsterName === monster.name);
    const [isFavorited, setIsFavorited] = useState(favoriteIndexNumber > - 1)

    let speed = []
    let senses = []
    let vuln = []
    let resist = []
    let immune = []
    for (const prop in monster.speed){
         speed.push(prop + " " + monster.speed[prop] + " ")
     }
    for (const prop in monster.senses){
        senses.push(prop + " " + monster.senses[prop] + " ")
    }
    for (const prop in monster.damage_vulnerabilities){
        vuln.push(monster.damage_vulnerabilities[prop] + " ")
    }

    for (const prop in monster.damage_immunities){
        immune.push(monster.damage_immunities[prop] + " ")
    }

    for (const prop in monster.damage_resistances){
        resist.push(monster.damage_resistances[prop] + " ")
    }
    const favMon = user.favoriteMonsters
    console.log(favMon, favoriteIndexNumber)


    const clickHandler = isFavorited
        ? () => {removeFavorite(favMon[favoriteIndexNumber]._id).then(() => setIsFavorited(false)) }
        : () => {addFavorite({name:monster.name, index: monster.index}).then(() => setIsFavorited(true))}
    const favoriteColor = isFavorited ? 'yellow' : 'grey';
    //let speed = Object.keys(monster.speed).map((value) => console.log([value]))
    console.log(monster.proficiencies[0])



    
    return(
        <>
        <Card centered={true}>
            <Card.Header>
                <div id='star'><Icon name={'star'} size='large' onClick={clickHandler} color={favoriteColor} /></div>
                <h2>{monster.name}</h2>
                <h4>{monster.size} {monster.type} {monster.subtype} , {monster.alignment}</h4>
            </Card.Header>
            <Card.Content>
            <Grid columns={2} textAlign='left'>
                <Grid.Column>
                    <div><strong>Speed</strong> {speed}</div>
                    <div><strong>Senses</strong> {senses}</div>
                    <div><strong>Armor Class</strong> {monster.armor_class}</div>
                    <div><strong>Hit Points</strong> {monster.hit_points} ({monster.hit_dice})</div>
                    <div><strong>Challenge Rating</strong> {monster.challenge_rating}</div>
                    <div><strong>Experience Points</strong> {monster.xp}</div>
                </Grid.Column>
                <Grid.Column>
                    <div><strong>Languages</strong> {monster.languages}</div>
                    { vuln.length === 0 ? "" : <div><strong>Vulnerabilities</strong> {vuln}</div>}
                    { resist.length === 0 ? "" : <div><strong>Resistances</strong> {resist}</div>}
                    { immune.length === 0 ? "" : <div><strong>Immunities</strong> {immune}</div>}
                </Grid.Column>
            </Grid>
            <Divider horizontal>Attributes</Divider>
            
                <Grid columns={6} divided>
                    <Grid.Row>
                    <Grid.Column>
                    <div>Strength</div><div>{monster.strength}({Math.floor((monster.strength-10)/2)})</div>
                    </Grid.Column><Grid.Column>
                    <div>Dexterity</div><div>{monster.dexterity}({Math.floor((monster.dexterity-10)/2)})</div>
                    </Grid.Column><Grid.Column>
                    <div>Constitution</div><div>{monster.constitution}({Math.floor((monster.constitution-10)/2)})</div>
                    </Grid.Column><Grid.Column>
                    <div>Intelligence</div><div>{monster.intelligence}({Math.floor((monster.intelligence-10)/2)})</div>
                    </Grid.Column><Grid.Column>
                    <div>Wisdom</div><div>{monster.wisdom}({Math.floor((monster.wisdom-10)/2)})</div>
                    </Grid.Column><Grid.Column>
                    <div>Charisma</div><div>{monster.charisma}({Math.floor((monster.charisma-10)/2)})</div>
                    </Grid.Column>  
                </Grid.Row>
                </Grid>
                
               </Card.Content>
            <Card.Content>
                { typeof(monster.proficiencies) === typeof([]) &&
                    <div>
                        {monster.proficiencies.map((value, index) => <span key={`spa-${index}`}><Proficiencies {...value} /> | </span>)}
                    </div>
                }
            </Card.Content>
            <Card.Content textAlign='left'>
           { typeof(monster.special_abilities) === typeof([]) &&
           
            <dl>
                {monster.special_abilities.map((value, index) => <div key={`spa-${index}`}><SpecialAbility {...value} /></div>)}
            </dl>
            }
            
            <Divider horizontal>Actions</Divider>
            { typeof(monster.actions) === typeof([]) &&
            <dl>
                {monster.actions.map((value, index) => <div key={`spa-${index}`}><MonsterActions {...value} /></div>)}
            </dl>
            }
            </Card.Content>
            </Card>
        </>
    )

} 