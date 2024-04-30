import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn, TextArea } from '@/components';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
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
import { UploadFile } from 'antd/lib';

export const LestTripTourCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { countries } = useTypedSelector((state) => state.letsTripCountry);
  const { loading } = useTypedSelector((state) => state.letsTripTour);
  const { getCompany, createLetsTripGroupTour, getAllLetsTripCountry } = useActions();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onFinish = ({
    nameEn,
    nameRu,
    countryId,
    descriptionEn,
    descriptionRu,
    priceNoteEn,
    priceNoteRu,
    priceNotIncludeEn,
    priceNotIncludeRu,
    priceIncludeEn,
    priceIncludeRu,
    longitude,
    latitude,
    images,
    availableMonth,
    availableYear,
    transferPrice,
    transferTypeEn,
    transferTypeRu,
    transferDate,
    extraInformation,
    itineraryTitleEn,
    itineraryTitleRu,
    itineraryDescEn,
    itineraryDescRu,
    itineraryImgUrl,
  }: IValuesForm) => {
    createLetsTripGroupTour({
      callback() {
        addNotification('successfully added tour');
        navigate(ROUTES.letsTripTour);
      },
      name: { en: nameEn, ru: nameRu },
      countryId,
      description: [{ ru: descriptionRu, en: descriptionEn }],
      images: images.fileList
        .map((item: UploadFile) =>
          item?.response?.mediaList?.map((file: Id) => `${FILE_URL}/${file.id}`),
        )
        .flat(Infinity),
      locations: [
        {
          lat: latitude,
          lng: longitude,
        },
      ],
      availableDate: [
        {
          month: availableMonth,
          year: availableYear,
          departures: [
            {
              price: transferPrice,
              transferType: {
                en: transferTypeEn,
                ru: transferTypeRu,
              },
              startDate: transferDate,
              endDate: transferDate,
            },
          ],
        },
      ],
      extraInformation: { ...extraInformation },
      startingPrice: 0,
      priceNote: {
        en: priceNoteEn,
        ru: priceNoteRu,
      },
      priceNotIncludes: {
        en: priceNotIncludeEn,
        ru: priceNotIncludeRu,
      },
      priceIncludes: {
        en: priceIncludeEn,
        ru: priceIncludeRu,
      },
      tourItenarary: [
        {
          title: {
            en: itineraryTitleEn,
            ru: itineraryTitleRu,
          },
          description: [
            {
              en: itineraryDescEn,
              ru: itineraryDescRu,
            },
          ],
          imageUrl: itineraryImgUrl,
        },
      ],
    });
  };

  const selectOptionCountry = countries?.map((el) => ({
    value: el.name,
    label: el.name ? el.name : el.code,
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
    getCompany({ page: 0, size: 20 });
    getAllLetsTripCountry({ callback() {}, page: 0, size: 100 });
  }, []);

  return (
    <BaseForm
      name="letsTripGroupTourForm"
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
            style={{ width: '100%' }}
            name="priceNoteRu"
            label={'priceNoteRu'}
            rules={[
              { required: true, message: 'priceNoteRu is required?' },
              {
                type: 'string',
                message: 'Enter priceNoteRu ?',
              },
            ]}
          >
            <Input name="priceNoteRu" type="string" placeholder="Enter a priceNoteRu ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceNoteEn"
            label={'priceNoteEn'}
            rules={[
              { required: true, message: 'priceNoteEn is required?' },
              {
                type: 'string',
                message: 'Enter priceNoteEn ?',
              },
            ]}
          >
            <Input name="priceNoteEn" type="string" placeholder="Enter a priceNoteEn ?" />
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
            name="countryId"
            style={{ width: '100%' }}
            label={'country'}
            rules={[{ required: true, message: 'country is required!' }]}
          >
            <Select placeholder="Select country?" options={selectOptionCountry} />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceIncludeRu"
            label={'priceIncludeRu'}
            rules={[
              { required: true, message: 'priceIncludeRu is required?' },
              {
                type: 'string',
                message: 'Enter priceIncludeRu ?',
              },
            ]}
          >
            <Input name="priceIncludeRu" type="string" placeholder="Enter a priceIncludeRu ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceIncludeEn"
            label={'priceIncludeEn'}
            rules={[
              { required: true, message: 'priceIncludeEn is required?' },
              {
                type: 'string',
                message: 'Enter priceIncludeEn ?',
              },
            ]}
          >
            <Input name="priceIncludeEn" type="string" placeholder="Enter a priceIncludeEn ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceNotIncludeRu"
            label={'priceNotIncludeRu'}
            rules={[
              { required: true, message: 'priceNotIncludeRu is required?' },
              {
                type: 'string',
                message: 'Enter priceNotIncludeRu ?',
              },
            ]}
          >
            <Input
              name="priceNotIncludeRu"
              type="string"
              placeholder="Enter a priceNotIncludeRu ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceNotIncludeEn"
            label={'priceNotIncludeEn'}
            rules={[
              { required: true, message: 'priceNotIncludeEn is required?' },
              {
                type: 'string',
                message: 'Enter priceNotIncludeEn ?',
              },
            ]}
          >
            <Input
              name="priceNotIncludeEn"
              type="string"
              placeholder="Enter a priceNotIncludeEn ?"
            />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="availablePrice"
            label={'availablePrice'}
            rules={[
              { required: true, message: 'availablePrice is required?' },
              {
                type: 'number',
                message: 'Enter availablePrice ?',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              name="availablePrice"
              type="number"
              placeholder="Enter a availablePrice ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="availableMonth"
            label={'availableMonth'}
            rules={[
              { required: false, message: 'availableMonth is required?' },
              {
                type: 'string',
                message: 'Enter availableMonth ?',
              },
            ]}
          >
            <DatePicker name="availableMonth" picker="month" style={{ width: '100%' }} />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="availableYear"
            label={'availableYear'}
            rules={[
              { required: false, message: 'availableYear is required?' },
              {
                type: 'string',
                message: 'Enter availableYear ?',
              },
            ]}
          >
            <DatePicker name="availableYear" picker="year" style={{ width: '100%' }} />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="transferDate"
            label={'transferStartEndDate'}
            rules={[
              { required: false, message: 'transferDate is required?' },
              {
                type: 'string',
                message: 'Enter transferDate ?',
              },
            ]}
          >
            <DatePicker.RangePicker name="transferDate" type="number" style={{ width: '100%' }} />
          </BaseForm.Item>
        </Flex>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="itineraryDescEn"
          label={'itineraryDescEn'}
          rules={[
            { required: true, message: 'itineraryDescEn is required?' },
            {
              type: 'string',
              message: 'Enter a itineraryDescEn ?',
            },
          ]}
        >
          <TextArea name="itineraryDescEn" placeholder="Enter a itineraryDescEn ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="itineraryDescRu"
          label={'itineraryDescRu'}
          rules={[
            { required: true, message: 'itineraryDescRu is required?' },
            {
              type: 'string',
              message: 'Enter a itineraryDescRu ?',
            },
          ]}
        >
          <TextArea name="itineraryDescRu" placeholder="Enter a itineraryDescRu ?" />
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
