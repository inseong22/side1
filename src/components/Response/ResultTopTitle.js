import React,{useState} from 'react'
import {Link } from 'react-router-dom'
import gadata from '../../tools/datacodes/gadata.json'
import { Tooltip, ChakraProvider } from '@chakra-ui/react'
import { InformationCircle } from '@styled-icons/ionicons-outline';
import {dbService} from '../../tools/fbase';
import './ResultTopTitle.css'
import FeedbackModal from '../../tools/FeedbackModal'

function ResultTopTitle({content, myResponses, checkPublished, history, datas}) {
    const [feedbackOpen, setFeedbackOpen] = useState(false);

    console.log(datas)
    const numOfPerson = (type) => {
        let numClick = 0
        myResponses.forEach(doc => doc.type === type ? numClick += 1 : numClick)
        return numClick
    }

    const doPublish = async () => {
        await dbService
            .collection('published-page')
            .where('pageId', "==", content.id)
            .get().then( querySnapshot => 
                { 
                    if(querySnapshot.empty){
                        console.log("새 배포")
                        let body = {
                            ...content,
                            pageId:content.id,
                            created:Date.now(),
                        }
                        dbService.collection('published-page').add(body)
                    }else{
                        console.log("배포 수정")
                        let body = {
                            ...content,
                            created:Date.now(),
                        }
                        querySnapshot.forEach(async (doc) => {
                            await dbService.doc(`published-page/${doc.id}`).update(body).then(() => {
                                alert("배포 완료되었습니다.")
                                history.go();
                            })
                        });
                    }
                }
            )
    }

    const ResultData = ({data, name, end, type}) => {
        return(
            <div className="data-result__card" style={{borderRight:`${end ? 'none' : '1px solid var(--main-light-gray)'}`}}>
                <div className="data-result__data">
                    {data}
                    { type ? type : null}
                </div>
                <div className="data-result__name">
                    {name}
                </div>
            </div>
        )
    }

    return (
    <ChakraProvider>
    <div className="response-table-top">
        <span className="response-table-title"> 
            <div className="left" style={{width:'80%'}}>
                {
                    checkPublished(content.urlId) ? 
                    <div className="center-row" style={{justifyContent:'start'}}>
                        <div className="ga-data__container"> 
                            <Tooltip hasArrow arrowSize={10} label={"데이터는 Google Analytics의 업데이트 주기에 맞춰 \n 30분마다 업데이트 됩니다."} placement='top' fontSize='13'>
                                <InformationCircle size="18" style={{color:'#C4CACF', zIndex:'20', margin:'0px 6px'}}/>
                            </Tooltip>
                            {
                                // 이 페이지 관련 GA 데이터가 있을 때
                                datas ? 
                                <div className="row">
                                    <ResultData data={datas.pageViews + "개"} name="페이지 뷰" />
                                    <ResultData data={datas.users + "명"} name="유입 수" />
                                    <ResultData data={numOfPerson('apply') / parseInt(datas.users)} name="신청 전환율" type="%"/>
                                    <ResultData data={numOfPerson('click') / parseInt(datas.users)} name="클릭 전환율" type="%"/>
                                </div>
                                :
                                <div className="row">
                                    아직 기록된 GA 데이터가 없습니다.
                                </div>
                            }
                            <ResultData data={numOfPerson('click')} name="버튼 클릭 수" />
                            <ResultData data={numOfPerson('apply')} name="신청 수" end/>
                        </div>
                    </div>
                    :
                    <div>
                        이 랜딩페이지는 아직 배포되지 않았습니다. 오른쪽의 ‘배포하기' 버튼을 눌러 페이지를 배포하고, 전환율 및 신청을 확인하세요
                    </div>
                }
            </div>
            <div className="right" style={{flexDirection: 'row', width:'20%'}}>
                <Link to={{
                    pathname:`/make`,
                    state:{
                        item:content,
                    }}} 
                    className="default-button-01 opacity-hover" style={{marginLeft:'15px'}}>편집하기</Link>
                <div className="default-button-02" style={{marginLeft:'15px'}} 
                onClick={() => {
                    if(localStorage.getItem('feedback'))
                    {
                        doPublish();
                    }
                    else{
                        setFeedbackOpen(true)
                    }
                }}
                    >배포하기</div>
            </div>
        </span>
    </div>
    <FeedbackModal open={feedbackOpen} setOpen={setFeedbackOpen} deploy={doPublish}/>
    </ChakraProvider>
    )
}

export default ResultTopTitle
