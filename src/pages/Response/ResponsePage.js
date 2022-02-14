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
import ResponseNavBar from '../../components/Response/ResponseNavBar'
import ChromeTapBar from '../../components/Response/ChromeTapBar'
import LoadingDisplay from '../../tools/LoadingDisplay'
import {Link } from 'react-router-dom'

const NOTCLICKED = 10000

function ResponsePage({userObj, history}) {
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [responses, setResponses] = useState([[]]);
    const [mylandings, setMylandings] = useState([]);
    const [published, setPublished] = useState([]);
    const [part, setPart] = useState(1);
    const [myDatas, setMyDatas] = useState({
        all_sessions:0,
        all_pageViews:0
    });
    const [nowChecking, setNowChecking] = useState(NOTCLICKED);
    
    useEffect(() => {
        // to report page view
        // ReactGa.initialize('UA-213792742-1');
        // ReactGa.pageview(`/response/${userObj.email}`);
        getThisUserDatas();
    },[loading, update])

    const getThisUserDatas = async () => {
        // setLoading(false);
        const thisuserDatas = await dbService
            .collection('saved-page')
            .where("makerEmail", "==", userObj.email)
            .get();
        
        let thisuserData = thisuserDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        setMylandings(thisuserData);

        getThisPublished();
        let tempApplyDatas = []
        
        thisuserData.map(item => {
            let tempd = []
            getDatas(item.setting.urlId).then(i => {
                tempd = i;
                tempApplyDatas.push(tempd);
            })
        })
        setResponses(tempApplyDatas);

        setLoading(true);
    }

    const getThisPublished = async () => {
        const publishedDatas = await dbService
            .collection('published-page')
            .where("makerEmail", "==", userObj.email)
            .get();
        let publishedData = publishedDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        setPublished(publishedData);
    }

    const getDatas = async (urlId) => {
        const reDatas = await dbService
            .collection("datas") // apply-datas는 유저가 만든 랜딩페이지에 들어와서 목표 액션을 한 데이터.
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

    const doPublish = async () => {
        // 이미 있는거면 수정
        const published__search = await dbService.collection('published-page').where('urlId', "==", mylandings[nowChecking].urlId)
        .get().then( querySnapshot => 
            { 
                if(querySnapshot.empty){
                    console.log("새 배포")
                    let body = {
                        ...mylandings[nowChecking],
                        created:Date.now(),
                    }
                    dbService.collection('published-page').add(body)
                }else{
                    console.log("배포 수정")
                    let body = {
                        ...mylandings[nowChecking],
                        created:Date.now(),
                    }
                    querySnapshot.forEach(function(doc) {
                        dbService.doc(`published-page/${doc.id}`).update(body)
                    });
                }
            }
        )
        alert("배포 완료되었습니다.")
        setUpdate(!update)
    }

    const checkPublished = (urlId) => {
        let found = false
        published.map((item,index) => {
            if(item.urlId === urlId){
                found = item
            }
        })
        if(found){
            return found
        }else{
            return false
        }
    }

    const returnMylandingsTable = mylandings.map((item, index) => {
        return(
            <MadeLandingCard history={history} item={item} key={item.id} index={index} published={checkPublished(item.urlId)} setNowChecking={setNowChecking} num={mylandings.length} setUpdate={setUpdate} update={update}/>
        )
    })


        if(loading === true){
            return (
                <div className="response__container">
                <ResponseNavBar />
                <div className="get-all-container">
                    <div className="get-up-container">
                        <div className="get-up-title">
                            {userObj.displayName} 님의 랜딩페이지를 관리해보세요 :)
                            {
                                mylandings.length > 2 &&
                               <span className="response-subtext">현재 버전에서 랜딩페이지는 최대 3개까지 만들 수 있습니다. 새로운 페이지를 만들고 싶다면 기존의 페이지를 삭제해주세요.</span>
                        }
                        </div>
                        <div className="get__mylandings-cantainer">
                            {returnMylandingsTable}
                            {
                                mylandings.length < 3 &&
                                <MadeLandingCard addNew />
                            }
                        </div>
                        {/* <div className="get-buttons-container">
                            <button className="get-part-button" style={{backgroundColor:`${part === 1 ? "#6a63f76e" : "white"}`}} onClick={e => setPart(1)}>응답</button>
                            <button className="get-part-button" style={{backgroundColor:`${part === 2 ? "#6a63f76e" : "white"}`}} onClick={e => setPart(2)}>데이터</button>
                        </div> */}
                    </div>
                    {
                    nowChecking !== NOTCLICKED ? 
                    <div className="response-down__container">
                        <ChromeTapBar content={mylandings[nowChecking]}/>
                        { part === 1 ? 
                        // 응답 파트
                        <div className="response-display__container">
                            <div className="response-table">
                                <div className="response-table-top">
                                    <span className="response-table-title"> 
                                        <div className="left">
                                            {
                                                checkPublished(mylandings[nowChecking].urlId) ? 
                                                <div>
                                                    유입 수 : N 명
                                                    버튼 클릭 수 : N 명
                                                    전환율 : N 명
                                                </div>
                                                :
                                                <div>
                                                    이 랜딩페이지는 아직 배포되지 않았습니다. 오른쪽의 ‘배포하기' 버튼을 눌러 페이지를 배포하고, 전환율 및 신청을 확인하세요
                                                </div>
                                            }
                                        </div>
                                        <div className="right" style={{flexDirection: 'row'}}>
                                            <Link to={{
                                                pathname:`/make`,
                                                state:{
                                                    item:mylandings[nowChecking],
                                                }}} 
                                                className="default-button-01" style={{marginLeft:'15px'}}>편집하기</Link>
                                            <div className="default-button-02" style={{marginLeft:'15px'}} onClick={() => doPublish()}>배포하기</div>
                                        </div>
                                    </span>
                                </div>
                                <div>
                                    {
                                        nowChecking !== NOTCLICKED && 
                                        <>
                                            {
                                            responses[nowChecking].map((item, index) => {
                                            if(item.type === 'click'){
                                                return(
                                                    <>
                                                        {item.created}
                                                        {item.from}
                                                    </>
                                                )
                                            }else{
                                                return(
                                                    <>
                                                        {item.created}
                                                        {item.values[0]}
                                                    </>
                                                )
                                            }
                                        })}
                                        </>
                                    }
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
                    :
                    <div style={{marginTop:'15px'}}>
                        {
                            mylandings.length === 0 ?
                            <div>
                                1분만에 새로운 랜딩페이지를 만들고 유저의 반응을 테스트 해보세요!
                            </div>
                            :
                            <div>
                                확인할 페이지를 클릭하세요
                            </div>
                        }
                    </div>
                    }
                </div>
                <div style={{fontSize:'15px', width:'100%', marginTop:'40vh'}}>
                    <Footer />
                </div>
                </div>
            )
        }else{
            return(
                <LoadingDisplay />
            )
        }
}

export default ResponsePage
