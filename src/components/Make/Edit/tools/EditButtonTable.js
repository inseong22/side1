import React from 'react'


function EditButtonTable({value, onChange, color}) {

    const buttonTemplates = [
        {
            num:1,
            button:<div className="make-nav-button-tem b-one" style={{backgroundColor: color}}>버튼1</div>
        },
        {
            num:2,
            button:<div className="make-nav-button-tem b-two" style={{backgroundColor: color}}>버튼2</div>
        },
        {
            num:3,
            button:<div className="make-nav-button-tem b-three" style={{backgroundColor: color}}>버튼3</div>
        },
        {
            num:4,
            button:<div className="make-nav-button-tem b-four" style={{backgroundColor: color}}>버튼4</div>
        },
    ]

    return (
        <div className="edit-element" style={{flexDirection:'column'}}>
            <div className="edit-element__left">버튼 모양</div>
            <div className="button-table">
                { buttonTemplates.map((item, index) => {
                    let backColor = "rgba(100,100,100,0)";
                    if(value === item.num){
                        backColor = "rgba(200,200,200,0.4)";
                    }
                    return(
                        <div className="button-container" style={{backgroundColor:`${backColor}`}} onClick={() => onChange(item.num)}>
                            {item.button}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EditButtonTable
