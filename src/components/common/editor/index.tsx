import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react';
import { FC } from 'react';
import { SunEditorReactProps } from 'suneditor-react/dist/types/SunEditorReactProps';
import { DarkModeWrapper } from './styled'; // Adjust the import path as needed
import { useTypedSelector } from '@/common/hooks';
import { ETheme } from '@/store/app/types';
import { FilesService } from '@/services';
import { UploadBeforeHandler } from 'suneditor-react/dist/types/upload';
import { addNotification } from '@/common';

export const TextEditor: FC<SunEditorReactProps> = (props) => {
  const { theme } = useTypedSelector((state) => state.app);
  const customImageUpload = async (
    file: File,
    info: object,
    uploadHandler: UploadBeforeHandler,
  ) => {
    const formData = new FormData();

    formData.append('image', file);

    // try {
    //   const response = await FilesService.create(formData);

    //   return response.ids[0].id;
    // } catch (error) {
    //   addNotification(error);
    // }
  };

  return theme === ETheme.DARK ? (
    <DarkModeWrapper>
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
          ],
          // imageUploadUrl: `${BASE_URL}/api/file`,
          // imageUploadHeader: customImageUpload,
        }}
        {...props}
        // onImageUpload={(e) => console.log('1', e)}
        // setDefaultStyle="font-family: Noto sans; font-size: 14px;"
      />
    </DarkModeWrapper>
  ) : (
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
          ['image'],
        ],
        // imageUploadHandler: customImageUpload,
        // imageUploadUrl: `${BASE_URL}/api/file`,
      }}
      // onImageUploadBefore={customImageUpload}
      {...props}
      // setDefaultStyle="font-family: Noto sans; font-size: 14px;"
    />
  );
};
