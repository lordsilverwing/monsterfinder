function setToken(user) {
    if (user.token) {
      // localStorage is given to us by the browser
      localStorage.setItem('token', user.token);
    } else {
      localStorage.removeItem('token');
    }
    if (user && user.favoriteMonsters) {
      setFavoriteMonsters(user.favoriteMonsters)
    }
  }
  
  function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
      // Check if expired, remove if it is
      // atob is a function that decodes a base-64 string
      const payload = JSON.parse(atob(token.split('.')[1]));
      // JWT's exp is expressed in seconds, not milliseconds, so convert
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        token = null;
      }
    }
    return token;
  }
  
  function getUserFromToken() {
    const token = getToken();
    const user = token ? JSON.parse(atob(token.split('.')[1])).user : null;
    if(user){
    user.favoriteMonsters = JSON.parse(localStorage.getItem('favoriteMonsters') || '[]');
    }
    return user;
  }
  
  function removeToken() {
    localStorage.removeItem('token');
    setFavoriteMonsters([])
  }

  function setFavoriteMonsters(favoriteMonsters){
    localStorage.setItem('favoriteMonsters', JSON.stringify(favoriteMonsters))
  }
  
  export default {
    setToken,
    getToken,
    removeToken,
    getUserFromToken,
    setFavoriteMonsters
  };