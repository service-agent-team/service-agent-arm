import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn } from '@/components';
import {
  Button,
  DatePicker,
  Flex,
  GetProp,
  Image,
  Input,
  Select,
  Space,
  Upload,
  UploadProps,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Id, IValuesForm } from '../types';
import * as S from './styled';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addNotification } from '@/common';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import { UploadFile } from 'antd/lib';
import { dateFormatDayJs } from '@/common/utils/format';
import dayjs from 'dayjs';

export const LestTripTransferCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { companies } = useTypedSelector((state) => state.company);
  const { loading } = useTypedSelector((state) => state.letsTripTransfer);
  const { categories } = useTypedSelector((state) => state.letsTripCategory);
  const { getCompany, getAllLetsTripCategory, createLetsTripTransfer } = useActions();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [date, setDate] = useState('');

  const onFinish = ({
    name,
    categoryId,
    companyId,
    hourly,
    transfer,
    mediaLinks,
    currency,
    attributes,
    countryCode,
  }: IValuesForm) => {
    let newAttributes: { [key: string]: any } = {};
    attributes.forEach((el: any) => {
      for (let value in el) {
        newAttributes[value] = el[value];
      }
    });

    createLetsTripTransfer({
      callback() {
        addNotification('successfully added transfer');
        navigate(ROUTES.letsTripTransfer);
      },
      name,
      categoryId,
      companyId,
      hourly,
      transfer,
      // mediaLinks: ['https://files.coreteam.uz/api/v1/media/open/287'],
      mediaLinks: mediaLinks.fileList
        .map((item: UploadFile) => item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`))
        .flat(Infinity),
      currency,
      releaseDate: dateFormatDayJs(date),
      attributes: newAttributes,
      countryCode,
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
    getAllLetsTripCategory({ page: 0, size: 30, callback() {} });
  }, []);

  return (
    <BaseForm
      name="letsTripTransferForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="name"
            label={'name'}
            rules={[{ required: true, message: 'name is required?' }]}
          >
            <Input name="name" type="string" placeholder="Enter a name ?" />
          </BaseForm.Item>
          <BaseForm.Item style={{ width: '100%' }} name="releaseDate" label={'release date'}>
            <S.Block>
              <DatePicker
                format={'YYYY-MM-DD'}
                onChange={(date) => setDate(date.toString())}
                disabledDate={(current) => current && current > dayjs().endOf('day')}
              />
            </S.Block>
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
            name="hourly"
            label={'hourly'}
            rules={[{ required: true, message: 'hourly is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="hourly"
              type="number"
              placeholder="Enter a hourly ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="transfer"
            label={'transfer'}
            rules={[{ required: true, message: 'transfer is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="transfer"
              type="number"
              placeholder="Enter a transfer ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="countryCode"
            label={'country code'}
            rules={[{ required: true, message: 'country code is required?' }]}
          >
            <Select placeholder="Select country?" options={selectCountryCode} />
          </BaseForm.Item>
        </Flex>
        <BaseForm.Item
          name="mediaLinks"
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
            beforeUpload={(file) => file.type.split('/')[0] === 'image'}
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
                    name={[name, 'key' + key]}
                    rules={[{ required: true, message: 'Missing title' }]}
                  >
                    <Input placeholder={`Additional property title ${key + 1}`} />
                  </BaseForm.Item>
                  <BaseForm.Item
                    {...restField}
                    name={[name, 'value' + key]}
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
