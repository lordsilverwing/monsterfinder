import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment,Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

export default function PageHeader({handleLogout}){
    return (
        <Segment clearing>
            <Header as='h2' floated='left'>
                <Link to="/"><FontAwesomeIcon icon={['fab', 'd-and-d']} size="2x" /></Link>
            </Header>
            <Header as='h2' floated='right'>
                <Link to='' onClick={handleLogout}>Logout</Link>
            </Header>
        </Segment>
    )
}