import React, {useContext} from 'react'
import empty from '../../../tools/img/empty.png'
import { MyContext } from '../../../pages/Make/MakePageV2'
import './Template2.css'

function Template2({content, contents, setContents}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    /*
    * 이미지
    */

    // 템플릿 2 이미지의 경우에는
    const onChangeImage = e => {
        let newContents = contents
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            newContents[state.secNum].attachment = result;
        }
        reader.readAsDataURL(oneFile);
        setContents(newContents);
    }

    return (
        <div className="template">
            <input className="template-image" type="file" accept="image/*" id="file" 
                onChange={ e => onChangeImage(e) } style={{width:`${content.width}%`}} />
            {content.attachment ?
            <>
                <img src={content.attachment} style={{width:`${content.width}%`}} />
            </>
            : 
            <>
                <img src={empty} style={{width:`${content.width}%`}} />
            </>
            }
        </div>
    )
}

export default Template2
