import React, {useState} from 'react'
import EditTopBar from '../tools/EditTopBar'

function EditNaviSection({navi, setNavi}) {
    const [category, setCategory] = useState(0);

    const changeNaviTemplate = num => {
        let newNavi = JSON.parse(JSON.stringify(navi))
        newNavi.sectionTemplateNumber = num
        setNavi(newNavi);
    }

    return (
        <div>
            <EditTopBar category={category} setCategory={setCategory} />
            { category === 0 ? 
            <>
                <div>
                    네비게이션 수정
                </div>
            </>
            : 
            <>
            <div className="templates__inner-container">
                <span className="templates-radio" onClick={() => changeNaviTemplate(1)}>
                    템플릿 1
                </span>
                <span className="templates-radio" onClick={() => changeNaviTemplate(2)}>
                    템플릿 2
                </span>
                <span className="templates-radio" onClick={() => changeNaviTemplate(3)}>
                    템플릿 3
                </span>
            </div>
            </>
            }
        </div>
    )
}

export default EditNaviSection
