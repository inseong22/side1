import React from 'react'
import main from '../../../../tools/img/addSection/main.png'
import app from '../../../../tools/img/addSection/app.png'
import apply from '../../../../tools/img/addSection/apply.png'
import cta from '../../../../tools/img/addSection/cta.png'
import faq from '../../../../tools/img/addSection/faq.png'
import gallery from '../../../../tools/img/addSection/gallery.png'
import review from '../../../../tools/img/addSection/review.png'
import mock from '../../../../tools/img/addSection/mock.png'
import text from '../../../../tools/img/addSection/text.png'
import video from '../../../../tools/img/addSection/video.png'
import detail from '../../../../tools/img/addSection/detail.png'
import feature from '../../../../tools/img/addSection/feature.png'

import styled from "styled-components";

const ICON = styled('img')`
    width:22px;
    margin-right:8px;
`

export const sectionIcons = [
    {
        sectionTypeName : 'HeroSection',
        icon : <ICON src={main} />
    },
    {
        sectionTypeName:'DetailSection',
        icon : <ICON src={detail} />
    },
    {
        sectionTypeName:'CtaSection',
        icon : <ICON src={cta} />
    },
    {
        sectionTypeName:'ApplySection',
        icon : <ICON src={apply} />
    },
    {
        sectionTypeName:'AppDownloadSection',
        icon : <ICON src={app} />
    },
    {
        sectionTypeName:'FeaturesSection',
        icon : <ICON src={feature} />
    },
    {
        sectionTypeName:'QnaSection',
        icon : <ICON src={faq} />
    },
    {
        sectionTypeName:'TextSection',
        icon : <ICON src={text} />
    },
    {
        sectionTypeName:'GallerySection',
        icon : <ICON src={gallery} />
    },
    {
        sectionTypeName:'VideoSection',
        icon : <ICON src={video} />
    },
    {
        sectionTypeName:'MockupSection',
        icon : <ICON src={mock} />
    },
    {
        sectionTypeName : 'ReviewSection',
        icon : <ICON src={review} />
    },
]

function ContentsIcons() {
    return (
        <div>
            
        </div>
    )
}

export default ContentsIcons