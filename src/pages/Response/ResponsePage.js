import React, {useState, useEffect} from 'react';
import './ResponsePage.css';
import {dbService} from '../../tools/fbase';
import {authService} from '../../tools/fbase';
import ReactGa from 'react-ga'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import Footer from '../NavAndFooter/Footer'
import { Table, Tag, Space } from 'antd';
import MadeLandingCard from '../../components/Response/MadeLandingCard'
import gadata from '../../components/Response/data/gadata.json';

function ResponsePage({userObj, history}) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState([[]]);
    const [mylandings, setMylandings] = useState([]);
    const [part, setPart] = useState(1);
    const [myDatas, setMyDatas] = useState({
        all_sessions:0,
        all_pageViews:0
    });
    const [nowChecking, setNowChecking] = useState(10000);
    
    useEffect(() => {
        // to report page view
        // ReactGa.initialize('UA-213792742-1');
        // ReactGa.pageview(`/seeResponse/${userObj.email}`);
        // getThisUserDatas();
    },[loading])

    const getThisUserDatas = async () => {
        const thisuserDatas = await dbService
            .collection('saved-page')
            .where("makerEmail", "==", userObj.email)
            .get();
        
        let thisuserData = thisuserDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        setMylandings(thisuserData);
        
        let tempDatas = []
        
        thisuserData.map(item => {
            let tempd = []
            getDatas(item.setting.urlId).then(i => {
                tempd = i;
                tempDatas.push(tempd);
            })
        })
        setResponses(tempDatas);

        setLoading(true);
    }

    const getDatas = async (urlId) => {
        const reDatas = await dbService
            .collection("apply-datas") // apply-datas는 유저가 만든 랜딩페이지에 들어와서 목표 액션을 한 데이터.
            .orderBy("created", "desc")
            .where("urlId", "==", urlId)
            .get();

        let reData = reDatas.docs.map(doc => {
            let day = new Date(doc.data().created)
            return({...doc.data(), id:doc.id, date:day})
        });

        return reData;
    }

    // const getMyData = (path) => {
    //     let all_data = gadata.reports[0].data.rows;
        
    //     const myData = all_data.filter(item => item.dimensions[2] === `${path}`);
    //     let all_sessions = 0;
    //     let all_pageViews = 0;
    //     myData.map((item, index) => {
    //         console.log("여기서", item.dimensions);
    //         console.log("세션 수 : ", item.metrics[0].values[0]);
    //         console.log("페이지 뷰 수 : ", item.metrics[0].values[1]);
    //         console.log("세션 머무르는 : ", item.metrics[0].values[2]);
    //         all_sessions += parseInt(item.metrics[0].values[0]);
    //         all_pageViews += parseInt(item.metrics[0].values[1]);
    //     })
    //     console.log("총 세션 수 : ", all_sessions );
    //     console.log("총 페이지 뷰 수 : ", all_pageViews );
    //     const body = {
    //         all_sessions,
    //         all_pageViews,
    //     }
    //     setMyDatas(body);
    // }

    const returnMylandingsTable = mylandings.map((item, index) => {
        return(
            <></>
            // <MadeLandingCard history={history} item={item} key={item.id} index={index} setNowChecking={setNowChecking} />
        )
    })
        if(loading === true){
            return (
                <div style={{backgroundColor:'white', display:'flex', justifyContent:'center',alignItems:'center', width:'100%', flexDirection:'column'}}>
                <div className="get-all-container">
                    <div className="get-up-container">
                        <div className="get-up-title">
                            김호진 님의 대시보드
                        </div>
                        <div className="get__mylandings-cantainer">
                            {returnMylandingsTable}
                        </div>
                        <div className="get-buttons-container">
                            <button className="get-part-button" style={{backgroundColor:`${part === 1 ? "#6a63f76e" : "white"}`}} onClick={e => setPart(1)}>응답</button>
                            <button className="get-part-button" style={{backgroundColor:`${part === 2 ? "#6a63f76e" : "white"}`}} onClick={e => setPart(2)}>데이터</button>
                        </div>
                    </div>
                    <div className="get-down-container">
                        { part === 1 ? 
                        // 응답 파트
                        <div className="response-container">
                            <div className="response-table">
                                <div className="response-table-top">
                                    <span className="response-table-title"> 
                                        {nowChecking === 10000 ? 
                                        "응답을 볼 페이지를 클릭하세요." : 
                                        <div>총 목표액션 전환 수 : {responses[nowChecking].length} 명</div> } 
                                    </span>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                        {/* 데이터 파트 */}
                        {/* <div style={{height:'100vh'}}>
                            <div>
                                <span className="data-one-mini-card">총 페이지 뷰 수 {myDatas.all_pageViews}</span>
                                <span className="data-one-mini-card">총 세션 수 {myDatas.all_sessions}</span>
                            </div>
                        </div> */}
                        </>
                        }
                    </div>
                </div>
                <Footer />
                </div>
            )
        }else{
            return(
                <>
                <div>
                    유저 정보를 불러오는 중입니다..
                </div>
                </>
            )
        }
}

export default ResponsePage
