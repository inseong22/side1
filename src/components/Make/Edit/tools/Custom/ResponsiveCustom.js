import React from 'react'

function ResponsiveCustom({value, onChange}) {
    return (
        <div className="edit-element">
            <div className="edit-element__box">
                <div>
                    반응형
                </div>
                <div className="center-row">
                    <div>
                        PC
                    </div>
                    <div>
                        모바일
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveCustom
