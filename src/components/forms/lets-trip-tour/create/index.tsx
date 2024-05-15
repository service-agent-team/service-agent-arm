import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn, TextArea } from '@/components';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import {
  Button,
  Card,
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
import { UploadFile } from 'antd/lib';
import { dateFormatDayJs, generateUTC } from '@/common/utils/format';

export const LestTripTourCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { countries } = useTypedSelector((state) => state.letsTripCountry);
  const {
    loading: { post },
    errors,
  } = useTypedSelector((state) => state.letsTripTour);
  const { createLetsTripGroupTour, getAllLetsTripCountry } = useActions();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onFinish = ({
    nameEn,
    nameRu,
    countryId,
    startingPrice,
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
    availablePrice,
    transferTypeEn,
    transferTypeRu,
    transferDate,
    extraInformation,
    itineraryTitleEn,
    itineraryTitleRu,
    itineraryDescEn,
    itineraryDescRu,
    itineraryImgUrl,
    itineraryHour,
    itineraryItemOrder,
  }: IValuesForm) => {
    createLetsTripGroupTour({
      callback() {
        addNotification('successfully added tour');
        navigate(ROUTES.letsTripGroupTour);
      },
      name: { en: nameEn, ru: nameRu },
      countryId,
      description: [{ ru: descriptionRu, en: descriptionEn }],
      images: images.fileList
        .map((item: UploadFile) => item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`))
        .flat(Infinity),
      locations: [
        {
          lat: latitude,
          lng: longitude,
        },
      ],
      availableDate: [
        {
          month: +generateUTC(availableMonth).split('-')[1],
          year: +generateUTC(availableYear).split('-')[0],
          departures: [
            {
              price: availablePrice,
              transferType: {
                en: transferTypeEn,
                ru: transferTypeRu,
              },
              startDate: dateFormatDayJs(transferDate[0]),
              endDate: dateFormatDayJs(transferDate[1]),
            },
          ],
        },
      ],
      extraInformation: { en: extraInformation[0].en, ru: extraInformation[0].ru },
      startingPrice,
      priceNote: {
        en: priceNoteEn,
        ru: priceNoteRu,
      },
      priceNotIncludes: {
        en: [priceNotIncludeEn],
        ru: [priceNotIncludeRu],
      },
      priceIncludes: {
        en: [priceIncludeEn],
        ru: [priceIncludeRu],
      },
      tourItenarary: [
        {
          title: {
            en: itineraryTitleEn,
            ru: itineraryTitleRu,
          },
          description: [
            {
              items: [
                {
                  en: itineraryDescEn,
                  ru: itineraryDescRu,
                },
              ],
              item_order: itineraryItemOrder,
              hour: itineraryHour,
            },
          ],
          item_order: itineraryItemOrder,
          imageUrl: itineraryImgUrl.fileList
            .map((item: UploadFile) =>
              item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
            )
            .flat(Infinity)[0],
        },
      ],
    });
  };

  const selectOptionCountry = countries?.map((el) => ({
    label: el.name ? el.name : el.code,
    value: el.id,
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

  const handleChange2: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList2(newFileList);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handlePreview2 = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  useEffect(() => {
    getAllLetsTripCountry({ callback() {}, page: 0, size: 100 });
    if (errors) addNotification(errors);
  }, [errors]);

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
            label={'name english'}
            rules={[
              { required: true, message: 'name english is required?' },
              {
                type: 'string',
                message: 'Enter english name ?',
              },
            ]}
          >
            <Input name="nameEn" type="string" placeholder="Enter a english name ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="nameRu"
            label={'name russian'}
            rules={[
              { required: true, message: 'name russian is required?' },
              {
                type: 'string',
                message: 'Enter russian name ?',
              },
            ]}
          >
            <Input name="nameRu" type="string" placeholder="Enter a russian name ? " />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceNoteRu"
            label={'price note russian'}
            rules={[
              { required: true, message: 'price note russian is required?' },
              {
                type: 'string',
                message: 'Enter price note russian ?',
              },
            ]}
          >
            <Input name="priceNoteRu" type="string" placeholder="Enter a price note russian  ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceNoteEn"
            label={'price note english'}
            rules={[
              { required: true, message: 'price note english is required?' },
              {
                type: 'string',
                message: 'Enter price note english ?',
              },
            ]}
          >
            <Input name="priceNoteEn" type="string" placeholder="Enter a price note english ?" />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="startingPrice"
            label={'starting price'}
            rules={[{ required: true, message: 'starting price is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="starting price"
              type="number"
              placeholder="Enter a starting price ?"
            />
          </BaseForm.Item>
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
            label={'select country'}
            rules={[{ required: true, message: 'country is required!' }]}
          >
            <Select placeholder="Select country?" options={selectOptionCountry} />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceIncludeRu"
            label={'price include russian'}
            rules={[
              { required: true, message: 'price include russian is required?' },
              {
                type: 'string',
                message: 'Enter price include russian ?',
              },
            ]}
          >
            <Input
              name="priceIncludeRu"
              type="string"
              placeholder="Enter a price include russian ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceIncludeEn"
            label={'price include english'}
            rules={[
              { required: true, message: 'price include english is required?' },
              {
                type: 'string',
                message: 'Enter price include english ?',
              },
            ]}
          >
            <Input
              name="priceIncludeEn"
              type="string"
              placeholder="Enter a price include english ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceNotIncludeRu"
            label={'price not include russian'}
            rules={[
              { required: true, message: 'price not include russian is required?' },
              {
                type: 'string',
                message: 'Enter price not include russian ?',
              },
            ]}
          >
            <Input
              name="priceNotIncludeRu"
              type="string"
              placeholder="Enter a price not include russian ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="priceNotIncludeEn"
            label={'price not include english'}
            rules={[
              { required: true, message: 'price not include english is required?' },
              {
                type: 'string',
                message: 'Enter price not include english ?',
              },
            ]}
          >
            <Input
              name="priceNotIncludeEn"
              type="string"
              placeholder="Enter a price not include english ?"
            />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="availablePrice"
            label={'available price'}
            rules={[
              { required: true, message: 'available price is required?' },
              {
                type: 'number',
                message: 'Enter available price ?',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              name="availablePrice"
              type="number"
              placeholder="Enter a available price ?"
            />
          </BaseForm.Item>
          <BaseForm.Item style={{ width: '100%' }} name="availableMonth" label={'available month'}>
            <DatePicker name="availableMonth" picker="month" style={{ width: '100%' }} />
          </BaseForm.Item>
          <BaseForm.Item style={{ width: '100%' }} name="availableYear" label={'available year'}>
            <DatePicker name="availableYear" picker="year" style={{ width: '100%' }} />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="transferDate"
            label={'transfer start end date'}
          >
            <DatePicker.RangePicker
              format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
              }}
            />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="transferTypeEn"
            label={'transfer type english'}
            rules={[
              { required: true, message: 'transfer type english is required?' },
              {
                type: 'string',
                message: 'Enter transfer type english ?',
              },
            ]}
          >
            <Input
              name="transferTypeEn"
              type="string"
              placeholder="Enter a transfer type english ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="transferTypeRu"
            label={'transfer type russian'}
            rules={[
              { required: true, message: 'transfer type russian is required?' },
              {
                type: 'string',
                message: 'Enter transfer type russian ?',
              },
            ]}
          >
            <Input
              name="transferTypeRu"
              type="string"
              placeholder="Enter a transfer type russian ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="itineraryTitleEn"
            label={'itinerary title english'}
            rules={[
              { required: true, message: 'itinerary title english is required?' },
              {
                type: 'string',
                message: 'Enter itinerary title english ?',
              },
            ]}
          >
            <Input
              name="itineraryTitleEn"
              type="string"
              placeholder="Enter a itinerary title english ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="itineraryTitleRu"
            label={'itinerary title russian'}
            rules={[
              { required: true, message: 'itinerary title russian is required?' },
              {
                type: 'string',
                message: 'Enter itinerary title russian ?',
              },
            ]}
          >
            <Input
              name="itineraryTitleRu"
              type="string"
              placeholder="Enter a itinerary title russian ?"
            />
          </BaseForm.Item>
        </Flex>
        <Flex gap={'15px'}>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="itineraryItemOrder"
            label={'itinerary item order'}
            rules={[{ required: true, message: 'itinerary item order is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="itineraryItemOrder"
              type="number"
              placeholder="Enter a itinerary item order ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="itineraryItemDescOrder"
            label={'itinerary item description order'}
            rules={[{ required: true, message: 'itinerary item order is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="itineraryItemDescOrder"
              type="number"
              placeholder="Enter a itinerary item description order ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="itineraryHour"
            label={'itinerary hour'}
            rules={[
              { required: true, message: 'itinerary hour is required?' },
              {
                type: 'string',
                message: 'Enter itinerary hour ?',
              },
            ]}
          >
            <Input name="itineraryHour" type="string" placeholder="Enter a itinerary hour ?" />
          </BaseForm.Item>
        </Flex>

        <BaseForm.Item
          style={{ width: '100%' }}
          name="itineraryDescEn"
          label={'itinerary description english'}
          rules={[
            { required: true, message: 'itinerary description english is required?' },
            {
              type: 'string',
              message: 'Enter a itinerary description english ?',
            },
          ]}
        >
          <TextArea name="itineraryDescEn" placeholder="Enter a itinerary description english ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="itineraryDescRu"
          label={'itinerary description russian'}
          rules={[
            { required: true, message: 'itinerary description russian is required?' },
            {
              type: 'string',
              message: 'Enter a itinerary description russian ?',
            },
          ]}
        >
          <TextArea name="itineraryDescRu" placeholder="Enter a itinerary description russian ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="descriptionEn"
          label={'description english'}
          rules={[
            { required: true, message: 'description english is required?' },
            {
              type: 'string',
              message: 'Enter english description ?',
            },
          ]}
        >
          <TextArea name="descriptionEn" placeholder="Enter a english description ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="descriptionRu"
          label={'description russian'}
          rules={[
            { required: true, message: 'description russian is required?' },
            {
              type: 'string',
              message: 'Enter russian description ?',
            },
          ]}
        >
          <TextArea name="descriptionRu" placeholder="Enter a russian description ? " />
        </BaseForm.Item>
        <BaseForm.Item
          name="images"
          label={'tour images'}
          rules={[{ required: true, message: 'tour images is required?', type: 'object' }]}
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
        <BaseForm.Item
          name="itineraryImgUrl"
          label={'itinerary image'}
          rules={[{ required: true, message: 'itinerary image is required?', type: 'object' }]}
        >
          <Upload.Dragger
            style={{ width: '100%' }}
            name="files"
            multiple={false}
            fileList={fileList2}
            onChange={handleChange2}
            onPreview={handlePreview2}
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
        <BaseForm.List name="extraInformation">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <>
                  <Card
                    size="small"
                    title="ENGLISH"
                    key={field.key}
                    extra={
                      <Icon
                        name="CloseOutlined"
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <BaseForm.Item
                      initialValue={'EN'}
                      label="Information"
                      name={[field.name, 'EN']}
                      rules={[{ required: true, message: 'field required' }]}
                    >
                      <Input />
                    </BaseForm.Item>
                    <BaseForm.Item
                      label="ENGLISH"
                      initialValue={{ EN: 'EN' }}
                      rules={[{ required: true, message: 'field required' }]}
                    >
                      <BaseForm.List name={[field.name, 'en']}>
                        {(subFields, subOpt) => (
                          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <BaseForm.Item
                                  noStyle
                                  name={[subField.name, 'title']}
                                  rules={[{ required: true, message: 'field required' }]}
                                >
                                  <Input placeholder="title" />
                                </BaseForm.Item>
                                <BaseForm.Item
                                  noStyle
                                  name={[subField.name, 'value']}
                                  rules={[{ required: true, message: 'field required' }]}
                                >
                                  <Input placeholder="value" />
                                </BaseForm.Item>
                                <Icon
                                  name="CloseOutlined"
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button type="dashed" onClick={() => subOpt.add()} block>
                              + Add Sub Item
                            </Button>
                          </div>
                        )}
                      </BaseForm.List>
                    </BaseForm.Item>
                  </Card>
                  <Card
                    size="small"
                    title="RUSSIAN"
                    key={field.key}
                    extra={
                      <Icon
                        name="CloseOutlined"
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <BaseForm.Item
                      initialValue={'RU'}
                      label="Information"
                      name={[field.name, 'RU']}
                      rules={[{ required: true, message: 'field required' }]}
                    >
                      <Input />
                    </BaseForm.Item>
                    <BaseForm.Item
                      label="RUSSIAN"
                      initialValue={{ RU: 'RU' }}
                      rules={[{ required: true, message: 'field required' }]}
                    >
                      <BaseForm.List name={[field.name, 'ru']}>
                        {(subFields, subOpt) => (
                          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <BaseForm.Item
                                  noStyle
                                  name={[subField.name, 'title']}
                                  rules={[{ required: true, message: 'field required' }]}
                                >
                                  <Input placeholder="title" />
                                </BaseForm.Item>
                                <BaseForm.Item
                                  noStyle
                                  name={[subField.name, 'value']}
                                  rules={[{ required: true, message: 'field required' }]}
                                >
                                  <Input placeholder="value" />
                                </BaseForm.Item>
                                <Icon
                                  name="CloseOutlined"
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button type="dashed" onClick={() => subOpt.add()} block>
                              + Add Sub Item
                            </Button>
                          </div>
                        )}
                      </BaseForm.List>
                    </BaseForm.Item>
                  </Card>
                </>
              ))}
              <BaseForm.Item>
                <Button
                  disabled={fields.length === 1}
                  type="dashed"
                  onClick={() => {
                    if (fields.length < 2) add();
                    return;
                  }}
                  block
                  icon={<Icon name="PlusOutlined" />}
                >
                  add extra information
                </Button>
              </BaseForm.Item>
            </div>
          )}
        </BaseForm.List>
        <PrimaryBtn htmlType="submit" loading={post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
