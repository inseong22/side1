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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ChannelTalk from '../../tools/ChannelTalk'

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


    ChannelTalk.shutdown();

    useEffect(() => {
        loadData()
        ReactGa.initialize('UA-213792742-1');
        // to report page view
        if(item !== undefined && item !== null){
            setPageId(item.pageId)
            ReactGa.pageview(`/${item.pageId}`) // published에 저장된 pageId는 saved-page의 id
        }
    }, [loading])

    const loadData = async () => {
        let userOrder = []
        userOrder = await dbService
            .collection("published-page")
            .where("urlId", "==", props.match.params.id)
            .get(); // uid를 creatorId로 줬었으니까.
        
        let orderData = userOrder.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        
        if(orderData.length === 0){
            props.history.push('/');
            props.history.go();
        }

        favicon.href = orderData[0].setting.faviconAttachment;   
        urltitle.innerText = orderData[0].setting.title;
        setItem( orderData[0] );
        setSetting( orderData[0].setting );
        setLoading(true);
    }

    const moveToPage = async (button) => {
        // 파이어베이스에 기록
        await dbService.collection('datas').add({
            pageId:pageId,
            type:'click',
            from:'플로팅 버튼',
            button:button,
            created:Date.now(),
        })
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
            <div style={{paddingTop:`${item.navi.fixed ? '0px': `${item.navi.height}px`}`}}>
                <UserContents contents={item.contents} setting={item.setting} />
            </div>
            <UserFoot foot={item.foot} setting={item.setting}/>

            <>
            {  ( setting.fta.use ) &&
            <div className="fta__container" style={{width:'100vw'}}>
                <div className="fta-button" 
                    style={{
                        backgroundColor:`${setting.fta.backgroundColor}`, 
                        width:`${ setting.fta.size }%`, 
                        borderRadius:`${setting.fta.shape}px`, 
                        border:`${setting.fta.border ? `1px solid ${setting.fta.borderColor}` : 'none'}`,
                        boxShadow:`${setting.fta.shadow ? '2px 2px 5px rgba(0,0,0,0.3)' : ''}`
                    }}
                    onClick={() => {
                        moveToPage('플로팅 버튼')
                        window.open(
                            setting.fta.link,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}>
                    <TextareaAutosize 
                        className='text-no-input'  
                        placeholder="플로팅 버튼입니다!"
                        value={setting.fta.text} 
                        disabled
                        style={{
                            fontFamily: `${setting.font}`,
                            resize: 'none',
                            color:`${setting.fta.color}`,
                            textAlign:'center',
                            border:'none',
                            cursor:'pointer',
                            WebkitTextFillColor: `${setting.fta.color}`,
                        }} />
                </div>
            </div> }
            </>
        </div> 
        }
        </UserContext.Provider>
    )
    
}

export default UserLandingPage
