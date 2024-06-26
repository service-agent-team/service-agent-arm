import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import * as S from './styled';
import { Col, Row } from 'antd';
import { useActions, useTypedSelector } from '@/common/hooks';

export const TextEditor: React.FC<{ onSubmit(): void }> = ({ onSubmit }) => {
  const { setContent } = useActions();
  const { content } = useTypedSelector((state) => state.app);

  return (
    <Row gutter={[0, 12]}>
      <Col span={24}>
        <SunEditor
          height="200px"
          setAllPlugins={true}
          placeholder="Please type here..."
          setOptions={{
            buttonList: buttonList.complex,
            // imageUploadUrl: '',
          }}
          setDefaultStyle="font-family: Noto sans; font-size: 14px;"
          onChange={(content) => setContent(content)}
          setContents={content}
          autoFocus
        />
      </Col>
      <Col span={24}>
        <S.SubmitButton type="primary" onClick={onSubmit}>
          Submit
        </S.SubmitButton>
      </Col>
    </Row>
  );
};
