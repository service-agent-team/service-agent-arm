import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, Upload as FileUppload, PrimaryBtn, message } from '@/components';
import { useActions, useTypedSelector } from '@/hooks';
import { UploadOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Input, Modal } from 'antd';
import Upload from 'antd/es/upload';
import { useState } from 'react';
import * as S from '../users-form/styled';

export const PHOTO_SIZE_LIMIT = 5 * 1024 * 1024;
export const VALID_MIME_TYPES = 'image/png, image/jpeg, image/jpg';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const CarModelForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [form] = BaseForm.useForm();
  const { CreateCarModel } = useActions();

  const { loading } = useTypedSelector((state) => state.carType);

  const onFinish = (value: { name: string; imageGroupId: string; attributes: any }) => {
    if (type === 'create') {
      CreateCarModel({
        data: value,
        callback() {
          addNotification('created');
        },
      });
    } else {
      // UpdateCarModel({
      //   body: value,
      //   callback(data: any) {
      //     if (data) addNotification('created');
      //   },
      // });
    }
    form.resetFields();
    history.back();
  };
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
    if (!VALID_MIME_TYPES.includes(file.type) || file.size > PHOTO_SIZE_LIMIT) {
      message.error({
        content: 'Image size must be max 5mb',
        duration: 3,
      });

      return Upload.LIST_IGNORE;
    }

    return false;
  };

  return (
    <>
      <BaseForm name="carModelForm" form={form} layout="vertical" onFinish={onFinish}>
        <BaseForm.Item
          name={'images'}
          label={'set image to car model'}
          hasFeedback
          rules={[{ required: true, message: 'images is required ?' }]}
        >
          <FileUppload
            multiple
            name="image"
            listType="picture-card"
            maxCount={3}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={handleBeforeUpload}
          >
            <UploadOutlined />
          </FileUppload>
        </BaseForm.Item>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <S.FormContent>
          <BaseForm.Item
            name="name"
            label={'Car model name'}
            hasFeedback
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter car model name ?" />
          </BaseForm.Item>

          <BaseForm.Item
            name="imageGroupId"
            label={'imageGroupId'}
            hasFeedback
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter car model imageGroupId ?" />
          </BaseForm.Item>

          <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.patch : loading.post}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </S.FormContent>
      </BaseForm>
    </>
  );
};
