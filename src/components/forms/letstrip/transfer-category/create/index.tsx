import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn } from '@/components';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import { Col, GetProp, Image, Input, Row, Upload, UploadProps } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IValuesForm } from '../types';
import { UploadFile } from 'antd/lib';
import { Id } from '../../transfer/types';

export const LestTripTransferCategoryCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { loading } = useTypedSelector((state) => state.letsTripTransferCategory);
  const { createLetsTripTransferCategory } = useActions();
  const navigate = useNavigate();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onFinish = ({
    nameEn,
    nameRu,
    nameUz,
    startingPrice,
    seats,
    luggage,
    priority,
    image,
  }: IValuesForm) => {
    createLetsTripTransferCategory({
      callback() {
        addNotification('successfully added transfer category');
        navigate(ROUTES.letsTripTransferCategory);
      },
      body: {
        name: { en: nameEn, ru: nameRu, uz: nameUz },
        startingPrice: startingPrice * 100,
        luggage,
        seats,
        priority,
        image: image.fileList
          .map((item: UploadFile) =>
            item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
          )
          .flat(Infinity)[0],
      },
    });
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
      name="letsTripTransferCategoryCrateForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <Row gutter={12}>
        <Col span={8}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameEn"
            label={'name english'}
            rules={[{ required: true, message: 'name english is required?', type: 'string' }]}
          >
            <Input type="string" placeholder="Enter a english name ?" />
          </BaseForm.Item>
        </Col>
        <Col span={8}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameRu"
            label={'name russian'}
            rules={[{ required: true, message: 'name russian is required?', type: 'string' }]}
          >
            <Input type="string" placeholder="Enter a russian name ?" />
          </BaseForm.Item>
        </Col>
        <Col span={8}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameUz"
            label={'name uzbek'}
            rules={[{ required: true, message: 'name uzbek is required?', type: 'string' }]}
          >
            <Input type="string" placeholder="Enter a uzbek name ?" />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="startingPrice"
            label={'starting price'}
            rules={[{ required: true, message: 'starting price is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              type="number"
              placeholder="Enter a starting price ?"
            />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="seats"
            label={'seats'}
            rules={[{ required: true, message: 'seats is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              type="number"
              placeholder="Enter a seats ?"
            />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="luggage"
            label={'luggage'}
            rules={[{ required: true, message: 'luggage is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              type="number"
              placeholder="Enter a luggage ?"
            />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priority"
            label={'priority'}
            rules={[{ required: true, message: 'priority is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              type="number"
              placeholder="Enter a priority ?"
            />
          </BaseForm.Item>
        </Col>
        <Col span={24}>
          <BaseForm.Item
            name="image"
            label={'car category image'}
            rules={[
              { required: true, message: 'car category image is required?', type: 'object' },
              {
                validator: (_, value) => {
                  if (value.fileList.length > 1) {
                    return Promise.reject(new Error('Only one image is allowed'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Upload.Dragger
              style={{ width: '100%' }}
              name="files"
              multiple={false}
              listType="picture"
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
        </Col>
      </Row>
      <PrimaryBtn htmlType="submit" loading={loading.post}>
        Create
      </PrimaryBtn>
    </BaseForm>
  );
};
