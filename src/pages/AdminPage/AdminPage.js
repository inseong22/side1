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
    const [voted, setVoted] = useState([]);

    useEffect(() => {
        getThisPublished()
        getFeedback()
        getMails()
        getSaved()
        getVoted()
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

    const getVoted = async () => {
        const fds = await dbService
            .collection('vote')
            .orderBy("created", "desc")
            .get();
        let fd = fds.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });
        setVoted(fd);
    }

    const switchType = () => {
        switch (type){
            case 0:
                return(<MainPage history={history} />)
            case 1:
                return(
                    <div>
                        <div>
                            ????????? ?????????
                        </div>
                        <div>
                            {published &&
                            published.map((item, index) => {
                                let day = new Date(item.created)
                                let date = `${day.getMonth() + 1}??? ${day.getDate()}??? ${day.getHours()}??? ${day.getMinutes()}???`
                                return(
                                    <div className="center-row" style={{margin:'10px'}} key={index}>
                                        <Half>
                                            url : {item.urlId}
                                        </Half>
                                        <Half>
                                            ?????? : {date}
                                        </Half>
                                        <Half>
                                            ????????? ??? : {item.makerEmail}
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
                            ?????????
                        </div>
                        <div>
                            {feedback &&
                            feedback.map((item, index) => {
                                let day = new Date(item.created)
                                let date = `${day.getMonth() + 1}??? ${day.getDate()}??? ${day.getHours()}??? ${day.getMinutes()}???`
                                return(
                                    <div className="center-row" style={{margin:'10px', flexWrap:'wrap', backgroundColor:'rgba(0,0,0,0.2)'}} key={index}>
                                        <Half>
                                            ????????? : {item.comment}
                                        </Half>
                                        <Half>
                                            ????????? : {item.difficulty}
                                        </Half>
                                        <Half>
                                            ????????? ????????? ?????? : {item.function}
                                        </Half>
                                        <Half>
                                            ?????? ?????? : {item.funnel} {item.funnelEtc}
                                        </Half>
                                        <Half>
                                            ????????? : {item.inconvenience} {item.inconvenienceEtc}
                                        </Half>
                                        <Half>
                                            ????????? : {item.recommendation}
                                        </Half>
                                        <Half>
                                            ???????????? : {item.satisfaction} {item.satisfactionEtc}
                                        </Half>
                                        <Half>
                                            ?????? ?????? : {item.working_time}
                                        </Half>
                                        <Half>
                                            ????????? ?????? : {date}
                                        </Half>
                                        <Half>
                                            ????????? : {item.user}
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
                                ????????? ?????????
                            </div>
                            <div>
                                {saved &&
                                saved.map((item, index) => {
                                    let day = new Date(item.created)
                                    let date = `${day.getMonth() + 1}??? ${day.getDate()}??? ${day.getHours()}??? ${day.getMinutes()}???`
                                    return(
                                        <div className="center-row" style={{margin:'10px'}} key={index}>
                                            <Half>
                                                url : {item.urlId}
                                            </Half>
                                            <Half>
                                                ?????? : {date}
                                            </Half>
                                            <Half>
                                                ????????? ??? : {item.makerEmail}
                                            </Half>
                                        </div>
                                    )
                                }) 
                                }
                            </div>
                        </div>
                    )

            case 4:
                return(
                    <div>
                        <div>
                            ????????????
                        </div>
                        <div>
                            {voted &&
                                voted.map((item, index) => {
                                    console.log(item)
                                    let day = new Date(item.created)
                                    let date = `${day.getMonth() + 1}??? ${day.getDate()}??? ${day.getHours()}??? ${day.getMinutes()}???`
                                    return(
                                        <div className="center-row" style={{margin:'10px'}} key={index}>
                                            <Half>
                                                ?????? : {item.select.map((item1,index) => {
                                                    return item1 + ','
                                                })}
                                            </Half>
                                            <Half>
                                                ?????? : {date}
                                            </Half>
                                        </div>
                                    )
                            }) 
                            }
                        </div>
                    </div>
                )
            default:
                return(<>??????</>)
        }
    }

    return (
        <div>
            <div className="center-row" style={{zIndex:'2000'}}>
                <RadioButton  onClick={() => setType(0)}>
                    ????????? ??????
                </RadioButton>
                <RadioButton  onClick={() => setType(2)}>
                    ?????????(?????? ???)
                </RadioButton>
                <RadioButton  onClick={() => setType(1)}>
                    ????????? ?????????
                </RadioButton>
                <RadioButton  onClick={() => setType(3)}>
                    ????????? ?????????
                </RadioButton>
                <RadioButton  onClick={() => setType(4)}>
                    ??????
                </RadioButton>
            </div>
            <div>
                {switchType()}
            </div>
        </div>
    )
}

export default AdminPage
