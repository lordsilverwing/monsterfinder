import React, {useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService'
import MonsterSearch from '../MonsterSearch/MonsterSearch'
import MonsterProfile from '../MonsterProfile/MonsterProfile'
import RandomMonsterPage from '../RandomMonsterPage/RandomMonsterPage';
import Header from '../../components/Header/Header'
import Profile from '../Profile/Profile'
import * as favoriteApi from '../../utils/favoriteService'


function App() {

  const [user, setUser] = useState(userService.getUser()) // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like 
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin(){
    setUser(userService.getUser()) // getting the user from localstorage decoding the jwt
  }

  function handleLogout(){
    userService.logout();
    setUser({user: null})
  }

  async function addFavorite(monster){
    try {
      const data = await favoriteApi.create(user._id, monster)
      setUser(u => ({...u, favoriteMonsters:data})) 
    } catch(err){
      console.log(err)
    }
  }

  async function removeFavorite(favoriteId){
    try{  
      const data = await favoriteApi.removeFavorite(favoriteId);
       setUser(u => ({...u, favoriteMonsters:data})) 
    } catch(err){
      console.log(err)
    }
  }
  const favoriteFun = {addFavorite, removeFavorite}

  return (
    <div className="App">
      
      <Switch>
          <Route exact path="/login">
             <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup">
             <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          {userService.getUser() ? 
            <> 
            <Header handleLogout={handleLogout} user={user}/>
             <Switch>
               <Route exact path ="/profile">
                  <Profile user={user} favoriteApi={favoriteFun}/>
                </Route>
              <Route path="/random" component={RandomMonsterPage}>
                <RandomMonsterPage />
              </Route>
              <Route path="/:monsterIndex">
                 <MonsterProfile user={user} favoriteApi={favoriteFun}/>
               </Route>
                <Route exact path="/">
                    <MonsterSearch />
                </Route>
                
            </Switch>
            </>
            :
            <Redirect to='/login'/>
          }
  
      </Switch>
    </div>
  );
}

export default App;
