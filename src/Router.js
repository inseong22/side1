import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import LoginPage from './pages/Login/Login/LoginPage'
import MainPage from './pages/Landing/old/MainPage';
import UserLandingPage from './pages/UserLanding/UserLandingPage';
import MainPageV2 from './pages/Landing/MainPageV2';
import MakePageV2 from './pages/Make/MakePageV2';
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
                    <Route exact path="/v2" onUpdate={() => window.scrollTo(0, 0)}>
                        <MainPageV2 history={history} isLoggedIn={isLoggedIn} userObj={userObj}/>
                    </Route>
                    <Route path="/response" onUpdate={() => window.scrollTo(0, 0)}>
                        <ResponsePage history={history} userObj={userObj}/> 
                    </Route>
                    <Route path="/submit">
                        <SubmitPage history={history}/>
                    </Route>
                    <Route path="/make" onUpdate={() => window.scrollTo(0, 0)}>
                        <MakePageV2 history={history} isLoggedIn={isLoggedIn} userObj={userObj}/>
                    </Route>
                    <Route path="/login">
                        <LoginPage history={history} isLoggedIn={isLoggedIn}/>
                    </Route>
                    <Route path="/customer" onUpdate={() => window.scrollTo(0, 0)}>
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