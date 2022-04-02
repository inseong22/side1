import React, {useState, useEffect} from 'react'
import { styled } from '@mui/system';
import MainPage from '../Landing/old/MainPage'
import { dbService } from '../../tools/fbase'

const RadioButton = styled('div')`
    margin:10px;
    background-color:#6c63ff;
    padding:10px;
`;

const Half = styled('div')`
    margin:10px;
    width:20%;
`;

function AdminPage({history}) {
    const [type, setType] = useState(4);
    const [published, setPublished] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [emails, setEmails] = useState([]);
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        getThisPublished()
        getFeedback()
        getMails()
        getSaved()
        emails.map(doc => console.log(doc.email))
    }, emails)

    const getThisPublished = async () => {
        const publishedDatas = await dbService
            .collection('published-page')
            .orderBy("created", "desc")
            .get();
        let publishedData = publishedDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        setPublished(publishedData);
    }

    const getFeedback = async () => {
        const fds = await dbService
            .collection('feedback')
            .get();
        let fd = fds.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        setFeedback(fd);
    }

    const getMails = async () => {
        const fds = await dbService
            .collection('apply-datas')
            .get();
        let fd = fds.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        setEmails(fd);
    }

    const getSaved = async () => {
        const fds = await dbService
            .collection('saved-page')
            .orderBy("created", "desc")
            .get();
        let fd = fds.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        setSaved(fd);
    }

    const switchType = () => {
        switch (type){
            case 0:
                return(<MainPage history={history} />)
            case 1:
                return(
                    <div>
                        <div>
                            배포된 페이지
                        </div>
                        <div>
                            {published &&
                            published.map((item, index) => {
                                let day = new Date(item.created)
                                let date = `${day.getMonth() + 1}월 ${day.getDate()}일 ${day.getHours()}시 ${day.getMinutes()}분`
                                return(
                                    <div className="center-row" style={{margin:'10px'}} key={index}>
                                        <Half>
                                            url : {item.urlId}
                                        </Half>
                                        <Half>
                                            날짜 : {date}
                                        </Half>
                                        <Half>
                                            만드신 분 : {item.makerEmail}
                                        </Half>
                                    </div>
                                )
                            }) 
                            }
                        </div>
                    </div>
                )

            case 2:
                return(
                    <div>
                        <div>
                            피드백
                        </div>
                        <div>
                            {feedback &&
                            feedback.map((item, index) => {
                                let day = new Date(item.created)
                                let date = `${day.getMonth() + 1}월 ${day.getDate()}일 ${day.getHours()}시 ${day.getMinutes()}분`
                                return(
                                    <div className="center-row" style={{margin:'10px', flexWrap:'wrap', backgroundColor:'rgba(0,0,0,0.2)'}} key={index}>
                                        <Half>
                                            코멘트 : {item.comment}
                                        </Half>
                                        <Half>
                                            난이도 : {item.difficulty}
                                        </Half>
                                        <Half>
                                            있으면 좋겠는 기능 : {item.function}
                                        </Half>
                                        <Half>
                                            유입 경로 : {item.funnel} {item.funnelEtc}
                                        </Half>
                                        <Half>
                                            불편함 : {item.inconvenience} {item.inconvenienceEtc}
                                        </Half>
                                        <Half>
                                            추천도 : {item.recommendation}
                                        </Half>
                                        <Half>
                                            만족사항 : {item.satisfaction} {item.satisfactionEtc}
                                        </Half>
                                        <Half>
                                            작업 시간 : {item.working_time}
                                        </Half>
                                        <Half>
                                            피드백 시간 : {date}
                                        </Half>
                                        <Half>
                                            작성자 : {item.user}
                                        </Half>
                                    </div>
                                )
                            }) 
                            }
                        </div>
                    </div>
                )

                case 3:
                    return(
                        <div>
                            <div>
                                저장된 페이지
                            </div>
                            <div>
                                {saved &&
                                saved.map((item, index) => {
                                    let day = new Date(item.created)
                                    let date = `${day.getMonth() + 1}월 ${day.getDate()}일 ${day.getHours()}시 ${day.getMinutes()}분`
                                    return(
                                        <div className="center-row" style={{margin:'10px'}} key={index}>
                                            <Half>
                                                url : {item.urlId}
                                            </Half>
                                            <Half>
                                                날짜 : {date}
                                            </Half>
                                            <Half>
                                                만드신 분 : {item.makerEmail}
                                            </Half>
                                        </div>
                                    )
                                }) 
                                }
                            </div>
                        </div>
                    )

            default:
                return(<>뭐요</>)
        }
    }

    return (
        <div>
            <div className="center-row" style={{zIndex:'2000'}}>
                <RadioButton  onClick={() => setType(0)}>
                    데이터 용도
                </RadioButton>
                <RadioButton  onClick={() => setType(2)}>
                    피드백(배포 시)
                </RadioButton>
                <RadioButton  onClick={() => setType(1)}>
                    배포된 페이지
                </RadioButton>
                <RadioButton  onClick={() => setType(3)}>
                    저장된 페이지
                </RadioButton>
            </div>
            <div>
                {switchType()}
            </div>
        </div>
    )
}

export default AdminPage
