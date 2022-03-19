import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import LoginPage from './pages/Login/Login/LoginPage'
import UserLandingPage from './pages/UserLanding/UserLandingPage';
import MainPageV2 from './pages/Landing/MainPageV2';
import MakePageV2 from './pages/Make/MakePageV2';
import AdminPage from './pages/AdminPage/AdminPage';
import ResponsePage from './pages/Response/ResponsePage';
import SubmitPage from './components/Make/unused/SubmitPage';
import WhatIsSurfee from './pages/Customer/WhatIsSurfee'
import VotePage from './pages/VotePage/VotePage'
import FirstQuestions from './pages/Questions/FirstQuestions'
import ExamplePage from './pages/ExamplePage/ExamplePage'
import ScrollToTop from './tools/ScrollToTop'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export const UserContext = React.createContext({
    state : {},
    action : {}
});

const AppRouter = ({userObj, isLoggedIn}) => {
    const contextValue = {
        state: {userObj, isLoggedIn},
        action : {},
    }

    // if (window.location.host.split(".")[0] !== "surfee" && window.location.host.split(".")[0] !== 'localhost:3000') {
    //     return(
    //         <Router history={history}>
    //             <>
    //             <div className="Container" style={{ minHeight: 'calc(100vh - 80px)', zIndex:-1 }}>
    //                 <Switch>
    //                     <Route path="/" component={UserLandingPage} />
    //                 </Switch>
    //             </div>
    //             </> 
    //         </Router>
    //     )
    // }else{
        return(
            <Router history={history}>
                <UserContext.Provider value={contextValue}>
                    <ScrollToTop>
                    <div className="Container" style={{ minHeight: 'calc(100vh - 80px)', zIndex:-1 }}>
                        <Switch>
                            <Route exact path="/surfeeadminpage">
                                <AdminPage history={history}/>
                            </Route>
                            <Route exact path="/" onUpdate={() => window.scrollTo(0, 0)}>
                                <MainPageV2 history={history} isLoggedIn={isLoggedIn} userObj={userObj}/>
                            </Route>
                            <Route path="/response" onUpdate={() => window.scrollTo(0, 0)}>
                                <ResponsePage history={history} userObj={userObj}/> 
                            </Route>
                            <Route path="/submit">
                                <SubmitPage history={history}/>
                            </Route>
                            <Route 
                                path="/make" 
                                onUpdate={() => window.scrollTo(0, 0)}>
                                <MakePageV2 history={history} isLoggedIn={isLoggedIn} userObj={userObj}/>
                            </Route>
                            {/* <Route 
                                path="/make/:code" 
                                onUpdate={() => window.scrollTo(0, 0)}
                                render={(history, isLoggedIn, userObj) => <MakePageV2 history={history} isLoggedIn={isLoggedIn} userObj={userObj} />} /> */}
                            <Route path="/questions" onUpdate={() => window.scrollTo(0, 0)}>
                                <FirstQuestions history={history} isLoggedIn={isLoggedIn}/>
                            </Route>
                            <Route path="/surfeeexamples" onUpdate={() => window.scrollTo(0, 0)}>
                                <ExamplePage history={history} isLoggedIn={isLoggedIn}/>
                            </Route>
                            <Route path="/surfeeintro" onUpdate={() => window.scrollTo(0, 0)}>
                                <WhatIsSurfee history={history} isLoggedIn={isLoggedIn}/>
                            </Route>
                            <Route path="/vote" onUpdate={() => window.scrollTo(0, 0)}>
                                <VotePage history={history} isLoggedIn={isLoggedIn}/>
                            </Route>
                            <Route
                                path="/:id"
                                render={(props) => <UserLandingPage {...props} />}/>
                        </Switch>
                    </div>
                    </ScrollToTop> 
                </UserContext.Provider>
            </Router>
        )
    // }
}
export default AppRouter;