import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn } from '@/components';
import { DatePicker, Flex, GetProp, Image, Input, Select, Upload, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Id, IValuesForm } from '../types';
import * as S from './styled';
import { addNotification } from '@/common';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import { UploadFile } from 'antd/lib';
import { dateFormatDayJs } from '@/common/utils/format';
import dayjs from 'dayjs';

export const LestTripTransferCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { transferCategories } = useTypedSelector((state) => state.letsTripTransferCategory);
  const { loading } = useTypedSelector((state) => state.letsTripTransfer);
  const { getAllLetsTripTransferCategory, createLetsTripTransfer } = useActions();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onFinish = ({
    nameEn,
    nameRu,
    nameUz,
    carCategoryId,
    pictures,
    pricePerKM,
    hourlyPrice,
    manufactureDate,
  }: IValuesForm) => {
    createLetsTripTransfer({
      callback() {
        addNotification('successfully added transfer');
        navigate(ROUTES.letsTripTransfer);
      },
      body: {
        name: { en: nameEn, ru: nameRu, uz: nameUz },
        carCategoryId,
        hourlyPrice: hourlyPrice * 100,
        pricePerKM: pricePerKM * 100,
        pictures: pictures.fileList
          .map((item: UploadFile) =>
            item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
          )
          .flat(Infinity),
        manufactureDate: dateFormatDayJs(manufactureDate),
      },
    });
  };

  const selectOptionTransferCategory = transferCategories?.map((category) => ({
    label: `${category.name.en} --> seats  ${category.seats}`,
    value: category.id,
  }));

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
    getAllLetsTripTransferCategory({ page: 0, size: 20, deleted: false });
  }, []);

  return (
    <BaseForm
      name="letsTripTransferCrateForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameEn"
            label={'name english'}
            rules={[{ required: true, message: 'name english is required?', type: 'string' }]}
          >
            <Input type="string" placeholder="Enter a english name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameRu"
            label={'name russian'}
            rules={[{ required: true, message: 'name russian is required?', type: 'string' }]}
          >
            <Input type="string" placeholder="Enter a russian name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameUz"
            label={'name uzbek'}
            rules={[{ required: true, message: 'name uzbek is required?', type: 'string' }]}
          >
            <Input type="string" placeholder="Enter a uzbek name ?" />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            name="carCategoryId"
            style={{ width: '100%' }}
            label={'transfer category'}
            rules={[{ required: true, message: 'transfer category is required!' }]}
          >
            <Select
              placeholder="Select transfer category?"
              options={selectOptionTransferCategory}
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="manufactureDate"
            label={'manufacture date'}
            rules={[{ required: true, message: 'manufacture date is required ?' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format={'YYYY-MM-DD'}
              disabledDate={(current) => current && current > dayjs().endOf('day')}
            />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="hourlyPrice"
            label={'hourly price'}
            rules={[{ required: true, message: 'hourly price is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              type="number"
              placeholder="Enter a hourly price ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="pricePerKM"
            label={'price per KM'}
            rules={[{ required: true, message: 'price per KM is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              type="number"
              placeholder="Enter a price per KM ?"
            />
          </BaseForm.Item>
        </Flex>
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
        <PrimaryBtn htmlType="submit" loading={loading.post}>
          Create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
