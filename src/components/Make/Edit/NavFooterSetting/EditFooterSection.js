import React from 'react'

function EditFooterSection({foot, setFoot}) {

    const changeFooterTemplate = num => {
        let newNavi = JSON.parse(JSON.stringify(foot))
        newNavi.sectionTemplateNumber = num
        setFoot(newNavi);
    }

    return (
        <div>
            <div>
                푸터 수정
            </div>
            <div>
                <span onClick={() => changeFooterTemplate(1)}>
                    템플릿 1
                </span>
                <span onClick={() => changeFooterTemplate(2)}>
                    템플릿 2
                </span>
            </div>
        </div>
    )
}

export default EditFooterSection
