import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn, TextArea } from '@/components';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
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
import { Id, IGoogleMouseEvent, IValuesForm } from '../types';
import * as S from './styled';
import { UploadFile } from 'antd/lib';
import { dateFormatDayJs, generateUTC } from '@/common/utils/format';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import toast from 'react-hot-toast';

export const LestTripTourCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { countries } = useTypedSelector((state) => state.letsTripCountry);
  const {
    loading: { post },
    locations,
    errors,
  } = useTypedSelector((state) => state.letsTripTour);
  const { createLetsTripGroupTour, getAllLetsTripCountry, setLetsTripGroupTourLocations } =
    useActions();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyALfqQ3ezC7K1GxmJ1e5EMqdQzrXdrDcdA',
  });
  const center = { lat: 41.875734, lng: 64.017636 };

  const handleMapClick = (event: IGoogleMouseEvent) => {
    if (event.latLng) {
      setLetsTripGroupTourLocations([
        ...locations,
        { lng: event.latLng.lng(), lat: event.latLng.lat() },
      ]);
    }
  };

  const handleMaker = (loc: IGoogleMouseEvent) => {
    setLetsTripGroupTourLocations(
      locations?.filter((l) => l.lat !== loc?.latLng?.lat() && l.lng !== loc.latLng?.lng()) || [],
    );
  };

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
    images,
    extraInformation,
    // availableDate,
    tourItenarary,
  }: IValuesForm) => {
    if (locations.length === 0) {
      return toast.error('location required', { position: 'top-right' });
    }

    createLetsTripGroupTour({
      callback() {
        addNotification('successfully added group tour');
        navigate(ROUTES.letsTripGroupTour);
        setLetsTripGroupTourLocations([]);
      },
      name: { en: nameEn, ru: nameRu },
      countryId,
      description: [{ ru: descriptionRu, en: descriptionEn }],
      images: images.fileList.flatMap((item: UploadFile) =>
        item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
      ),
      locations,
      // availableDate: availableDate?.map((el) => {
      //   return {
      //     month: +generateUTC(el.month).split('-')[1],
      //     year: +generateUTC(el.month).split('-')[0],
      //     departures: el.departures.map((dep) => {
      //       return {
      //         price: dep.price,
      //         transferType: {
      //           en: dep.transferTypeEn,
      //           ru: dep.transferTypeRu,
      //         },
      //         startDate: dateFormatDayJs(dep.transferDate[0]),
      //         endDate: dateFormatDayJs(dep.transferDate[1]),
      //       };
      //     }),
      //   };
      // }),
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
      tourItenarary: tourItenarary.map((el, idx) => {
        return {
          title: {
            en: el.itineraryTitleEn,
            ru: el.itineraryTitleRu,
          },
          item_order: el.itineraryItemOrder,
          imageUrl: tourItenarary[idx].itineraryImgUrl.fileList.flatMap((item: UploadFile) =>
            item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
          )[idx],
          description: el.description.map((desc) => {
            return {
              items: [
                {
                  en: desc.itineraryDescEn,
                  ru: desc.itineraryDescRu,
                },
              ],
              item_order: desc.itineraryItemDescOrder,
              hour: desc.itineraryHour,
            };
          }),
        };
      }),
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
        </Flex>
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
            listType="picture"
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
        {/* <BaseForm.List
          name="availableDate"
          rules={[
            {
              validator: async (_, availableDate) => {
                if (!availableDate) {
                  return Promise.reject(new Error('available date filed required ?'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <>
                  <Card
                    size="small"
                    title={`${field.name + 1}. available date`}
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
                    <Flex gap={'15px'}>
                      <BaseForm.Item
                        style={{ width: '100%' }}
                        name={[field.key, 'month']}
                        label={'available month'}
                        rules={[{ required: true, message: 'Enter a available month' }]}
                      >
                        <DatePicker picker="month" style={{ width: '100%' }} />
                      </BaseForm.Item>
                      <BaseForm.Item
                        style={{ width: '100%' }}
                        name={[field.key, 'year']}
                        label={'available year'}
                        rules={[{ required: true, message: 'Enter a available year' }]}
                      >
                        <DatePicker picker="year" style={{ width: '100%' }} />
                      </BaseForm.Item>
                    </Flex>
                    <BaseForm.List
                      name={[field.key, 'departures']}
                      rules={[
                        {
                          validator: async (_, departures) => {
                            if (!departures) {
                              return Promise.reject(
                                new Error('available date departures field required ?'),
                              );
                            }
                          },
                        },
                      ]}
                    >
                      {(subFields, { add, remove }, { errors }) => (
                        <div
                          key={field.key}
                          style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
                        >
                          {subFields.map((subField) => (
                            <>
                              <Card
                                size="small"
                                title={`${subField.key + 1}. available date departures`}
                                extra={
                                  <Icon
                                    name="CloseOutlined"
                                    onClick={() => {
                                      remove(subField.name);
                                    }}
                                  />
                                }
                              >
                                <Flex gap={'15px'}>
                                  <BaseForm.Item
                                    style={{ width: '100%' }}
                                    name={[subField.name, 'transferTypeEn']}
                                    label={'transfer type english'}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'transfer type english is required?',
                                      },
                                      {
                                        type: 'string',
                                        message: 'Enter transfer type english ?',
                                      },
                                    ]}
                                  >
                                    <Input
                                      name="en"
                                      type="string"
                                      placeholder="Enter a transfer type english ?"
                                    />
                                  </BaseForm.Item>
                                  <BaseForm.Item
                                    style={{ width: '100%' }}
                                    name={[subField.name, 'transferTypeRu']}
                                    label={'transfer type russian'}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'transfer type russian is required?',
                                      },
                                      {
                                        type: 'string',
                                        message: 'Enter transfer type russian ?',
                                      },
                                    ]}
                                  >
                                    <Input
                                      name="ru"
                                      type="string"
                                      placeholder="Enter a transfer type russian ?"
                                    />
                                  </BaseForm.Item>

                                  <BaseForm.Item
                                    style={{ width: '100%' }}
                                    name={[subField.name, 'price']}
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
                                      type="number"
                                      placeholder="Enter a available price ?"
                                    />
                                  </BaseForm.Item>

                                  <BaseForm.Item
                                    style={{ width: '100%' }}
                                    name={[subField.key, 'transferDate']}
                                    label={'transfer start end date'}
                                    rules={[{ required: true, message: 'transfer date required' }]}
                                  >
                                    <DatePicker.RangePicker
                                      format={{
                                        format: 'YYYY-MM-DD',
                                        type: 'mask',
                                      }}
                                    />
                                  </BaseForm.Item>
                                </Flex>
                              </Card>
                            </>
                          ))}
                          <BaseForm.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<Icon name="PlusOutlined" />}
                            >
                              add available date departures ({subFields.length}){' '}
                              {subFields.length ? '✅' : '❌'}
                            </Button>
                          </BaseForm.Item>
                          <BaseForm.ErrorList errors={errors} />
                        </div>
                      )}
                    </BaseForm.List>
                  </Card>
                </>
              ))}
              <BaseForm.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<Icon name="PlusOutlined" />}
                >
                  add available date ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
              <BaseForm.ErrorList errors={errors} />
            </div>
          )}
        </BaseForm.List> */}
        <BaseForm.List
          name="tourItenarary"
          rules={[
            {
              validator: async (_, tourItenarary) => {
                if (!tourItenarary) {
                  return Promise.reject(new Error('tour itenarary field required ?'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <>
                  <Card
                    size="small"
                    title={`${field.name + 1}. tour itenarary`}
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
                    <Flex gap={'15px'}>
                      <BaseForm.Item
                        style={{ width: '100%' }}
                        name={[field.name, 'itineraryTitleEn']}
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
                        name={[field.name, 'itineraryTitleRu']}
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
                      <BaseForm.Item
                        style={{ width: '100%' }}
                        name={[field.name, 'itineraryItemOrder']}
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
                    </Flex>
                    <BaseForm.List
                      name={[field.key, 'description']}
                      rules={[
                        {
                          validator: async (_, description) => {
                            if (!description) {
                              return Promise.reject(
                                new Error('tour itenarary description field required ?'),
                              );
                            }
                          },
                        },
                      ]}
                    >
                      {(subFields, { add, remove }, { errors }) => (
                        <div>
                          {subFields.map((subField) => (
                            <>
                              <Card
                                size="small"
                                title={`${subField.key + 1}. tour itinerary description`}
                                extra={
                                  <Icon
                                    name="CloseOutlined"
                                    onClick={() => {
                                      remove(subField.name);
                                    }}
                                  />
                                }
                              >
                                <Flex gap={'15px'}>
                                  <BaseForm.Item
                                    style={{ width: '100%' }}
                                    name={[subField.name, 'itineraryItemDescOrder']}
                                    label={'itinerary item description order'}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'itinerary item order is required?',
                                      },
                                    ]}
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
                                    name={[subField.name, 'itineraryHour']}
                                    label={'itinerary hour'}
                                    rules={[
                                      { required: true, message: 'itinerary hour is required?' },
                                      {
                                        type: 'string',
                                        message: 'Enter itinerary hour ?',
                                      },
                                    ]}
                                  >
                                    <Input
                                      name="itineraryHour"
                                      type="string"
                                      placeholder="Enter a itinerary hour ?"
                                    />
                                  </BaseForm.Item>
                                </Flex>
                                <BaseForm.Item
                                  style={{ width: '100%' }}
                                  name={[subField.name, 'itineraryDescEn']}
                                  label={'itinerary description english'}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'itinerary description english is required?',
                                    },
                                    {
                                      type: 'string',
                                      message: 'Enter a itinerary description english ?',
                                    },
                                  ]}
                                >
                                  <TextArea
                                    name="itineraryDescEn"
                                    placeholder="Enter a itinerary description english ?"
                                  />
                                </BaseForm.Item>
                                <BaseForm.Item
                                  style={{ width: '100%' }}
                                  name={[subField.name, 'itineraryDescRu']}
                                  label={'itinerary description russian'}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'itinerary description russian is required?',
                                    },
                                    {
                                      type: 'string',
                                      message: 'Enter a itinerary description russian ?',
                                    },
                                  ]}
                                >
                                  <TextArea
                                    name="itineraryDescRu"
                                    placeholder="Enter a itinerary description russian ?"
                                  />
                                </BaseForm.Item>
                              </Card>
                            </>
                          ))}
                          <BaseForm.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<Icon name="PlusOutlined" />}
                            >
                              add tour itinerary description ({subFields.length})
                              {subFields.length ? '✅' : '❌'}
                            </Button>
                          </BaseForm.Item>
                          <BaseForm.ErrorList errors={errors} />
                        </div>
                      )}
                    </BaseForm.List>
                    <BaseForm.Item
                      name={[field.name, 'itineraryImgUrl']}
                      label={'itinerary image'}
                      rules={[
                        { required: true, message: 'itinerary image is required?', type: 'object' },
                      ]}
                    >
                      <Upload.Dragger
                        key={field.key}
                        style={{ width: '100%' }}
                        name="files"
                        listType="picture"
                        multiple={true}
                        fileList={fileList2}
                        onChange={handleChange2}
                        onPreview={handlePreview2}
                        beforeUpload={(file) => file.type.split('/')[0] === 'image'}
                        action={`${BASE_URL}/api/file`}
                      >
                        <Icon fontSize="20" color="blue" name="InboxOutlined" />
                        <div style={{ marginTop: 8 }}>
                          Click or drag file to this area to upload
                        </div>
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
                  </Card>
                </>
              ))}
              <BaseForm.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<Icon name="PlusOutlined" />}
                >
                  add tour itineraries ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
              <BaseForm.ErrorList errors={errors} />
            </div>
          )}
        </BaseForm.List>
        <BaseForm.List
          name="extraInformation"
          rules={[
            {
              validator: async (_, extraInformation) => {
                if (!extraInformation) {
                  return Promise.reject(new Error('extra information field required?'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
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
                      <Input disabled />
                    </BaseForm.Item>
                    <BaseForm.Item
                      label="ENGLISH"
                      initialValue={{ EN: 'EN' }}
                      rules={[{ required: true, message: 'field required' }]}
                    >
                      <BaseForm.List
                        name={[field.name, 'en']}
                        rules={[
                          {
                            validator: async (_, en) => {
                              if (!en) {
                                return Promise.reject(new Error('field required ?'));
                              }
                            },
                          },
                        ]}
                      >
                        {(subFields, subOpt, { errors }) => (
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
                            <div>
                              <Button type="dashed" onClick={() => subOpt.add()} block>
                                + Add Sub Item {subFields.length ? '✅' : '❌'}
                              </Button>
                              <BaseForm.ErrorList errors={errors} />
                            </div>
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
                      <Input disabled />
                    </BaseForm.Item>
                    <BaseForm.Item
                      label="RUSSIAN"
                      initialValue={{ RU: 'RU' }}
                      rules={[{ required: true, message: 'field required' }]}
                    >
                      <BaseForm.List
                        name={[field.name, 'ru']}
                        rules={[
                          {
                            validator: async (_, ru) => {
                              if (!ru) {
                                return Promise.reject(new Error('field required ?'));
                              }
                            },
                          },
                        ]}
                      >
                        {(subFields, subOpt, { errors }) => (
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
                              + Add Sub Item {subFields.length ? '✅' : '❌'}
                            </Button>
                            <BaseForm.ErrorList errors={errors} />
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
                  add extra information ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
              <BaseForm.ErrorList errors={errors} />
            </div>
          )}
        </BaseForm.List>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            zoom={6}
            center={locations[0] || center}
            onClick={handleMapClick}
          >
            <Polyline
              path={locations?.map((el) => el)}
              options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
            />
            {locations?.map((loc, idx) => (
              <Marker onClick={handleMaker} key={idx} position={loc} />
            ))}
          </GoogleMap>
        ) : null}
        <PrimaryBtn style={{ marginTop: '15px' }} htmlType="submit" loading={post}>
          Create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
