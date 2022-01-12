import React, {useState, useEffect, useContext} from 'react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyContext } from '../../../pages/Make/MakePageV2'
import EditDetailSection from './EditTemplates/EditDetailSection'
import EditCtaSection from './EditTemplates/EditCtaSection'
import EditHeroSection from './EditTemplates/EditHeroSection'
import EditReviewSection from './EditTemplates/EditReviewSection'
import EditFeaturesSection from './EditTemplates/EditFeaturesSection'
import EditMapSection from './EditTemplates/EditMapSection'
import EditPriceSection from './EditTemplates/EditPriceSection'
import EditTopBar from './tools/EditTopBar'
import AddingSection from './AddingSection'
import './NewSectionMake.css'

function NewSectionMake({content}) {
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
                    <EditHeroSection content={content} category={category}/>
                )

            // 리뷰들인 경우 편집화면
            case 'ReviewSection':
                return(
                    <EditReviewSection content={content} category={category}/>
                )
            
            case 'FeaturesSection':
                return(
                    <EditFeaturesSection content={content} category={category}/>

                )

            case 'MapSection':
                return(
                    <EditMapSection content={content} category={category}/>
                )

            case 'CtaSection':
                return(
                    <EditCtaSection content={content} category={category}/>
                )

            case 'PriceSection':
                return(
                    <EditPriceSection content={content} category={category}/>
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
