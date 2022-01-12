import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ConfirmCustom from '../../tools/ConfirmCustom'
import {dbService, stService} from '../../tools/fbase'
import './MadeLandingCard.css'

function MadeLandingCard({item, index, setNowChecking, history}) {
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

    return (
        <div className="page-card" key={index}>
            {item.urlTitle}
            <Link to={{
                pathname:`/make/edit`,
                state:{
                    item:item
                }
                }}>
                편집하기
            </Link>
            <button onClick={() => {setDeleteOpen(true)}}>삭제하기</button>
            <button>{"https://" + item.setting.urlId + ".surfee.co.kr/#/"}</button>
            <span onClick={() => {setNowChecking(index)}}>이 정보 보기</span>
            <ConfirmCustom open={deleteopen} setOpen={setDeleteOpen} message={"한번 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?"} callback={deletePage}/>
        </div>
    )
}

export default MadeLandingCard
