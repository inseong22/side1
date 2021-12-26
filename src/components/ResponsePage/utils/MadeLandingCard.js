import React from 'react'
import { Link } from 'react-router-dom'


function MadeLandingCard({item, index, setNowChecking}) {
    return (
        <div className="mylandings-card" key={index}>
            {item.urlTitle}
            <Link to={{
                pathname:`/makev2/edit`,
                state:{
                    item:item
                }
                }}>
                편집하기
            </Link>
            <button>{"https://surfee.co.kr/#/" + item.urlId}</button>
            <span onClick={() => {setNowChecking(index)}}>이 정보 보기</span>
        </div>
    )
}

export default MadeLandingCard
