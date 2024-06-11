import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, Icon, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate } from 'react-router-dom';
import { Id, IValuesForm } from './types';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import * as S from './styled';
import { Flex, GetProp, Image, Input, Upload, UploadProps } from 'antd';
import { UploadFile } from 'antd/lib';
import { useState } from 'react';

export const LetsTripCountryForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { loading } = useTypedSelector((state) => state.letsTripCountry);
  const { createLetsTripCountry } = useActions();
  const navigate = useNavigate();
  const { country } = useTypedSelector((state) => state.letsTripCountry);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onFinish = ({ code, nameEn, nameRu, imageUrl }: IValuesForm) => {
    if (type === 'create') {
      const name = { en: nameEn, ru: nameRu };
      createLetsTripCountry({
        code,
        name,
        imageUrl: imageUrl.fileList
          .map((item: UploadFile) =>
            item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
          )
          .flat(Infinity)[0],
        callback: () => {
          addNotification('lets trip country created');
          navigate(ROUTES.letsTripCountry);
        },
      });
    } else if (type === 'edit') {
      // updatePermission({
      //   id: Number(id),
      //   permissionName: value.permissionName,
      //   permissionDescription: value.permissionDescription,
      //   callback() {
      //     addNotification('successfully permission update !');
      //     navigate(ROUTES.permissions);
      //   },
      // });
    }
  };

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <BaseForm
      initialValues={
        type === 'edit'
          ? {
              code: country?.code,
              nameEn: country?.name,
              imageUrl: country?.imageUrl,
            }
          : {}
      }
      name="letsTripCountryForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <Flex gap={'15px'}>
          <BaseForm.Item
            name="nameEn"
            label={'name english'}
            style={{ width: '100%' }}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter name english ?" />
          </BaseForm.Item>
          <BaseForm.Item
            name="nameRu"
            label={'name russian'}
            style={{ width: '100%' }}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter name russian ?" />
          </BaseForm.Item>
        </Flex>
        <BaseForm.Item
          name="code"
          label={'country code'}
          style={{ width: '100%' }}
          rules={[{ required: true, message: 'filed is required' }]}
        >
          <Input placeholder="Enter country code ?" />
        </BaseForm.Item>
        <BaseForm.Item
          name="imageUrl"
          label={'imageUrl'}
          rules={[{ required: true, message: 'imageUrl is required?', type: 'object' }]}
        >
          <Upload.Dragger
            style={{ width: '100%' }}
            name="files"
            multiple={false}
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            beforeUpload={(file) => file.type.split('/')[0] === 'image'}
            action={`${BASE_URL}/api/file`}
          >
            <Icon fontSize="20" color="blue" name="InboxOutlined" />
            <div style={{ marginTop: 8 }}>Click or drag file to this area to upload</div>
            {previewImage && (
              <Image
                height={100}
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </Upload.Dragger>
        </BaseForm.Item>

        <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.put : loading.post}>
          {type === 'create' ? 'create' : 'edit'}
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
