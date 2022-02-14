import React, {useState, useEffect} from 'react'
import QnA from '../../components/Customer/QnA'
import Term from '../../components/Customer/Term'
import PersonalInformation from '../../components/Customer/PersonalInformation'
import Footer from '../NavAndFooter/Footer'
import ReactGa from 'react-ga'

import './CustomerPage.css'

function CustomerPage() {
    const [cnum, setCnum] = useState(1);
    const [cnums, setCnums] = useState([1,2,3]);
    
    useEffect(()=>{

        // ReactGa.initialize('UA-213792742-1');
        // ReactGa.pageview('/customerPage');
    });

    const tabsTable = cnums.map((item, index) => {
        let fw = '500';
        let bb = '0px';
        let fb = 'gray';
        if(cnum == item){
            fw = '700'; 
            bb = '2px solid black';
            fb = 'black';
        }

        switch(item){
            case 1:
                return(
                   <span className="tab-one" index={index} style={{color:`${fb}`, fontWeight:`${fw}`, borderBottom:`${bb}`}} onClick={e => setCnum(item)}>자주묻는질문(FAQ)</span>
                )
            case 2:
                return(
                    <span className="tab-one" index={index} style={{color:`${fb}`, fontWeight:`${fw}`, borderBottom:`${bb}`}} onClick={e => setCnum(item)}>이용약관</span>
                )

            case 3:
                return(
                    <span className="tab-one" index={index} style={{color:`${fb}`, fontWeight:`${fw}`, borderBottom:`${bb}`}} onClick={e => setCnum(item)}>개인정보처리방침</span>
                )

        }
    })

    const contentTable = () => {
        switch(cnum){
            case 1:
                return(
                    <QnA />
                )
            case 2:
                return(
                    <Term />
                )
            case 3:
                return(
                    <PersonalInformation />
                )
        }
    }

    return (
        <>
        <div className="questionspage-container">
            <div className="q-inner">
                <div className="q-info-top">
                    <div className="q-title-top" style={{fontWeight: 'bold'}}>
                        Surfee에 관심을 가져주셔서 감사합니다.
                    </div>
                    <div className="q-title-top" style={{marginTop:'3%'}}>
                        안녕하세요!<br/>
                        무엇을 도와드릴까요?
                    </div>
                    <div>
                        <span className="q-button">
                            직접 문의하기
                        </span>
                    </div>
                </div>
                <div className="quetions-content-bottom">
                    <div className="q-tabs">
                        {tabsTable}
                    </div>
                    <div className="q-content">
                        <div className="q-one-content">
                            {contentTable()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default CustomerPage
