import React, {useState} from 'react'
import {
    ChakraProvider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Tooltip
  } from '@chakra-ui/react'
  import {ChevronDown} from '@styled-icons/bootstrap'
  import {dbService} from '../../tools/fbase'
  import ConfirmCustom from '../../tools/ConfirmCustom'
  import {produce} from 'immer'

function ResultTable({responses, nowChecking, index, update, setUpdate, setResponses}) {
    const [type, setType] = useState({name : '전체', value:'all'})
    const [time, setTime] = useState({name : '최신순', value:'new'})
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [id, setId] = useState('')

    const deleteData = async id => {
        await dbService.doc(`datas/${id}`).delete();
        setResponses(produce(responses, draft => {
            draft[nowChecking] = draft[nowChecking].filter(doc => doc.id !== id)
        }))
    }

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
                    <Button size="xs" style={{backgroundColor:'#EB8A8A', color:'white', border:'none', marginRight:'3px'}} variant='outline' onClick={() => {setId(item.id);setConfirmOpen(true)}}>X</Button>
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
                    <Button size="xs" style={{backgroundColor:'#EB8A8A', color:'white', border:'none', marginRight:'3px'}} variant='outline' onClick={() => {setId(item.id);setConfirmOpen(true)}}>X</Button>
                </div>
            )
        }
    }
    
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
                    <div style={{width:'50px', textAlign:'center', cursor: 'default'}}>            
                        {/* <Tooltip label='클릭 시 바로 삭제되니 조심하셔야 해요!' placement='top'> */}
                            ⚠️
                        {/* </Tooltip> */}
                    </div>
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
            <ConfirmCustom open={confirmOpen} setOpen={setConfirmOpen} message={"데이터를 삭제하시겠습니까?"} callback={() => deleteData(id)} warn />
        </ChakraProvider>
    )
}

export default ResultTable
