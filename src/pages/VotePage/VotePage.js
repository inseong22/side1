import React, {useState, useEffect} from 'react'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import Footer from '../NavAndFooter/Footer'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {ChakraProvider, Button} from '@chakra-ui/react'
import {dbService} from '../../tools/fbase'
import produce from 'immer'
import './VotePage.css'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const TC = styled('span')`
    color:#6c63ff
`
const Left = styled('span')`
    width:30%;
    text-align:center;
    font-weight:700;
`

const Purple = styled('div')`
    display:flex;
    justify-content:center;
    align-items:center;
    width:300px;
    padding:15px 0px;
    background: linear-gradient(180deg, #885DF1 0%, #6610F2 100%);
    color:white;
    border-radius:20px;
    margin:8px;
`

const FEATURES = [
    '신청폼 고도화',
    '신청 유저 명단 엑셀 파일 추출',
    '무료 이미지 및 아이콘 제공',
    '위클리 페이지 콘테스트',
]

function VotePage({history, isLoggedIn}) {
    const [select, setSelect] = useState([false, false, false, false])
    const [ranks, setRanks] = useState([0,0,0,0])
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        getRanks()
    }, [select, update])

    const getRanks = async () => {
        const votes = await dbService.collection('vote').get()

        let votess = votes.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        let tempRanks = [0,0,0,0];

        votess.map((item, index) => {
            item.select.map((vote, index) => {
                if(vote){
                    tempRanks[index] = tempRanks[index] + 1;
                }
            })
        })
        setRanks(tempRanks);
    }

    const vote = async () => {
        if(select === [false, false, false, false]){
            alert("원하시는 기능을 선택해주세요!")
            return
        }
        if(!cookies.get('featvote')){
            const expires = new Date()
            expires.setDate(expires.getDate() + 7)

            let selectList = select.map((item, index) => {
                if(item){
                    return FEATURES[index]
                }else{
                    return ''
                }
            })

            const body = {
                created:Date.now(),
                select:selectList,
            }
    
            await dbService.collection('vote').add(body);
    
            alert("투표가 완료되었습니다.");
            
            cookies.set('featvote', true, {
                expires:expires
            })
        }else{
            alert('기능 투표는 일주일에 한번씩만 가능해요 :)')
        }
        setUpdate(!update);
    }

    const returnRank = num => {
        let top = 0;

        [0,0,0,0].map((item, index) => {
            let top = 0;

            if(ranks[index] <= ranks[0]){
                top += 1;
            }
            if(ranks[index] <= ranks[1]){
                top += 1;
            }
            if(ranks[index] <= ranks[2]){
                top += 1;
            }
            if(ranks[index] <= ranks[3]){
                top += 1;
            }
            if(top === num){
                return(
                    <>
                        {FEATURES[index]}
                    </>
                )
            }
            console.log(top, num)
        })
    }

    return (
        <div style={{width:'100%', background:'rgba(0,0,0,0.1)'}}>
        <NavBarV2 history={history} isLoggedIn={isLoggedIn} />
        <div className="center-column" style={{padding:'100px 0px', fontFamily:'Noto Sans KR'}}>
            <div style={{placeItems:'center', textAlign:'center', width:'100%'}}>
                <div style={{fontSize:'1.8em', fontWeight:'700', margin:'20px'}}>
                    <TC>Surfee</TC>에 이런 기능이 추가되면 좋겠어요!
                </div>
                <div>
                    유저분들과 함께 만들어가는 <TC>Surfee</TC>!<br/>
                    다음 업데이트에서 <TC>Surfee</TC>에 추가되면 좋을 기능을 투표해주세요.
                </div>
            </div>
            <div className="center-column" style={{width:'60%', marginTop:'30px'}}>
                {/*추가*/}
                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                    <div className="vote-one__container" style={{marginBottom:'20px',  width:'100%', padding:'30px 30px', fontSize:'1.1em', fontWeight:'700'}}>
                        <TC style={{marginBottom:'10px'}}>🎉3월 업데이트🎉</TC> 텍스트 에디터 기능 추가
                    </div>
                </div>        
               {/*추가*/}
                <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                    <div className="vote-one__container" style={{width:'45%', marginRight:'10px'}}>
                        <div className="vote-title">
                            💡 현재 투표 순위 
                        </div>
                        <div style={{margin:'10px 0px'}}>
                            4월 업데이트
                        </div>
                        <Purple>
                            <Left style={{width: '20%'}}><span style={{color:'#FFF500'}}>1</span>등</Left>
                            <span style={{width:'70%', textAlign:'center'}}>
                            {
                                FEATURES[0]
                            }
                            </span>
                        </Purple>
                        <Purple>
                            <Left style={{width: '20%'}}><span style={{color:'#FFAC33'}}>2</span>등</Left>
                            <span style={{width:'70%', textAlign:'center'}}>
                            {
                                FEATURES[1]
                            }
                            </span>
                        </Purple>
                        <Purple>
                            <Left style={{width: '20%'}}><span style={{color:'#6AF467'}}>3</span>등</Left>
                            <span style={{width:'70%', textAlign:'center'}}>
                            {
                                FEATURES[2]
                            }
                            </span>
                        </Purple>
                    </div>
                    <div className="vote-one__container" style={{width:'55%', marginLeft:'10px'}}>
                        <div className="vote-title">
                            🔔 현재 추가 중인 기능
                        </div>
                        <div className="soft-purple__container">
                            <div style={{color:'white', fontWeight:'700'}}>
                                유저분들의 가장 많은 선택을 받았어요!
                            </div>
                            <div className="soft-purple-linear">
                                A/B 테스트
                            </div>
                            <div style={{fontSize:'0.9em'}}>
                                이게 좋을지, 저게 좋을지<br/>
                                이제 더 이상 <strong>고민하지말고, 테스트</strong>해보세요!
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vote-one__container" style={{width:'calc(100% - 40px)', marginTop:'20px'}}>
                    <div className="vote-title">
                        👉 투표하기 👈
                    </div>
                    <div style={{margin:'20px 0px', textAlign:'center'}}>
                        다음 업데이트에서 <TC>Surfee</TC>에 추가되면 좋을 기능을 투표해주세요!<br/>
                        중복으로 투표가 가능합니다.
                    </div>
                    <div className="center-row">
                        {
                            [0,0,0,0].map((item, index) => {
                                return(
                                    <div className="vote-option" onClick={() => setSelect(produce(select, draft => {
                                        draft[index] = !draft[index];
                                    }))} style={{border:`1px solid ${select[index] ? '#6c63ff' : 'rgba(0,0,0,0.15)'}`, color:`${select[index] ? '#6c63ff' : 'rgba(0,0,0,1)'}`}}>
                                        {FEATURES[index]}
                                    </div>
                                )
                            })
                        }
                        {/* <div className="vote-option" onClick={() => setSelect(produce(select, draft => {
                            draft[0] = !draft[0];
                        }))} style={{border:`2px solid ${select[0] ? '#6c63ff' : 'rgba(0,0,0,0)'}`, color:`${select[0] ? '#6c63ff' : 'rgba(0,0,0,1)'}`}}>
                            A/B 테스트
                        </div>
                        <div className="vote-option" onClick={() => setSelect(produce(select, draft => {
                            draft[1] = !draft[1];
                        }))} style={{border:`2px solid ${select[1] ? '#6c63ff' : 'rgba(0,0,0,0)'}`, color:`${select[1] ? '#6c63ff' : 'rgba(0,0,0,1)'}`}}>
                            신청폼 고도화
                        </div>
                        <div className="vote-option" onClick={() => setSelect(produce(select, draft => {
                            draft[2] = !draft[2];
                        }))} style={{border:`2px solid ${select[2] ? '#6c63ff' : 'rgba(0,0,0,0)'}`, color:`${select[2] ? '#6c63ff' : 'rgba(0,0,0,1)'}`}}>
                            신청 유저 명단<br/>
                            엑셀 파일 추출
                        </div>
                        <div className="vote-option" onClick={() => setSelect(produce(select, draft => {
                            draft[3] = !draft[3];
                        }))} style={{border:`2px solid ${select[3] ? '#6c63ff' : 'rgba(0,0,0,0)'}`, color:`${select[3] ? '#6c63ff' : 'rgba(0,0,0,1)'}`}}>
                            무료 이미지<br/>
                            및 아이콘 제공
                        </div> */}
                    </div>
                    <div className="morphism-button" style={{color:'#6c63ff'}} onClick={() => vote()}>
                        투표하기
                    </div>
                    <div onClick={() => {
                         window.open(
                            'https://tally.so/r/wMZ4Yn',
                            '_blank'
                        )
                    }} className="click-text">
                        다른 기능도 건의하기! →
                    </div>
                </div>
                <div style={{width:'100%'}}>
                    <div onClick={() => {
                         window.open(
                            'https://www.notion.so/Surfee-e2153c36197d40cdb924bab5f54d5b71',
                            '_blank'
                        )
                    }} className="morphism-button" style={{width:'400px', padding:'30px 30px', fontSize:'1.1em', fontWeight:'700'}}>
                        <TC>Surfee</TC> 업데이트 로그 확인하기 >
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default VotePage