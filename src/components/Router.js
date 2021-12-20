import React, {useState} from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import MainPage from '../components/MainPage/MainPage';
import MainPageV2 from '../components/MainPage/MainPageV2';
import MakePage from '../components/MakePage/MakePage';
import MakePageV2 from '../components/MakePage/MakePageV2';
import ResponsePage from '../components/ResponsePage/ResponsePage';
import SubmitPage from './MakePage/utils/SubmitPage';
import CouponPage from './CouponPage/CouponPage';
import NavBar from '../components/NavBar/NavBar';
import NavBarV2 from '../components/NavBar/NavBarV2';
import InfoPage from '../components/CustomerPage/InfoPage';
import QuestionsPage from '../components/CustomerPage/QuestionsPage';
import L2 from '../components/LandingPages/L2/L2';
import MadePage from '../components/LandingPages/Made/MadePage';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const AppRouter = () => {
    console.log(window.location.host.split("."));
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
                <div className="Container" style={{ minHeight: 'calc(100vh - 80px)', zIndex:-1 }}>
                <Switch>
                    <Route exact path="/">
                        <MainPage history={history}/>
                    </Route>
                    <Route exact path="/v2">
                        <MainPageV2 history={history}/>
                    </Route>
                    <Route path="/make">
                        <MakePage history={history}/>
                    </Route>            
                    <Route path="/seeResponse">
                        <ResponsePage/> 
                    </Route>
                    <Route path="/submit">
                        <SubmitPage history={history}/>
                    </Route>
                    <Route path="/coupon">
                        <CouponPage history={history}/>
                    </Route>
                    <Route path="/info">
                        <InfoPage history={history} />
                    </Route>
                    <Route path="/questions">
                        <QuestionsPage history={history} />
                    </Route>
                    <Route path="/makev2">
                        <MakePageV2 history={history}/>
                    </Route>
                </Switch>
                </div>
                </> 
            </Router>
        )
    }
}
export default AppRouter;