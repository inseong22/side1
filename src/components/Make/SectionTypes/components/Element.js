import React, {useContext, useState} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import produce from 'immer'
import IconTable from '../components/IconTable'
import {Upload} from '@styled-icons/bootstrap';
import {
    ChakraProvider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
  } from '@chakra-ui/react'

function Element({content, item, index}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [open, setOpen] = useState([false, false, false]);
    const handleClick = (index) => {
        setOpen(produce(open, draft => {
            draft[index] = !open[index];
        }));
    };
  
    const handleClose = (index) => {
        setOpen(produce(open, draft => {
            draft[index] = false;
        }));
    };

    return (
<ChakraProvider>
    <div className="centeras" style={{justifyContent: `${content.align}`}}>
        <div style={{width:`${content.element.size}px`, height:`${content.element.size}px`, position:'relative', cursor:'pointer'}}>
        {
        content.element.type === 'image' ? <>
        { item.attachment ? 
        <img src={item.attachment} style={{width:`${content.element.size}px`, height:`${content.element.size}px`, borderRadius:`${content.element.borderRadius}px`}}/> 
          :
        <div className="feature-upload-button" style={{borderRadius:`${content.element.borderRadius}px`, backgroundColor:`${content.element.backgroundColor}`}}>
            <Upload size="25" />
        </div>
        
        }
        <input
            className="feature-upload-file"
            type="file" 
            accept="image/*" 
            id="file" 
            onChange={ e => {
                const {target:{files},} = e;
                const oneFile = files[0];
                const reader = new FileReader();
                reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
                    const {currentTarget:{result}} = finishedEvent;
                    action.setContents(produce(state.contents, draft=>{
                        draft[state.secNum].elements[index].attachment = result;
                    }))
                }
                if(oneFile){
                    reader.readAsDataURL(oneFile);
                }
            } }
        /> </> : 
        <>
        <Popover
            placement='top'
            closeOnBlur={false}
            isOpen={open[index]}
            onClose={() => handleClose(index)}>
        <PopoverTrigger>
                <div className="feature-upload-button" style={{borderRadius:`${content.element.borderRadius}px`, backgroundColor:`${content.element.backgroundColor}`}} onClick={() => handleClick(index)}>
                    {item.icon ? 
                        <>{item.icon}</> 
                        :
                        <Upload size="25" />
                    }
                </div>
        </PopoverTrigger>
        <PopoverContent style={{zIndex:1900}}>
            <PopoverArrow />
            <PopoverHeader>아이콘을 선택하세요.</PopoverHeader>
            <PopoverBody>
                <IconTable func={ e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].elements[index].icon = e;
                })) } handleClose={() => handleClose(index)}/>
            </PopoverBody>
        </PopoverContent>
        </Popover>
            
        </>
        }
    </div> 
</div>
</ChakraProvider>
    )
}

export default Element
