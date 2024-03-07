import { useThemeDetector } from '@/common/hooks';
import { GlobalStyles, antTheme } from '@/common/styles';
import { ConfigProvider, Modal, message as antMessage } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { HookAPI } from 'antd/es/modal/useModal';
import { PropsWithChildren } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

let modal: HookAPI;
let message: MessageInstance;

antMessage.config({
  top: 100,
  duration: 3,
  maxCount: 3,
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useThemeDetector();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = antMessage.useMessage();

  modal = modalApi;
  message = messageApi;

  const getRootElement = () => {
    return document.getElementById('root');
  };

  const getPopupContainer = (triggerNode?: HTMLElement) => {
    return (
      (triggerNode?.closest('.ant-modal-content') as HTMLElement) ||
      (getRootElement() as HTMLElement)
    );
  };

  return (
    <StyledProvider theme={{}}>
      <GlobalStyles />

      <ConfigProvider
        csp={{ nonce: 'service-agent-arm' }}
        componentSize="large"
        getPopupContainer={getPopupContainer}
        theme={antTheme(theme)}
      >
        {modalContextHolder}
        {messageContextHolder}

        {children}
      </ConfigProvider>
    </StyledProvider>
  );
};

export { message, modal };
