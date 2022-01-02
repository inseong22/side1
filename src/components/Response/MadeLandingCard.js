import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ConfirmCustom from '../../tools/ConfirmCustom'
import {dbService, stService} from '../../tools/fbase'

function MadeLandingCard({item, index, setNowChecking, history}) {
    const [open, setOpen] = useState(false)

    const deletePage = async () => {
        console.log("삭제");

        const dbgallery = await dbService
        .collection("apply-landing-data")
        .where("urlId", "==", item.urlId)
        .get()
        
        let dbgal = dbgallery.docs.map(doc => {return({...doc.data(), gal_id:doc.id})})

        // 댓글 목록에서도 지워야한다.
        
        //delete 파일도 같이 지워져야만 한다.
        await dbService.doc(`apply-landing-data/${item.id}`).delete();
        // await stService.refFromURL(item.attachmentURL).delete(); // URL만 가지고도 refence를 획득할 수 있게 해준다.

        // like에서도 지워야됨.

        // 새로고침 시키기
        alert("삭제했습니다.")
    }

    return (
        <div className="mylandings-card" key={index}>
            {item.urlTitle}
            <Link to={{
                pathname:`/make/edit`,
                state:{
                    item:item
                }
                }}>
                편집하기
            </Link>
            <button onClick={() => {setOpen(true)}}>삭제하기</button>
            <button>{"https://surfee.co.kr/#/" + item.urlId}</button>
            <span onClick={() => {setNowChecking(index)}}>이 정보 보기</span>
            <ConfirmCustom open={open} setOpen={setOpen} message={"한번 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?"} callback={deletePage}/>
        </div>
    )
}

export default MadeLandingCard
