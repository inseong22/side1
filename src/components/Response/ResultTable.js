import React from 'react'

function ResultTable({responses, nowChecking, index}) {

    const userOneLine = (item) => {
        let day = new Date(item.created)
        let date = `${day.getMonth() + 1}월 ${day.getDate()}일 ${day.getHours()}시 ${day.getMinutes()}분`

        if(item.type === 'click'){
            return(
                <div className="response__user-datas" key={index}>
                    <div className="response__user-datas-one" style={{width:'150px'}}> 
                        클릭
                    </div>
                    <div className="response__user-datas-one">   
                        <span style={{color:'rgb(10,10,10)'}}>{item.from}</span>에서 클릭
                    </div>
                    <div className="response__user-datas-one" style={{textAlign:'right'}}>
                        {date}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="response__user-datas" key={index}>
                    <div className="response__user-datas-one" style={{width:'170px'}}> 
                        신청
                    </div>
                    {
                        item.values.map((doc, index) => {
                            if(doc.length > 1){
                                return(
                                    <div className="response__user-datas-one" key={index}>
                                        {doc}
                                    </div>
                                )
                            }
                        })
                    }
                    <div className="response__user-datas-one" style={{textAlign:'right'}}>
                        {date}
                    </div>
                </div>
            )
        }
    }
    
    return (
        <div className="response-table-middle">
            <div className="response__user-datas-top">
                <div className="response__user-datas-one" style={{width:'150px'}}> 
                    타입
                </div>
                <div className="response__user-datas-one">
                    유저의 행동 데이터
                </div>
                <div className="response__user-datas-one" style={{textAlign:'right'}}>
                    시간
                </div>
            </div>
            {
                typeof responses[nowChecking] !== undefined && 
                <>
                    {
                    responses[nowChecking].map((item, index) => {
                        return(
                            <>
                                {userOneLine(item, index)}
                            </>
                        )
                })}
                </>
            }
        </div>
    )
}

export default ResultTable
