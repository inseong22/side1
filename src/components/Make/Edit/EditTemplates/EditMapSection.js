import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import { mapSectionTemplateList } from './InnerTemplates'
import TemplateChoose from '../tools/TemplateChoose'

function EditMapSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div className="section-make__inner-container">
                        {state.secNum}번째 섹션이고 지도 입니다.
                    </div>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
                    <>
                        <TemplateChoose content={content} title="디테일" list={mapSectionTemplateList} />
                    </>
                )

            default:
                <></>
        }
    }


    return(
        <>
            {returnTable()}
        </>
    )
}

export default EditMapSection