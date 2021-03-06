import React, {useState, useEffect} from 'react';
import './App.css';
import AppRouter from './Router';
import { authService } from './tools/fbase'
import {RecoilRoot} from 'recoil';
import LoadingDisplay from './tools/LoadingDisplay'

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // 유저가 제작한 랜딩페이지에 들어가는 사람들까지 로그인 검사를 하면 속도가 느려지니까
    if(window.location.host.split(".")[0] === "surfee" || window.location.host.split(".")[0] === "localhost:3000"){
      authService.onAuthStateChanged((user) => {
        if(user){
          setIsLoggedIn(true)
          setUserObj(user.multiFactor.user);
        }else{
          setIsLoggedIn(false)
        }
        setInit(true)
      })
    }else{
      setInit(true)
    }
  })

  return (
    <>
    <RecoilRoot className="App">
      {init ? <AppRouter userObj={userObj} isLoggedIn={isLoggedIn} /> : <LoadingDisplay />}
    </RecoilRoot>
    </>
  );
}

export default App;