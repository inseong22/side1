import React, {useState, useEffect} from 'react';
import './utils/ResponsePage.css';
import {dbService} from '../tools/fbase';
import ReactGa from 'react-ga'
import AskPassword from './utils/AskPassword'
import NavBarV2 from '../NavBar/NavBarV2'
import Footer from '../NavBar/Footer'
import { Table, Tag, Space } from 'antd';
import gadata from './data/gadata';

const columns = [
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      render: text => <a>{text}</a>,
    },
    {
      title: '신청한 날짜',
      dataIndex: 'date',
      key: 'date',
      render: date => <span>2021년 {date.getMonth()+1}월 {date.getDate()}일 {date.getHours()}시에 신청 </span>
    },
  ];
  
function ResponsePage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [get, setGet] = useState(false);
    const [reponses, setReponses] = useState([{
        email:"",
        created:0,
        date:"now"
    }]);
    const [part, setPart] = useState(1);
    const [myDatas, setMyDatas] = useState({
        all_sessions:0,
        all_pageViews:0
    });
    
    useEffect(() => {
        ReactGa.initialize('UA-213792742-1');
        // to report page view
        ReactGa.pageview('/seeResponse');
        getDatas();
    },[loading])

    const getDatas = async () => {
        const reDatas = await dbService
        .collection("apply-datas")
        .orderBy("created", "desc")
        .get(); // uid를 creatorId로 줬었으니까.

        let reData = reDatas.docs.map(doc => {
            let day = new Date(doc.data().created)
            return({...doc.data(), id:doc.id, date:day})
        });
        setReponses(reData);

        // let p = [];
        // for(var i = 0; i<Math.ceil(reData.length/10); i++){
        //     p.push(i+1);
        // }
        // setPages(p);

        setLoading(true);
    }

    const getMyData = (path) => {
        let all_data = gadata.reports[0].data.rows;
        
        const myData = all_data.filter(item => item.dimensions[2] === `${path}`);
        let all_sessions = 0;
        let all_pageViews = 0;
        myData.map((item, index) => {
            console.log("여기서", item.dimensions);
            console.log("세션 수 : ", item.metrics[0].values[0]);
            console.log("페이지 뷰 수 : ", item.metrics[0].values[1]);
            console.log("세션 머무르는 : ", item.metrics[0].values[2]);
            all_sessions += parseInt(item.metrics[0].values[0]);
            all_pageViews += parseInt(item.metrics[0].values[1]);
        })
        console.log("총 세션 수 : ", all_sessions );
        console.log("총 페이지 뷰 수 : ", all_pageViews );
        const body = {
            all_sessions,
            all_pageViews,
        }
        setMyDatas(body);
    }

    const getByPassWord = () => {
        if(password === "surfee.ourdata"){
            const path = '/'
            setGet(!get);
            getDatas();
            getMyData(path)
        }else{
            // password로 firebase에서 where 써서 원하는 데이터만 리턴하는 세팅.
            // 비밀번호에 해당하는 랜딩페이지 정보 불러오기
            // 불러온 랜딩페이지 정보에 해당하는 응답들 불러오기
            // 불러온 랜딩페이지 정보의 path( urlId )에 해당하는 GA데이터 찾아서 세팅하기
            alert("존재하지 않는 비밀번호 입니다!");
        }
    }

    if(get === false){
        return(
            <AskPassword password={password} setPassword={setPassword} getByPassWord={getByPassWord}/>
        )
    }else{
        if(loading === true){
            return (
                <div style={{backgroundColor:'white', display:'flex', justifyContent:'center',alignItems:'center', width:'100%', flexDirection:'column'}}>
                <NavBarV2 />
                <div className="get-all-container">
                    <div className="get-up-container">
                        <div className="get-up-title">
                            김호진 님의 대시보드
                        </div>
                        <div className="get-buttons-container">
                            <button className="get-part-button" style={{backgroundColor:`${part === 1 ? "#6a63f76e" : "white"}`}} onClick={e => setPart(1)}>응답</button>
                            <button className="get-part-button" style={{backgroundColor:`${part === 2 ? "#6a63f76e" : "white"}`}} onClick={e => setPart(2)}>데이터</button>
                        </div>
                    </div>
                    <div className="get-down-container">
                        {  part === 1 ? 
                        <div className="response-container">
                            <div className="response-table">
                                <div className="response-table-top">
                                    <span className="response-table-title"> 총 신청자 수 : {reponses.length} 명 </span>
                                </div>
                                <Table columns={columns} dataSource={reponses} className="response-table-datas"/>
                            </div>
                        </div>
                        :
                        <>
                        <div style={{height:'100vh'}}>
                            <button onClick={() => getMyData()}>데이터 불러오기</button>
                            <div>
                                <span className="data-one-mini-card">총 페이지 뷰 수 {myDatas.all_pageViews}</span>
                                <span className="data-one-mini-card">총 세션 수 {myDatas.all_sessions}</span>
                            </div>
                        </div>
                        </>
                        }
                    </div>
                </div>
                <Footer />
                </div>
            )
        }else{
            return(
                <></>
            )
        }
    }
}

export default ResponsePage
