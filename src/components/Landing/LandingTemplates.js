import React from 'react'
import mainpc from '../../tools/img/main/mainpc.webp';
import {isMobile} from 'react-device-detect'
import styled from 'styled-components'
import {ExampleCard} from '../../pages/ExamplePage/ExamplePage'
import m1 from '../../tools/img/example/m1.webp'
import m2 from '../../tools/img/example/m2.webp'
import s1 from '../../tools/img/example/s1.webp'
import s2 from '../../tools/img/example/s2.webp'
import p1 from '../../tools/img/example/p1.webp'
import p2 from '../../tools/img/example/p2.webp'
import c1 from '../../tools/img/example/c1.webp'
import c2 from '../../tools/img/example/c2.webp'

const For = styled('div')`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: ${isMobile ? '1em' : '24px'};
    line-height: 24px;
    color:#6c63ff;
`;

const Ment = styled('div')`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: ${isMobile ? '1.4em' : '32px'};
    line-height: 38px;
    color: rgba(0, 0, 0, 0.9);
    margin-top:5px;
    position:relative;
`;

const MentDesc = styled('div')`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: ${isMobile ? '0.8em' : '18px'};
    line-height: 28px;
    margin-top:${isMobile ? '8px' : '20px'};
`;

const TempMove = styled('div')`
    color:#6c63ff;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: ${isMobile ? '0.8em' : '18px'};
    line-height: 22px;
    cursor:pointer;
    margin-top:20px;
`;

function LandingTemplates() {
    return (
        <>
        {
            isMobile ? <>
            <div className='center-column' style={{margin:'30px 10px'}}>
                <div style={{width:'90vw'}}>
                    <For> for 마케터 </For>
                    <Ment>
                        "아... 개발팀 바쁘시군요..."
                        {/* <div style={{backgroundColor:'#6c63ff', position:'absolute', width:'150px', height:'30px', top:'0px'}}>
                        </div> */}
                    </Ment>
                    <MentDesc>
                        도전적인 아이디어를 빠르게 검증해보고 싶은데<br/>
                        다른 팀의 리소스를 끌어다 쓰기에는 확신이 없을 때,<br/>
                        Surfee로 가볍고 빠르게 도전해 보세요.<br/>
                    </MentDesc>
                    <TempMove className="underline-hover" onClick={() => {
                        window.open(
                            'https://surfee.co.kr/surfeeexamples'
                        )
                    }}>
                        > 이벤트/마케팅용 템플릿 더 보러가기
                    </TempMove>
                </div>
                <div style={{marginLeft:'10px', marginTop:'10px', display:'flex', flexDirection:'row', width:`${isMobile ? '100%' : ''}`}}>
                    <ExampleCard title="Mercury" url="mercurysurfeeex" img={m1} />
                    {
                        !isMobile &&
                        <ExampleCard title="Data" url="datasurfeeex" img={m2} />
                    }
                </div>
            </div>
            <div className='center-column' style={{margin:'30px 10px'}}>
                <div style={{width:'90vw'}}>
                    <For> for 예비 창업가 </For>
                    <Ment>
                        "이 아이디어로 창업해도 될까?"
                        {/* <div style={{backgroundColor:'#6c63ff', position:'absolute', width:'150px', height:'30px', top:'0px'}}>
                        </div> */}
                    </Ment>
                    <MentDesc>
                        스타트업 실패 이유 1위, ‘No Market Need’!<br/>
                        제품/서비스를 출시했는데 고객이 없다면 큰일이겠죠?<br/>
                        제품/서비스 제작 전 랜딩페이지로 잠재 고객을 확인하고<br/>
                        아이디어에 확신을 갖고 창업에 도전하세요.
                    </MentDesc>
                    <TempMove className="underline-hover" onClick={() => {
                        window.open(
                            'https://surfee.co.kr/surfeeexamples'
                        )
                    }}>
                        > 고객 검증용 템플릿 더 보러가기
                    </TempMove>
                </div>
                <div style={{marginLeft:'10px', marginTop:'10px', display:'flex', flexDirection:'row', width:'100%'}}>
                    <ExampleCard title="Code Note" url="codenotesurfeeex" img={s1} />
                    {
                        !isMobile &&
                        <ExampleCard title="Cakehouse" url="cakehousesurfeeex" img={s2} />
                    }
                </div>
            </div>
            <div className='center-column' style={{margin:'30px 10px'}}>
                <div style={{width:'90vw'}}>
                    <For> for 1인 사업가 </For>
                    <Ment>
                        "고객을 어떻게 모으지?"
                        {/* <div style={{backgroundColor:'#6c63ff', position:'absolute', width:'150px', height:'30px', top:'0px'}}>
                        </div> */}
                    </Ment>
                    <MentDesc>
                        글로만 설명할 수 있는 신청폼이 아쉽지 않나요?<br/>
                        다양한 컨텐츠를 이용하여 제품/서비스를 설명하고<br/>
                        간단한 신청폼으로 고객을 모아보세요.<br/>
                        신청 목록도 손쉽게 확인 가능하답니다!
                    </MentDesc>
                    <TempMove className="underline-hover" onClick={() => {
                        window.open(
                            'https://surfee.co.kr/surfeeexamples'
                        )
                    }}>
                        > 고객 모집용 템플릿 더 보러가기
                    </TempMove>
                </div>
                <div style={{marginLeft:'10px', marginTop:'10px', display:'flex', flexDirection:'row', width:'100%'}}>
                    <ExampleCard title="Home Bar" url="homebarsurfeeex" img={c1} />
                    {
                        !isMobile &&
                        <ExampleCard title="Fillom" url="fillomsurfeeex" img={c2} />
                    }
                </div>
            </div>
            <div className='center-column' style={{margin:'30px 10px'}}>
                <div style={{width:'90vw'}}>
                    <For> for 퍼스널 브랜딩 </For>
                    <Ment>
                        "나를 어떻게 잘 알리지?"
                        {/* <div style={{backgroundColor:'#6c63ff', position:'absolute', width:'150px', height:'30px', top:'0px'}}>
                        </div> */}
                    </Ment>
                    <MentDesc>
                        나만의 페이지를 만들어 자신을 알려보세요.<br/>
                        포트폴리오도, 가벼운 자기소개 페이지도 좋아요.<br/>
                        링크 하나면 PC에서도, 모바일에서도<br/>
                        나의 페이지를 공유할 수 있어요!
                    </MentDesc>
                    <TempMove className="underline-hover" onClick={() => {
                        window.open(
                            'https://surfee.co.kr/surfeeexamples'
                        )
                    }}>
                        > 포트폴리오용 템플릿 더 보러가기
                    </TempMove>
                </div>
                <div style={{marginLeft:'10px', marginTop:'10px', display:'flex', flexDirection:'row', width:'100%'}}>
                    <ExampleCard title="포트폴리오 1" url="port1surfeeex" img={p1} />
                    {
                        !isMobile &&
                        <ExampleCard title="포트폴리오 2" url="port3surfeeex" img={p2} />
                    }
                </div>
            </div>
            </>
            :
            <>
            <div className={isMobile ? 'center-column' : 'center-row'} style={{margin:`${isMobile ? '30px 10px':'100px 10px'}`}}>
                <div style={{width:`${isMobile ? '90vw' : '30vw'}`}}>
                    <For> for 마케터 </For>
                    <Ment>
                        "아... 개발팀 바쁘시군요..."
                        {/* <div style={{backgroundColor:'#6c63ff', position:'absolute', width:'150px', height:'30px', top:'0px'}}>
                        </div> */}
                    </Ment>
                    <MentDesc>
                        도전적인 아이디어를 빠르게 검증해보고 싶은데<br/>
                        다른 팀의 리소스를 끌어다 쓰기에는 확신이 없을 때,<br/>
                        Surfee로 가볍고 빠르게 도전해 보세요.<br/>
                    </MentDesc>
                    <TempMove className="underline-hover" onClick={() => {
                        window.open(
                            'https://surfee.co.kr/surfeeexamples'
                        )
                    }}>
                        > 이벤트/마케팅용 템플릿 더 보러가기
                    </TempMove>
                </div>
                <div style={{marginLeft:'10px', display:'flex', flexDirection:'row', width:`${isMobile ? '100%' : ''}`}}>
                    <ExampleCard title="Mercury" url="mercurysurfeeex" img={m1} />
                    {
                        !isMobile &&
                        <ExampleCard title="Data" url="datasurfeeex" img={m2} />
                    }
                </div>
            </div>
            <div className={isMobile ? 'center-column' : 'center-row'} style={{margin:'100px 10px'}}>
                <div style={{marginLeft:'10px', display:'flex', flexDirection:'row', width:`${isMobile ? '100%' : ''}`}}>
                    <ExampleCard title="Code Note" url="codenotesurfeeex" img={s1} />
                    {
                        !isMobile &&
                        <ExampleCard title="Cakehouse" url="cakehousesurfeeex" img={s2} />
                    }
                </div>
                <div style={{width:`${isMobile ? '90vw' : '30vw'}`, paddingLeft:'30px'}}>
                    <For> for 예비 창업가 </For>
                    <Ment>
                        "이 아이디어로 창업해도 될까?"
                        {/* <div style={{backgroundColor:'#6c63ff', position:'absolute', width:'150px', height:'30px', top:'0px'}}>
                        </div> */}
                    </Ment>
                    <MentDesc>
                        스타트업 실패 이유 1위, ‘No Market Need’!<br/>
                        제품/서비스를 출시했는데 고객이 없다면 큰일이겠죠?<br/>
                        제품/서비스 제작 전 랜딩페이지로 잠재 고객을 확인하고<br/>
                        아이디어에 확신을 갖고 창업에 도전하세요.
                    </MentDesc>
                    <TempMove className="underline-hover" onClick={() => {
                        window.open(
                            'https://surfee.co.kr/surfeeexamples'
                        )
                    }}>
                        > 고객 검증용 템플릿 더 보러가기
                    </TempMove>
                </div>
            </div>
            <div className={isMobile ? 'center-column' : 'center-row'} style={{margin:'100px 10px'}}>
                <div style={{width:`${isMobile ? '90vw' : '30vw'}`}}>
                    <For> for 1인 사업가 </For>
                    <Ment>
                        "고객을 어떻게 모으지?"
                        {/* <div style={{backgroundColor:'#6c63ff', position:'absolute', width:'150px', height:'30px', top:'0px'}}>
                        </div> */}
                    </Ment>
                    <MentDesc>
                        글로만 설명할 수 있는 신청폼이 아쉽지 않나요?<br/>
                        다양한 컨텐츠를 이용하여 제품/서비스를 설명하고<br/>
                        간단한 신청폼으로 고객을 모아보세요.<br/>
                        신청 목록도 손쉽게 확인 가능하답니다!
                    </MentDesc>
                    <TempMove className="underline-hover" onClick={() => {
                        window.open(
                            'https://surfee.co.kr/surfeeexamples'
                        )
                    }}>
                        > 고객 모집용 템플릿 더 보러가기
                    </TempMove>
                </div>
                <div style={{marginLeft:'10px', display:'flex', flexDirection:'row', width:`${isMobile ? '100%' : ''}`}}>
                    <ExampleCard title="Home Bar" url="homebarsurfeeex" img={c1} />
                    {
                        !isMobile &&
                        <ExampleCard title="Fillom" url="fillomsurfeeex" img={c2} />
                    }
                </div>
            </div>
            <div className={isMobile ? 'center-column' : 'center-row'} style={{margin:'100px 10px'}}>
                <div style={{marginLeft:'10px', display:'flex', flexDirection:'row', width:`${isMobile ? '100%' : ''}`}}>
                    <ExampleCard title="포트폴리오 1" url="port3surfeeex" img={p2} />
                    {
                        !isMobile &&
                        <ExampleCard title="포트폴리오 2" url="port1surfeeex" img={p1} />
                    }
                </div>
                <div style={{width:`${isMobile ? '90vw' : '30vw'}`, paddingLeft:'30px'}}>
                    <For> for 퍼스널 브랜딩 </For>
                    <Ment>
                        "나를 어떻게 잘 알리지?"
                        {/* <div style={{backgroundColor:'#6c63ff', position:'absolute', width:'150px', height:'30px', top:'0px'}}>
                        </div> */}
                    </Ment>
                    <MentDesc>
                        나만의 페이지를 만들어 자신을 알려보세요.<br/>
                        포트폴리오도, 가벼운 자기소개 페이지도 좋아요.<br/>
                        링크 하나면 PC에서도, 모바일에서도<br/>
                        나의 페이지를 공유할 수 있어요!
                    </MentDesc>
                    <TempMove className="underline-hover" onClick={() => {
                        window.open(
                            'https://surfee.co.kr/surfeeexamples'
                        )
                    }}>
                        > 포트폴리오용 템플릿 더 보러가기
                    </TempMove>
                </div>
            </div>
            </>
        }
        </>
    )
}

export default LandingTemplates
