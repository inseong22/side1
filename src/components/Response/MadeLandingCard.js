import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ConfirmCustom from '../../tools/ConfirmCustom'
import {dbService, stService} from '../../tools/fbase'
import './MadeLandingCard.css'
import {Copy} from '@styled-icons/boxicons-regular'

function MadeLandingCard({item, index, setNowChecking, history, addNew}) {
    const [deleteopen, setDeleteOpen] = useState(false)

    const deletePage = async () => {
        const dbgallery = await dbService
        .collection("made-page")
        .where("urlId", "==", item.setting.urlId)
        .get()
        
        let dbgal = dbgallery.docs.map(doc => {return({...doc.data(), gal_id:doc.id})})
        
        //delete 파일도 같이 지워져야만 한다.
        await dbService.doc(`apply-landing-data/${item.id}`).delete();
        // await stService.refFromURL(item.attachmentURL).delete(); // URL만 가지고도 refence를 획득할 수 있게 해준다.

        // like에서도 지워야됨.

        // 새로고침 시키기
        alert("삭제했습니다.")
    }

    if(addNew){
        return(
            <Link to={{
                pathname:`/make`,
                state:{
                    newMake:true,
                }}} 
                className="response-page-card hover-shadow">
                <div className="response-card-main-color">
                + 새로운 랜딩페이지 만들기
                </div>
            </Link>
        )
    }
    return (
        <div className="response-page-card hover-shadow" onClick={() => setNowChecking(index)}>
            <div className="center-row" style={{justifyContent: "start"}}>
                <div className="card__title">
                    {item.setting.title}
                </div>
                <div>
                    배포 전
                </div>
            </div>
            <div className="center-row">
                <div className="left" style={{fontSize:'0.7em', width:'70%'}}>
                    https://{item.setting.urlId}.surfee.co.kr <Copy size={15} color="#6B63F7" onClick={() => {
                        document.execCommand('copy');
                        alert("Copied!");
                    }}
                    style={{marginLeft:'5px'}}
                    />
                </div>
                <div className="right" style={{fontSize:'15px', width:'30%'}}>
                    <button className="content__button cb-delete" onClick={() => {setDeleteOpen(true)}}>삭제</button>
                    <button className="content__button">복제</button>
                </div>
            </div>
            {/* <Link to={{
                pathname:`/make/edit`,
                state:{
                    item:item
                }
                }}>
                편집하기
            </Link> */}
            <ConfirmCustom open={deleteopen} setOpen={setDeleteOpen} message={"한번 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?"} callback={deletePage}/>
        </div>
    )
}

export default MadeLandingCard
