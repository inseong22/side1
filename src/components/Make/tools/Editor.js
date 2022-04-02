import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from "@ckeditor/ckeditor5-editor-inline/src/inlineeditor";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import Link from "@ckeditor/ckeditor5-link/src/link";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Font from "@ckeditor/ckeditor5-font/src/font";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily";
import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
// import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import './Editor.css'

const FONTCOLOR = {
  columns:4,
  documentColors:4,
  colors:[
    {
      color: '#000000',
      label: '검정'
    },
    {
      color: '#9B9A97',
      label: '회색'
    },
    {
      color: '#64473A',
      label: '갈색',
    },
    {
      color: '#D9730D',
      label: '주황'
    },
    {
      color: '#DFAB01',
      label: '노랑'
    },
    {
      color: '#0F7B6C',
      label: '초록'
    },
    {
      color: '#0B6E99',
      label: '파랑'
    },
    {
      color: '#6940A5',
      label: '보라'
    },
    {
      color: '#AD1A72',
      label: '분홍'
    },
    {
      color: '#E03E3E',
      label: '빨강'
    },
    {
      color: '#FFFFFF',
      label: '하양',
      hasBorder: true
    }
]}

const FONTBACKGROUNDCOLOR = {
  columns:4,
  documentColors:4,
  colors:[
    {
      color: '#FFFFFF',
      label: '하양'
    },
    {
      color: '#EBECED',
      label: '연회색'
    },
    {
      color: '#E9E5E3',
      label: '갈색',
    },
    {
      color: '#FAEBDD',
      label: '주황'
    },
    {
      color: '#FBF3DB',
      label: '노랑'
    },
    {
      color: '#DDEDEA',
      label: '연초록'
    },
    {
      color: '#DDEBF1',
      label: '파랑'
    },
    {
      color: '#EAE4F2',
      label: '보라'
    },
    {
      color: '#F4DFEB',
      label: '분홍'
    },
    {
      color: '#FBE4E4',
      label: '빨강'
    }
]}

const FONTSIZE = {
  options: [
    0.2,
    0.4,
    0.6,
    0.8,
    0.9,
    'default',
    1.1,
    1.2,
    1.4,
    1.6,
    1.8,
    2.0,
  ],
}

const ALIGNMENT = {
  options: ["justify", "left", "center", "right"],
}

const Editor = (props) => {
    return (
        <div className="ckeditor-container">
        <CKEditor
        onInit={(editor) => {
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
        }}
        config={{
            language: {ui: 'ko', content: "ko"},
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Font,
            List,
            Link,
            PasteFromOffice,
            TextTransformation
          ],
          toolbar: props.toolbar
            ? props.toolbar
            : {
              shouldNotGroupWhenFull:true,
              items:[
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "|",
                "fontSize",
                "fontColor",
                "fontBackgroundColor",
                "link",
              ]},
          fontColor:FONTCOLOR,
          fontBackgroundColor:FONTBACKGROUNDCOLOR,
          fontSize: FONTSIZE,
          alignment: ALIGNMENT,
          typing: {
            transformations: {
              remove: [
                "enDash",
                "emDash",
                "oneHalf",
                "oneThird",
                "twoThirds",
                "oneForth",
                "threeQuarters",
              ],
            },
          },
        }}
        editor={InlineEditor}
        {...props}
        placeholder={props.placeholder}
        />
        </div>
    )
}

export const ButtonEditor =(props) => {
  return (
      <div className="ckeditor-container">
      <CKEditor
      onInit={(editor) => {
        editor.ui
          .getEditableElement()
          .parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
      }}
      config={{
          language: {ui: 'ko', content: "ko"},
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Font,
          List,
          Link,
          PasteFromOffice,
          TextTransformation
        ],
        toolbar: props.toolbar
          ? props.toolbar
          : {
            shouldNotGroupWhenFull:true,
            items:[
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "|",
              "fontSize",
              "fontColor",
              "fontBackgroundColor",
            ]},
        fontColor:FONTCOLOR,
        fontBackgroundColor:FONTBACKGROUNDCOLOR,
        fontSize: FONTSIZE,
        typing: {
          transformations: {
            remove: [
              "enDash",
              "emDash",
              "oneHalf",
              "oneThird",
              "twoThirds",
              "oneForth",
              "threeQuarters",
            ],
          },
        },
      }}
      editor={InlineEditor}
      {...props}
      placeholder={props.placeholder}
      />
      </div>
  )
}

export default Editor
