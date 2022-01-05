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
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Link from "@ckeditor/ckeditor5-link/src/link";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import './Editor.css'

const editorConfiguration = {
    plugins: [Essentials, Bold, Italic, Underline, Strikethrough, Alignment, Font, Base64UploadAdapter],
    toolbar: ["heading", "|", "bold", "italic", "underline", "strikethrough", "alignment", "fontSize"],
    alignment: {
      options: ["justify", "left", "center", "right"],
    },
    fontSize: {
        options: [
          14,
          15,
          19,
          'default',
          26,
          27,
          28,
          29,
          30,
        ],
      },
  };

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
          language: "ko",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Font,
            Alignment,
            List,
            Link,
            PasteFromOffice,
            Image,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            ImageResize,
            Base64UploadAdapter,
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
                "|",
                "alignment",
                "blockQuote",
                "|",
                "link",
                "insertTable",
                "imageUpload",
                "|",
                "undo",
                "redo",
              ]},
          fontColor:{
            columns:4,
            documentColors:4,
            colors:[
            {
              color: 'hsl(0, 0%, 0%)',
              label: '검정'
            },
            {
              color: 'hsl(0, 0%, 90%)',
              label: '연회색'
            },
            {
              color: 'hsl(0, 0%, 100%)',
              label: '흰색',
              hasBorder: true
            },
            {
              color: 'rgb(255,0,0)',
              label: '빨강'
            },
            {
              color: 'hsl(30, 75%, 60%)',
              label: '주황'
            },
            {
              color: 'hsl(60, 75%, 60%)',
              label: '노랑'
            },
            {
              color: 'hsl(90, 75%, 60%)',
              label: '연초록'
            },
            {
              color: 'hsl(120, 75%, 60%)',
              label: '초록'
            },
            {
              color: 'hsl(210, 75%, 60%)',
              label: '하늘'
            },
            {
              color: 'hsl(240, 75%, 60%)',
              label: '파랑'
            },
            {
              color: 'hsl(270, 75%, 60%)',
              label: '보라'
            }
          ]},
          fontBackgroundColor:{
            columns:4,
            documentColors:4,
            colors:[
            {
              color: 'hsl(0, 0%, 0%)',
              label: '검정'
            },
            {
              color: 'hsl(0, 0%, 90%)',
              label: '연회색'
            },
            {
              color: 'hsl(0, 0%, 100%)',
              label: '흰색',
              hasBorder: true
            },
            {
              color: 'rgb(255,0,0)',
              label: '빨강'
            },
            {
              color: 'hsl(30, 75%, 60%)',
              label: '주황'
            },
            {
              color: 'hsl(60, 75%, 60%)',
              label: '노랑'
            },
            {
              color: 'hsl(90, 75%, 60%)',
              label: '연초록'
            },
            {
              color: 'hsl(120, 75%, 60%)',
              label: '초록'
            },
            {
              color: 'hsl(210, 75%, 60%)',
              label: '하늘'
            },
            {
              color: 'hsl(240, 75%, 60%)',
              label: '파랑'
            },
            {
              color: 'hsl(270, 75%, 60%)',
              label: '보라'
            }
          ]},
          fontSize: {
            options: [
              14,
              15,
              16,
              17,
              18,
              19,
              'default',
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
            ],
          },
          alignment: {
            options: ["justify", "left", "center", "right"],
          },
          image: {
            resizeUnit: "px",
            toolbar: [
              "imageStyle:alignLeft",
              "imageStyle:full",
              "imageStyle:alignRight",
              "|",
              "imageTextAlternative",
            ],
            styles: ["full", "alignLeft", "alignRight"],
            type: ["JPEG", "JPG", "GIF", "PNG"],
          },
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
            />
        </div>
    )
}

export default Editor
