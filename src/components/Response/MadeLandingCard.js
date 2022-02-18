import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ConfirmCustom from '../../tools/ConfirmCustom'
import {dbService, stService} from '../../tools/fbase'
import './MadeLandingCard.css'
import {Copy} from '@styled-icons/boxicons-regular'

function MadeLandingCard({item,published, id, index, setNowChecking, nowChecking, history, addNew, num, update, setUpdate}) {
    const [deleteopen, setDeleteOpen] = useState(false)

    const deletePage = async () => {

        var saved_delete = await dbService.collection('saved-page').where('urlId','==', item.urlId).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
          });;

        var published_delete = await dbService.collection('published-page').where('urlId','==', item.urlId).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
          });
        
          var urlStores = await dbService.collection('urlStores').where('urlId','==', item.urlId).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
          });

        //   var datas = await dbService.collection('datas').where('pageId','==', item.id).get().then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //       doc.ref.delete();
        //     });
        //   });

        // 새로고침 시키기
        alert("삭제했습니다.")
        setUpdate(!update)

        history.go()
    }

    const duplicate = async () => {
        if(num > 2){
            alert("최대 3개의 페이지만 만들 수 있습니다.")
        }else{
            await dbService.collection("saved-page").add(item);

            // await dbService.collection("urlStores").add({urlId:item.setting.urlId});

            setUpdate(!update)
            alert("복제되었습니다.")
            history.go(-1)
        }
    }

    const returnDate = (made) => {
        let day = new Date(Date.now() - made);

        return(
            <>
            {
            day.getDate()-1 > 0 ? <>
            {day.getDate()-1} 일전</> :
            day.getHours()-9 > 0 ? <>
                {day.getHours()-9} 시간전 </> : 
                <>{day.getMinutes()}분전</>}
            </>
        )
    }

    if(addNew){
        return(
            <Link to={{
                pathname:`/make`,
                state:{
                    newMake:true,
                }}} 
                className="response-page-card uphover">
                <div className="response-card-main-color">
                + 새로운 랜딩페이지 만들기
                </div>
            </Link>
        )
    }
    return (
        <div className="response-page-card uphover" onClick={() => setNowChecking(index)} style={{border:`${index === nowChecking ? '0.6px solid #A89AFF' : 'none'}`}}>
            <div className="center-row" style={{justifyContent: "start"}}>
                <div className="card__title">
                    {item.setting.title}
                </div>
                <div style={{width:`${published ? '40%' : '20%'}`, fontSize:'0.6em', textAlign:'end'}}>
                    {published ? 
                    <div style={{display: 'flex', justifyContent:'end', alignItems: 'center', flexDirection:'row'}}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius:'10px',
                        marginRight:'5px',
                        background: '#11E533'}}></div>
                    {returnDate(published.created)} 마지막 배포
                    </div>
                    :
                    <div style={{display: 'flex', justifyContent:'end', alignItems: 'center', flexDirection:'row'}}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius:'10px',
                        marginRight:'5px',
                        background: '#C4C4C4'}}></div>배포 전
                    </div>
                    }
                </div>
            </div>
            <div className="center-row">
                <div className="left" style={{fontSize:'0.7em', width:'70%'}}>
                    https://{item.setting.urlId}.surfee.co.kr 
                    {/* <Copy size={15} color="#6B63F7" onClick={(e) => {
                        alert("링크가 복사되었습니다");
                    }}
                    style={{marginLeft:'5px'}}
                    /> */}
                </div>
                <div className="right" style={{fontSize:'15px', width:'30%'}}>
                    <button className="content__button cb-delete" onClick={() => {setDeleteOpen(true)}}>삭제</button>
                    <button className="content__button" onClick={() => duplicate()}>복제</button>
                </div>
            </div>
            <ConfirmCustom warn open={deleteopen} setOpen={setDeleteOpen} message={"한번 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?"} callback={deletePage}/>
        </div>
    )
}

export default MadeLandingCard
