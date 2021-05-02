import React from 'react';
import {NavLink} from 'react-router-dom';
import { Segment, Menu, Image } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import './Header.css'

library.add(fab)

export default function PageHeader({handleLogout, user}){
    return (
        <Segment clearing>
            <Menu size='massive' >
                <Menu.Item>
                    <NavLink to="/"><FontAwesomeIcon icon={['fab', 'd-and-d']}  />Monster Finder</NavLink>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>             
                        <NavLink to="/profile">Your Monsters</NavLink>
                    </Menu.Item>   
                    <Menu.Item>
                        <NavLink to='' onClick={handleLogout}><Image src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></Image>Logout</NavLink>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Segment>
    )
}