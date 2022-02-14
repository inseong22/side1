import React, { useState, useEffect } from 'react';
import { dbService } from '../../tools/fbase';
import LoadingDisplay from '../../tools/LoadingDisplay'
import ReactGa from 'react-ga'
import UserNavBar from '../../components/UserLandingPage/UserNavBar'
import UserContents from '../../components/UserLandingPage/UserContents'
import UserFoot from '../../components/UserLandingPage/UserFoot'
import UserSection from '../../components/UserLandingPage/Sections/UserSection'

export const UserContext = React.createContext({
    state : {},
    action : {}
});

const UserLandingPage = (props) => {
    const [ item, setItem ] = useState();
    const [ setting, setSetting ] = useState();
    const [ loading, setLoading ] = useState(false);

    const contextValue = {
        state: {setting},
        action : {setSetting},
    }

    const favicon = document.getElementById("favicon");

    const urltitle = document.getElementById("urltitle");

    useEffect(() => {
        console.log(window.location.host.split(".")[0])
        loadData()
        ReactGa.initialize('UA-213792742-1');
        // to report page view
        ReactGa.pageview(`/${window.location.host.split(".")[0]}`);
    }, [loading])

    const loadData = async () => {
        const userOrder = await dbService
            .collection("published-page")
            .where("urlId", "==", window.location.host.split(".")[0])
            .get(); // uid를 creatorId로 줬었으니까.

        let orderData = userOrder.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        console.log(orderData)
        console.log(window.location.host.split(".")[0])

        favicon.href = orderData[0].setting.faviconAttachment;   
        urltitle.innerText = orderData[0].setting.title;
        setItem( orderData[0] );
        setSetting( orderData[0].setting );
        setLoading(true);
    }

    const CustomCta = ({value, onClick, style, children}) => {
        return(
            <div style={{
                ...style,
                display: 'flex', justifyContent:'center', alignItems: 'center',
                padding:'10px 10.5px',
                borderRadius:`${item.setting.cta.borderRadius}px`,
                backgroundColor:`${item.setting.cta.backgroundColor}`,
                color:`${item.setting.cta.color}`,
                boxShadow:`${item.setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                border:`${item.setting.cta.border ? `1px solid ${item.setting.cta.borderColor}` : 'none'}`
            }} onClick={() => onClick}>
                <input className="text-input-flex ti" disabled value={ children } style={{fontFamily:`${item.setting.smallFont}`}}/>
            </div>
        )
    }

    const CustomGhost = (props) => {
        return(
            <div style={{
                ...props.style,
                display: 'flex', justifyContent:'center', alignItems: 'center',
                padding:'10px 10.5px',
                borderRadius:`${item.setting.ghost.borderRadius}px`,
                backgroundColor:`${item.setting.ghost.backgroundColor}`,
                color:`${item.setting.ghost.color}`,
                boxShadow:`${item.setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                border:`${item.setting.ghost.border ? `1px solid ${item.setting.ghost.borderColor}` : 'none'}`
            }} onClick={() => props.onClick}>
                <input className="text-input-flex ti" disabled value={ props.children } style={{fontFamily:`${item.setting.smallFont}`}}/>
            </div>
        )
    }

    return (
        <UserContext.Provider value={contextValue}>
        {loading ? 
        <div style={{fontSize:'30px'}}>
            <UserNavBar navi={item.navi} setting={item.setting} CustomCta={CustomCta} CustomGhost={CustomGhost} />
            <div style={{paddingTop:`${item.navi.fixed ? `${item.navi.height}px` : '0px'}`}}>
                <UserContents contents={item.contents} setting={item.setting} CustomCta={CustomCta} CustomGhost={CustomGhost}/>
            </div>
            <UserFoot foot={item.foot} setting={item.setting}/>
        </div> 
            : 
        <>
            <LoadingDisplay />
        </>}
        </UserContext.Provider>
    )
    
}

export default UserLandingPage
