import React, {useState, useEffect} from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import LoginPage from './pages/Login/Login/LoginPage'
import MainPage from './pages/Landing/old/MainPage';
import UserLandingPage from './pages/UserLanding/UserLandingPage';
import MainPageV2 from './pages/Landing/MainPageV2';
import MakePage from './pages/Make/old/MakePage';
import MakePageV2 from './pages/Make/MakePageV2';
import NavBarV2 from './pages/NavAndFooter/NavBarV2';
import ResponsePage from './pages/Response/ResponsePage';
import RegisterPage from './pages/Login/Register/RegisterPage'
import SubmitPage from './components/Make/unused/SubmitPage';
import CustomerPage from './pages/Customer/CustomerPage'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const AppRouter = ({userObj, isLoggedIn}) => {

    if (window.location.host.split(".")[0] !== "surfee" && window.location.host.split(".")[0] !== 'localhost:3000') {
        return(
            <Router history={history}>
                <>
                <div className="Container" style={{ minHeight: 'calc(100vh - 80px)', zIndex:-1 }}>
                    <Switch>
                        <Route path="/" component={UserLandingPage} />
                    </Switch>
                </div>
                </> 
            </Router>
        )
    }else{
        return(
            <Router history={history}>
                <>
                <div className="Container" style={{ minHeight: 'calc(100vh - 80px)', zIndex:-1 }}>
                <Switch>
                    <Route exact path="/">
                        <MainPage history={history}/>
                    </Route>
                    <Route exact path="/v2">
                        <MainPageV2 history={history} isLoggedIn={isLoggedIn} userObj={userObj}/>
                    </Route>
                    {/* <Route path="/make">
                        <MakePage history={history}/>
                    </Route>             */}
                    <Route path="/response">
                        <ResponsePage history={history} userObj={userObj}/> 
                    </Route>
                    <Route path="/submit">
                        <SubmitPage history={history}/>
                    </Route>
                    <Route path="/make">
                        <MakePageV2 history={history} isLoggedIn={isLoggedIn} userObj={userObj}/>
                    </Route>
                    <Route path="/login">
                        <LoginPage history={history} isLoggedIn={isLoggedIn}/>
                    </Route>
                    <Route path="/customer">
                        <CustomerPage history={history} isLoggedIn={isLoggedIn}/>
                    </Route>
                    <Route path="/register">
                        <RegisterPage history={history} isLoggedIn={isLoggedIn}/>
                    </Route>
                </Switch>
                </div>
                </> 
            </Router>
        )
    }
}
export default AppRouter;