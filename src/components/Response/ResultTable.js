import React, {useState} from 'react'
import {
    ChakraProvider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'
  import {ChevronDown} from '@styled-icons/bootstrap'
import {InputCursorText, CheckAll} from '@styled-icons/bootstrap'
import {CursorClick} from '@styled-icons/fluentui-system-filled'

function ResultTable({responses, nowChecking, index}) {
    const [type, setType] = useState({name : '전체', value:'all'})
    const [time, setTime] = useState({name : '최신순', value:'new'})

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
    
    console.log(responses[nowChecking].filter(doc => type.value === 'all' || doc.type === type.value))

    return (
        <ChakraProvider>
            <div className="response-table-middle">
                <div className="response__user-datas-top">
                    <Menu>
                        <MenuButton className="response__user-datas-one rud-hover" style={{width:'110px', padding:'15px 10px', textAlign:'center', fontWeight:'700'}}>
                            { type.name }
                            <ChevronDown size="15" style={{marginLeft:'10px'}}/>
                        </MenuButton>
                        <MenuList minWidth='110px' maxWidth='110px'>
                            <MenuItem className="menu-item" onClick={() => setType({name : '전체', value:'all'})}> 
                                전체
                                {/* <CheckAll size="15" style={{marginLeft:'15px'}} /> */}
                            </MenuItem>
                            <MenuItem className="menu-item" onClick={() => setType({name : '클릭', value:'click'})}> 
                                클릭
                            </MenuItem>
                            <MenuItem className="menu-item" onClick={() => setType({name : '신청', value:'apply'})}> 
                                신청 
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <div className="response__user-datas-one">
                        유저의 행동 데이터
                    </div>
                    <Menu>
                        <MenuButton className="response__user-datas-one rud-hover" style={{width:'180px', padding:'15px 10px', textAlign:'center', fontWeight:'700'}}>
                            시간 ( { time.name } )
                            <ChevronDown size="15" style={{marginLeft:'10px'}}/>
                        </MenuButton>
                        <MenuList minWidth='150px' maxWidth='150px'>
                            <MenuItem className="menu-item" onClick={() => setTime({name : '최신순', value:'new'})}> 
                                최신순
                            </MenuItem>
                            <MenuItem className="menu-item" onClick={() => setTime({name : '오래된 순', value:'old'})}> 
                                오래된 순
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
                {
                    typeof responses[nowChecking] !== undefined && 
                    <>
                        {
                        responses[nowChecking]
                            .filter(doc => type.value === 'all' || doc.type === type.value)
                            .sort((a,b) => {
                                if(time.value === 'new'){
                                    return b.created - a.created
                                }else{
                                    return a.created - b.created
                                }
                            })
                            .map((item, index) => {
                                return(
                                    <>
                                        {userOneLine(item, index)}
                                    </>
                                )
                            })}
                    </>
                }
            </div>
        </ChakraProvider>
    )
}

export default ResultTable
