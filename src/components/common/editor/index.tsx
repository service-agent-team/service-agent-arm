import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react';
import { FC } from 'react';
import { SunEditorReactProps } from 'suneditor-react/dist/types/SunEditorReactProps';

export const TextEditor: FC<SunEditorReactProps> = (props) => {
  return (
    <SunEditor
      setAllPlugins={true}
      placeholder={'Please input here ...'}
      setOptions={{
        buttonList: [
          ['undo', 'redo'],
          ['font', 'fontSize', 'formatBlock'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor', 'textStyle'],
          ['removeFormat'],
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          ['preview', 'fullScreen'],
          // ['image'],
        ],
      }}
      {...props}
    />
  );
};
