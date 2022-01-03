import React, {useState, useEffect, useContext} from 'react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyContext } from '../../../pages/Make/MakePageV2'
import EditDetailSection from './EditTemplates/EditDetailSection'
import MakeTemplate2 from './EditTemplates/MakeTemplate2'
import MakeTemplate3 from './EditTemplates/MakeTemplate3'
import EditTopBar from './tools/EditTopBar'
import AddingSection from './AddingSection'
import EditNaviSection from './EditTemplates/EditNaviSection'
import EditFooterSection from './EditTemplates/EditFooterSection'
import lodash from 'lodash'
import './NewSectionMake.css'

function NewSectionMake({content, contents, setContents, navi, foot, setNavi, setFoot}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [category, setCategory] = useState(0);

    const sectionMakeTable = () => {

        switch(content.sectionTypeName){
            case 'DetailSection':
                return (
                    <EditDetailSection content={content} category={category}/>
                )

            // 이미지인 경우 편집화면
            case 'HeroSection':
                return (
                    <MakeTemplate2 content={content} category={category}/>
                )

            // 특징들인 경우 편집화면
            case 'ReviewSection':
                return(
                    <MakeTemplate3 content={content} category={category}/>
                )
            
            case 'FeaturesSection':
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 4번 - 특징들 입니다.
                        <img src={content.attachment} />
                    </div>
                )

            case 'MapSection':
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 5번 - 구분선 입니다.
                    </div>
                )

            case 'HorizontalSection':
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 5번 - 구분선 입니다.
                    </div>
                )

            default:
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 뭐지? 디폴트 값입니다.
                        <br/>
                    </div>
                )

        }
    }

    // 섹션을 추가하는 중이 아니라 수정하는 중일 때! == addingSectionAt이 1000일 때.
    if(state.addingSectionAt === 1000){
        return (
            <>
                <EditTopBar category={category} setCategory={setCategory} />
                {sectionMakeTable()}
            </>
        )
    }else{
        return(
            <>
                <AddingSection />
            </>
        )
    }
}

export default NewSectionMake
