import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn, TextArea } from '@/components';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import { Button, Flex, Image, Input, Select, Space, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMediaList, IValuesForm } from '../types';
import * as S from './styled';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';

export const LestTripTourCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { companies } = useTypedSelector((state) => state.company);
  const { loading, categories } = useTypedSelector((state) => state.letsTripTour);
  const { getCompany, createLetsTripTour, getAllCategory } = useActions();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onFinish = ({
    nameUz,
    nameRu,
    nameEn,
    categoryId,
    companyId,
    descriptionEn,
    descriptionRu,
    descriptionUz,
    countryCode,
    currency,
    longitude,
    latitude,
    upTo2,
    upTo6,
    upTo10,
    upTo20,
    attributes,
    pictures,
  }: IValuesForm) => {
    createLetsTripTour({
      callback() {
        addNotification('successfully added tour');
        navigate(ROUTES.letsTripTour);
      },
      names: { uz: nameEn, en: nameUz, ru: nameRu },
      categoryId,
      companyId,
      descriptions: { uz: descriptionEn, en: descriptionUz, ru: descriptionRu },
      upTo2,
      upTo6,
      upTo10,
      upTo20,
      pictures: pictures.fileList
        .map((item: UploadFile) =>
          item?.response?.mediaList?.map((file: IMediaList) => `${FILE_URL}/${file.id}`),
        )
        .flat(Infinity),
      currency,
      countryCode,
      longitude,
      latitude,
      attributes: { ...attributes },
    });
  };

  const selectOptionCategory = categories?.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  const selectOptionCompany = companies?.map((company) => ({
    label: company.name,
    value: company.id,
  }));
  const selectOptionCurrency = [
    {
      label: 'UZS',
      value: 'UZS',
    },
    {
      label: 'USD',
      value: 'USD',
    },
  ];
  const selectCountryCode = [
    { label: 'AE', value: 'AE' },
    { label: 'UZ', value: 'UZ' },
    { label: 'TR', value: 'TR' },
  ];

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

  useEffect(() => {
    getCompany({ page: 0, size: 20 });
    getAllCategory({ callback() {} });
  }, []);

  return (
    <BaseForm
      name="letsTripTourCreateForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameUz"
            label={'name uz'}
            rules={[
              { required: true, message: 'name uz is required?' },
              {
                type: 'string',
                message: 'Enter name uz name ?',
              },
            ]}
          >
            <Input name="nameUz" type="string" placeholder="Enter a uz name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameEn"
            label={'name en'}
            rules={[
              { required: true, message: 'name en is required?' },
              {
                type: 'string',
                message: 'Enter en name ?',
              },
            ]}
          >
            <Input name="nameEn" type="string" placeholder="Enter a en name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameRu"
            label={'name ru'}
            rules={[
              { required: true, message: 'name ru is required?' },
              {
                type: 'string',
                message: 'Enter ru name ?',
              },
            ]}
          >
            <Input name="nameRu" type="string" placeholder="Enter a ru name ? " />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            name="categoryId"
            style={{ width: '100%' }}
            label={'category'}
            rules={[{ required: true, message: 'category is required!' }]}
          >
            <Select placeholder="Select category?" options={selectOptionCategory} />
          </BaseForm.Item>
          <BaseForm.Item
            name="companyId"
            style={{ width: '100%' }}
            label={'company'}
            rules={[{ required: true, message: 'company is required!' }]}
          >
            <Select placeholder="Select company?" options={selectOptionCompany} />
          </BaseForm.Item>
          <BaseForm.Item
            name="currency"
            style={{ width: '100%' }}
            label={'currency'}
            rules={[{ required: true, message: 'currency is required!' }]}
          >
            <Select placeholder="Select currency?" options={selectOptionCurrency} />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="longitude"
            label={'longitude'}
            rules={[{ required: true, message: 'longitude is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="longitude"
              type="number"
              placeholder="Enter a longitude ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="latitude"
            label={'latitude'}
            rules={[{ required: true, message: 'latitude is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="latitude"
              type="number"
              placeholder="Enter a latitude ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="countryCode"
            label={'country code'}
            rules={[{ required: true, message: 'countryCode is required?' }]}
          >
            <Select placeholder="Select country code ?" options={selectCountryCode} />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="upTo2"
            label={'along with 2 person'}
            rules={[{ required: true, message: 'upTo2 is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="upTo2"
              type="number"
              placeholder="Enter along 2 person price ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="upTo6"
            label={'along with 6 person'}
            rules={[{ required: true, message: 'upTo6 is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="upTo6"
              type="number"
              placeholder="Enter along 6 person price ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="upTo10"
            label={'along with 10 person'}
            rules={[{ required: true, message: 'upTo10 is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="upTo10"
              type="number"
              placeholder="Enter along 10 person price ? "
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="upTo20"
            label={'along with 20 person'}
            rules={[{ required: true, message: 'upTo20 is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="upTo20"
              type="number"
              placeholder="Enter along 20 person price ? "
            />
          </BaseForm.Item>
        </Flex>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="descriptionUz"
          label={'description uz'}
          rules={[
            { required: true, message: 'description uz is required?' },
            {
              type: 'string',
              message: 'Enter uz description ?',
            },
          ]}
        >
          <TextArea name="descriptionUz" placeholder="Enter a uz description ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="descriptionEn"
          label={'description en'}
          rules={[
            { required: true, message: 'description en is required?' },
            {
              type: 'string',
              message: 'Enter en description ?',
            },
          ]}
        >
          <TextArea name="descriptionEn" placeholder="Enter a en description ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="descriptionRu"
          label={'description ru'}
          rules={[
            { required: true, message: 'description ru is required?' },
            {
              type: 'string',
              message: 'Enter ru description ?',
            },
          ]}
        >
          <TextArea name="descriptionRu" placeholder="Enter a ru description ? " />
        </BaseForm.Item>
        <BaseForm.Item
          name="pictures"
          label={'pictures'}
          rules={[{ required: true, message: 'pictures is required?', type: 'object' }]}
        >
          <Upload.Dragger
            style={{ width: '100%' }}
            name="files"
            multiple={true}
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            action={`${BASE_URL}/file`}
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
        <BaseForm.List name="attributes">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <BaseForm.Item
                    {...restField}
                    name={[name, 'key']}
                    rules={[{ required: true, message: 'Missing key' }]}
                  >
                    <Input placeholder={`Additional property key ${key + 1}`} />
                  </BaseForm.Item>
                  <BaseForm.Item
                    {...restField}
                    name={[name, 'value']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <Input placeholder={`Additional property value ${key + 1}`} />
                  </BaseForm.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <BaseForm.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </BaseForm.Item>
            </>
          )}
        </BaseForm.List>
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
