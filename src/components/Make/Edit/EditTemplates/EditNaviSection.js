import React from 'react'

function EditNaviSection({navi, setNavi}) {

    const changeNaviTemplate = num => {
        let newNavi = JSON.parse(JSON.stringify(navi))
        newNavi.sectionTemplateNumber = num
        setNavi(newNavi);
    }

    return (
        <div>
            <div>
                네비게이션 수정
            </div>
            <div>
                <span onClick={() => changeNaviTemplate(1)}>
                    템플릿 1
                </span>
                <span onClick={() => changeNaviTemplate(2)}>
                    템플릿 2
                </span>
            </div>
        </div>
    )
}

export default EditNaviSection
