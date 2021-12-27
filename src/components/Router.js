import React, {useState} from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import InfoPage from '../components/CustomerPage/InfoPage';
import LoginPage from '../components/LoginPage/LoginPage'
import L2 from '../components/LandingPages/L2/L2';
import MainPage from '../components/MainPage/MainPage';
import MadePage from '../components/LandingPages/Made/MadePage';
import MainPageV2 from '../components/MainPage/MainPageV2';
import MakePage from '../components/MakePage/MakePage';
import MakePageV2 from '../components/MakePage/MakePageV2';
import NavBar from '../components/NavBar/NavBar';
import NavBarV2 from '../components/NavBar/NavBarV2';
import QuestionsPage from '../components/CustomerPage/QuestionsPage';
import ResponsePage from '../components/ResponsePage/ResponsePage';
import RegisterPage from '../components/LoginPage/RegisterPage'
import SubmitPage from './MakePage/utils/SubmitPage';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const AppRouter = ({userObj, isLoggedIn}) => {
    if (window.location.host.split(".")[0] != "surfee" && window.location.host.split(".")[0] != 'localhost:3000') {
        return(
            <Router history={history}>
                <>
                <div className="Container" style={{ minHeight: 'calc(100vh - 80px)', zIndex:-1 }}>
                    <Switch>
                        <Route path="/" component={MadePage} />
                    </Switch>
                </div>
                </> 
            </Router>
        )
    }else{
        return(
            <Router history={history}>
                <>
                <NavBarV2 history={history} isLoggedIn={isLoggedIn} />
                <div className="Container" style={{ minHeight: 'calc(100vh - 80px)', zIndex:-1 }}>
                <Switch>
                    <Route exact path="/">
                        <MainPage history={history}/>
                    </Route>
                    <Route exact path="/v2">
                        <MainPageV2 history={history} isLoggedIn={isLoggedIn} userObj={userObj}/>
                    </Route>
                    <Route path="/make">
                        <MakePage history={history}/>
                    </Route>            
                    <Route path="/seeResponse">
                        <ResponsePage userObj={userObj}/> 
                    </Route>
                    <Route path="/submit">
                        <SubmitPage history={history}/>
                    </Route>
                    <Route path="/info">
                        <InfoPage history={history} />
                    </Route>
                    <Route path="/questions">
                        <QuestionsPage history={history} />
                    </Route>
                    <Route path="/makev2">
                        <MakePageV2 history={history} isLoggedIn={isLoggedIn} userObj={userObj}/>
                    </Route>
                    <Route path="/login">
                        <LoginPage history={history}/>
                    </Route>
                    <Route path="/register">
                        <RegisterPage history={history}/>
                    </Route>
                </Switch>
                </div>
                </> 
            </Router>
        )
    }
}
export default AppRouter;