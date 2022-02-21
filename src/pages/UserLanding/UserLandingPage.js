import React, { useState, useEffect } from 'react';
import { dbService } from '../../tools/fbase';
import LoadingDisplay from '../../tools/LoadingDisplay'
import ReactGa from 'react-ga'
import UserNavBar from '../../components/UserLandingPage/UserNavBar'
import UserContents from '../../components/UserLandingPage/UserContents'
import UserFoot from '../../components/UserLandingPage/UserFoot'
import ErrorPage from './NavAndFooter/ErrorPage'
import { isMobile } from 'react-device-detect'
import UserSection from '../../components/UserLandingPage/UserSection'

export const UserContext = React.createContext({
    state : {},
    action : {}
});

const UserLandingPage = (props) => {
    const [ item, setItem ] = useState();
    const [ setting, setSetting ] = useState();
    const [ error, setError ] = useState(false);
    const [ pageId, setPageId ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const contextValue = {
        state: {setting, pageId},
        action : {setSetting, setPageId},
    }

    const favicon = document.getElementById("favicon");

    const urltitle = document.getElementById("urltitle");
    const channeltalk = document.getElementsByTagName("script");

    useEffect(() => {
        loadData()
        console.log("채널톡", channeltalk);
        ReactGa.initialize('UA-213792742-1');
        // to report page view
        if(item !== undefined && item !== null){
            setPageId(item.pageId)
            ReactGa.pageview(`/${item.pageId}`) // published에 저장된 pageId는 saved-page의 id
        }
    }, [loading])

    const loadData = async () => {
        let userOrder = []
        if(props.match.params.id !== ''){
            userOrder = await dbService
                .collection("published-page")
                .where("urlId", "==", props.match.params.id)
                .get(); // uid를 creatorId로 줬었으니까.
        }else{
            userOrder = await dbService
                .collection("published-page")
                .where("urlId", "==", window.location.host.split(".")[0])
                .get(); // uid를 creatorId로 줬었으니까.
        }

        let orderData = userOrder.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(orderData.length === 0){
            setLoading(true);
            setError(true);
        }

        favicon.href = orderData[0].setting.faviconAttachment;   
        urltitle.innerText = orderData[0].setting.title;
        setItem( orderData[0] );
        setSetting( orderData[0].setting );
        setLoading(true);
    }

    return (
        <UserContext.Provider value={contextValue}>
        {!loading ? 
        <LoadingDisplay />
        :
        error ? 
        <ErrorPage />
        :
        <div style={{fontSize:`${isMobile ? '22px' : '28px'}`}}>
            <UserNavBar navi={item.navi} setting={item.setting} />
            <div style={{paddingTop:`${item.navi.fixed ? `${item.navi.height}px` : '0px'}`}}>
                <UserContents contents={item.contents} setting={item.setting} />
            </div>
            <UserFoot foot={item.foot} setting={item.setting}/>
        </div> 
        }
        </UserContext.Provider>
    )
    
}

export default UserLandingPage
