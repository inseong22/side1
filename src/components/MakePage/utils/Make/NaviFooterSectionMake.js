import React, {useContext} from 'react'
import { MyContext } from '../../MakePageV2'

function NaviFooterSectionMake({navi, setNavi, foot, setFoot}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const onChangeNaviTitle = e => {
        let newNavi = navi
        newNavi.title = e.currentTarget.value
        setNavi(newNavi);
    }

    if(state.secNum === 50){
        return (
            <div>
                <div>
                    네비
                </div>
                <div>
                    <input type="text" value={navi.title} onChange={e => onChangeNaviTitle(e)}/>
                </div>
            </div>
        )
    }else if(state.secNum === 51){
        return (
            <div>
                <div>
    
                </div>
            </div>
        )
    }
}

export default NaviFooterSectionMake
