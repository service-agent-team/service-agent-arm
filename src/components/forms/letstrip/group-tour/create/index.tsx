import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Field, Icon, InputNumber, PrimaryBtn, TextArea, TextEditor } from '@/components';
import { BASE_URL, FILE_URL } from '@/constants';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import {
  Button,
  Card,
  Col,
  GetProp,
  Image,
  Input,
  Row,
  Select,
  Space,
  Upload,
  UploadProps,
} from 'antd';
import { UploadFile } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { IGoogleMouseEvent, IValuesForm, Id } from '../types';
import { OldPrice } from '../edit/styled';
import { MediaType } from '@/store/lets-trip/group-tour/types';
import { UploadChangeParam } from 'antd/es/upload';

export const LestTripTourCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { globalCountries } = useTypedSelector((state) => state.letsTripGlobalCountry);
  const { loading, locations, errors } = useTypedSelector((state) => state.letsTripTour);
  const { createLetsTripGroupTour, getAllGlobalCountry, setLetsTripGroupTourLocations } =
    useActions();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyANA8h-fA595Nq-OMLG7JmTBWT-1R5eNVQ',
  });
  const center = { lat: 41.875734, lng: 64.017636 };
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((state) => state.app);
  const { countryId } = useParams();
  const [mediaType, setMediaType] = useState<{ [key: number]: string }>({});

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

  useEffect(() => {
    form.setFieldsValue({
      countryId: Number(countryId),
      childPrices: [
        {
          minAge: 0,
        },
      ],
      adultPrices: [
        {
          from: 1,
        },
      ],
    });
  }, []);

  const onFinish = ({
    nameEn,
    nameRu,
    cityEn,
    cityRu,
    countryId,
    price,
    upTo2,
    upTo4,
    upTo6,
    upTo10,
    descriptionEn,
    descriptionRu,
    priceNoteEn,
    priceNoteRu,
    images,
    media,
    extraInformation,

    priceIncludes,
    priceNotIncludes,
    tourItenarary,
    childPrices,
    adultPrices,

    freeCancellationDay,
    freeCancellationHour,
  }: IValuesForm) => {
    if (locations.length === 0) {
      return toast.error('location required', { position: 'top-right' });
    }

    createLetsTripGroupTour({
      callback() {
        addNotification('successfully added group tour');
        setLetsTripGroupTourLocations([]);
        navigate(-1);
      },
      name: { en: nameEn, ru: nameRu },
      cityName: { en: cityEn, ru: cityRu },
      prices: {
        childPrices: childPrices?.map((c) => ({
          maxAge: c.maxAge,
          price: c.price * 100,
        })),
        adultPrices: adultPrices?.map((a) => ({
          from: a.from,
          price: a.price * 100,
          oldPrice: a.oldPrice * 100,
        })),
      },
      freeCancellation: { day: freeCancellationDay, hour: freeCancellationHour },
      countryId,
      description: [{ ru: descriptionRu, en: descriptionEn }],
      // images: images.fileList.flatMap((item: UploadFile) =>
      //   item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
      // ),
      // })),
      media,
      locations,
      extraInformation: { en: extraInformation[0].en, ru: extraInformation[0].ru },
      price: price * 100,
      upTo2: upTo2 * 100,
      upTo4: upTo4 * 100,
      upTo6: upTo6 * 100,
      upTo10: upTo10 * 100,
      priceNote: {
        en: priceNoteEn,
        ru: priceNoteRu,
      },
      priceNotIncludes: {
        en: priceNotIncludes.map((item) => item.priceNotIncludeEn),
        ru: priceNotIncludes.map((item) => item.priceNotIncludeRu),
      },
      priceIncludes: {
        en: priceIncludes.map((item) => item.priceIncludeEn),
        ru: priceIncludes.map((item) => item.priceIncludeRu),
      },
      tourItenarary: tourItenarary.map((el) => {
        return {
          title: {
            en: el.itineraryTitleEn,
            ru: el.itineraryTitleRu,
          },
          item_order: el.itineraryItemOrder,
          imageUrl: 'https://files.coreteam.uz/api/v1/media/open/1180', // ', // tourItenarary[idx].itineraryImgUrl.fileList.flatMap((item: UploadFile) =>
          // item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
          //)[idx],
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

  const selectOptionCountry = globalCountries?.map((el) => ({
    label: el.name.en,
    value: el.id,
  }));

  const [countryCode, setCountryCode] = useState(
    globalCountries?.find((c) => c.id === Number(countryId))?.code === 'UZ',
  );

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (opt: UploadChangeParam<UploadFile<{ ids: Id[] }>>, name: number) => {
    setFileList(opt.fileList);

    if (opt.file.status === 'done') {
      const uploadedFileId = opt.file.response?.ids[0]?.id;

      if (uploadedFileId) {
        const currentMedia = form.getFieldValue('media') || [];

        currentMedia[name] = {
          ...currentMedia[name],
          url: `${FILE_URL}/${uploadedFileId}`,
        };

        form.setFieldValue('media', currentMedia);
        form.validateFields();
      }
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  useEffect(() => {
    getAllGlobalCountry({ page: current - 1, size: pageSize });
    if (errors) addNotification(errors);
  }, [errors]);

  return (
    <BaseForm form={form} loading={loading} onFinish={onFinish} save={false}>
      <Field span={12} name="nameEn" label="name english" isRequired />
      <Field span={12} name="nameRu" label="name russian" isRequired />

      <Field span={12} name="cityEn" label="city name english" isRequired />
      <Field span={12} name="cityRu" label="city name russian" isRequired />

      <Field span={12} name="priceNoteEn" label="price note english" isRequired />
      <Field span={12} name="priceNoteRu" label="price note russian" isRequired />

      <Col span={countryCode ? 0 : 12}>
        <BaseForm.Item
          name="price"
          label="Excursion price ($)"
          rules={[{ required: !countryCode, message: 'Please enter the excursion price' }]}
        >
          <InputNumber
            name="price"
            style={{ width: '100%' }}
            placeholder="Enter the excursion price"
          />
        </BaseForm.Item>
      </Col>
      <Col span={countryCode ? 24 : 12}>
        <BaseForm.Item name="countryId" label={'select country'} rules={[{ required: true }]}>
          <Select
            placeholder="Select country?"
            options={selectOptionCountry}
            onChange={(v) =>
              setCountryCode(globalCountries?.find((c) => c.id === Number(v))?.code === 'UZ')
            }
          />
        </BaseForm.Item>
      </Col>

      {/* check is price */}
      {countryCode ? (
        <>
          <Field span={6} name="upTo2" label="2 per person price ($)" isInputNumber={countryCode} />
          <Field span={6} name="upTo4" label="4 per person price ($)" isInputNumber={countryCode} />
          <Field span={6} name="upTo6" label="6 per person price ($)" isInputNumber={countryCode} />
          <Field
            span={6}
            name="upTo10"
            label="10 per person price ($)"
            isInputNumber={countryCode}
          />
        </>
      ) : null}

      <Field span={12} name="freeCancellationDay" label="Free cancellation day" isInputNumber />
      <Field span={12} name="freeCancellationHour" label="Free cancellation hour" isInputNumber />

      <Field span={24} name="descriptionEn" label="english description" isRequired textarea />

      <Field span={24} name="descriptionRu" label="russian description" isRequired textarea />

      <Col span={24}>
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
                    key={`itenarary-${field.key}`}
                    extra={
                      <Icon
                        name="CloseOutlined"
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Row gutter={12}>
                      <Field
                        span={8}
                        name={[field.name, 'itineraryTitleEn']}
                        label="itinerary title english"
                        isRequired
                      />
                      <Field
                        span={8}
                        name={[field.name, 'itineraryTitleRu']}
                        label="itinerary title russian"
                        isRequired
                      />
                      <Field
                        span={8}
                        name={[field.name, 'itineraryItemOrder']}
                        label={'itinerary item order'}
                        isRequired
                      />
                    </Row>
                    <BaseForm.List
                      name={[field.name, 'description']}
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
                                key={`itenarary-desc-${field.key}-${subField.key}`}
                                size="small"
                                title={`${subField.name + 1}. tour itinerary description`}
                                extra={
                                  <Icon
                                    name="CloseOutlined"
                                    onClick={() => {
                                      remove(subField.name);
                                    }}
                                  />
                                }
                              >
                                <Row gutter={12}>
                                  <Field
                                    span={12}
                                    name={[subField.name, 'itineraryItemDescOrder']}
                                    label={'itinerary item description order'}
                                    isInputNumber
                                    isRequired
                                  />
                                  <Field
                                    span={12}
                                    name={[subField.name, 'itineraryHour']}
                                    label={'itinerary hour'}
                                    isRequired
                                  />
                                </Row>
                                <Field
                                  span={24}
                                  name={[subField.name, 'itineraryDescEn']}
                                  label={'itinerary description english'}
                                  rules={[
                                    {
                                      validator: async (_, itenararyDescEn: string) => {
                                        if (itenararyDescEn === '<p><br></p>') {
                                          return Promise.reject(
                                            new Error(
                                              'extra information english description field required?',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <TextEditor
                                    name="itineraryDescEn"
                                    placeholder="Enter a itinerary description english ?"
                                  />
                                </Field>

                                <Field
                                  span={24}
                                  name={[subField.name, 'itineraryDescRu']}
                                  label={'itinerary description russian'}
                                  rules={[
                                    {
                                      validator: async (_, itenararyDescRu: string) => {
                                        if (itenararyDescRu === '<p><br></p>') {
                                          return Promise.reject(
                                            new Error(
                                              'extra information russian description field required?',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <TextEditor
                                    name="itineraryDescRu"
                                    placeholder="Enter a itinerary description russian ?"
                                  />
                                </Field>
                              </Card>
                            </>
                          ))}
                          <BaseForm.Item key={`${field.key}`}>
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
      </Col>

      <Col span={24}>
        <BaseForm.List name="media">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={`media-${key}`}
                  title={`${name + 1}. media item`}
                  extra={<Icon name="DeleteOutlined" onClick={() => remove(name)} />}
                >
                  <Row gutter={[10, 10]}>
                    <Field
                      span={12}
                      name={[name, 'priority']}
                      label="priority"
                      isRequired
                      isInputNumber
                    />

                    <Field span={12} name={[name, 'mediaType']} label="media type" isRequired>
                      <Select
                        options={Object.keys(MediaType).map((m) => ({ label: m, value: m }))}
                        onChange={(value: any) => setMediaType({ ...mediaType, [name]: value })}
                        placeholder="Select a media type"
                      />
                    </Field>

                    {mediaType[name] === 'IMAGE' && mediaType[name] ? (
                      <Col span={24}>
                        <BaseForm.Item
                          {...restField}
                          key={key}
                          name={[name, 'url']}
                          label="image"
                          rules={[{ required: false, type: 'string' }]}
                        >
                          <div>
                            <Upload.Dragger
                              key={key}
                              name="files"
                              fileList={fileList}
                              onChange={(info) => handleChange(info, name)}
                              listType="picture"
                              onPreview={handlePreview}
                              style={{ width: '100%' }}
                              action={`${BASE_URL}/api/file`}
                              multiple={false}
                            >
                              <p className="ant-upload-drag-icon">
                                <Icon name="InboxOutlined" />
                              </p>
                              <p className="ant-upload-text">
                                Click or drag file to this area to upload
                              </p>
                            </Upload.Dragger>
                            {previewImage && (
                              <Image
                                key={key}
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
                          </div>
                        </BaseForm.Item>
                      </Col>
                    ) : (
                      <Field span={24} name={[name, 'url']} label="video url" isRequired />
                    )}
                  </Row>
                </Card>
              ))}

              <BaseForm.Item>
                <Button
                  block
                  type="dashed"
                  onClick={() => add()}
                  icon={<Icon name="PlusOutlined" />}
                >
                  add media Item ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
            </>
          )}
        </BaseForm.List>
      </Col>

      <Col span={24}>
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
                    key={`extra-en-${field.key}`}
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
                              <Space key={`${field.key}-${subField.key}`}>
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
                    key={`extra-ru-${field.key}`}
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
                              <Space key={`${field.key}-${subField.key}`}>
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
      </Col>

      <Col span={24}>
        <BaseForm.List
          name="priceIncludes"
          rules={[
            {
              validator: async (_, value) => {
                if (!value?.length) {
                  return Promise.reject(new Error('price not includes field required?'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <div>
              {fields.map((field) => (
                <Card
                  key={`price-include-${field.key}`}
                  size="small"
                  title={`✅ ${field.name + 1}.price includes`}
                  extra={
                    <Icon
                      name="CloseOutlined"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Row gutter={12}>
                    <Col span={12}>
                      <BaseForm.Item
                        name={[field.name, 'priceIncludeEn']}
                        label={'price include english'}
                        rules={[{ required: true }]}
                      >
                        <TextArea placeholder="Enter a price include english ?" />
                      </BaseForm.Item>
                    </Col>
                    <Col span={12}>
                      <BaseForm.Item
                        name={[field.name, 'priceIncludeRu']}
                        label={'price include russian'}
                        rules={[{ required: true }]}
                      >
                        <TextArea placeholder="Enter a price include russian ?" />
                      </BaseForm.Item>
                    </Col>
                  </Row>
                </Card>
              ))}
              <BaseForm.Item>
                <Button
                  block
                  type="dashed"
                  onClick={() => add()}
                  icon={<Icon name="PlusOutlined" />}
                >
                  add tour price includes ✅ ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
              <BaseForm.ErrorList errors={errors} />
            </div>
          )}
        </BaseForm.List>
      </Col>

      <Col span={24}>
        <BaseForm.List
          name="priceNotIncludes"
          rules={[
            {
              validator: async (_, value) => {
                if (!value?.length) {
                  return Promise.reject(new Error('price includes not field required?'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <div>
              {fields.map((field) => (
                <Card
                  key={`price-not-${field.key}`}
                  size="small"
                  title={`❌ ${field.name + 1}.price not includes`}
                  extra={
                    <Icon
                      name="CloseOutlined"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Row gutter={12}>
                    <Col span={12}>
                      <BaseForm.Item
                        name={[field.name, 'priceNotIncludeEn']}
                        label={'price not include english'}
                        rules={[{ required: true }]}
                      >
                        <TextArea
                          name="priceNotIncludeEn"
                          placeholder="Enter a price not include english ?"
                        />
                      </BaseForm.Item>
                    </Col>
                    <Col span={12}>
                      <BaseForm.Item
                        name={[field.name, 'priceNotIncludeRu']}
                        label={'price not include russian'}
                        rules={[{ required: true }]}
                      >
                        <TextArea
                          name="priceNotIncludeRu"
                          placeholder="Enter a price not include russian ?"
                        />
                      </BaseForm.Item>
                    </Col>
                  </Row>
                </Card>
              ))}
              <BaseForm.Item>
                <Button
                  block
                  type="dashed"
                  onClick={() => add()}
                  icon={<Icon name="PlusOutlined" />}
                >
                  add tour price not includes ❌ ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
              <BaseForm.ErrorList errors={errors} />
            </div>
          )}
        </BaseForm.List>
      </Col>

      <Col span={24}>
        <BaseForm.List
          name="childPrices"
          rules={[
            {
              validator: async (_, value) => {
                if (!value?.length) {
                  return Promise.reject(new Error('child prices field required?'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <div>
              {fields.map((field) => (
                <Card
                  key={`child-price-${field.key}`}
                  size="small"
                  title={`${field.name + 1}.child price`}
                  extra={
                    <Icon
                      name="CloseOutlined"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Row gutter={12}>
                    <Col span={12}>
                      <BaseForm.Item
                        name={[field.name, 'maxAge']}
                        label={'max age'}
                        rules={[{ required: true }]}
                      >
                        <InputNumber
                          name="maxAge"
                          style={{ width: '100%' }}
                          placeholder="Enter a max age ?"
                        />
                      </BaseForm.Item>
                    </Col>
                    <Col span={12}>
                      <BaseForm.Item
                        name={[field.name, 'price']}
                        label={'price'}
                        rules={[{ required: true }]}
                      >
                        <InputNumber
                          name="price"
                          style={{ width: '100%' }}
                          placeholder="Enter a price ?"
                        />
                      </BaseForm.Item>
                    </Col>
                  </Row>
                </Card>
              ))}
              <BaseForm.Item>
                <Button
                  block
                  type="dashed"
                  onClick={() => add()}
                  icon={<Icon name="PlusOutlined" />}
                >
                  add tour child price ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
              <BaseForm.ErrorList errors={errors} />
            </div>
          )}
        </BaseForm.List>
      </Col>

      <Col span={24}>
        <BaseForm.List
          name="adultPrices"
          rules={[
            {
              validator: async (_, priceIncludes) => {
                if (!priceIncludes.length) {
                  return Promise.reject(new Error('adult prices field required?'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <div>
              {fields.map((field) => (
                <Card
                  key={`adult-price-${field.key}`}
                  size="small"
                  title={`${field.name + 1}.adult price`}
                  extra={
                    <Icon
                      name="CloseOutlined"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Row gutter={12}>
                    <Field
                      span={8}
                      name={[field.name, 'from']}
                      label="person count"
                      isRequired
                      isInputNumber
                    />
                    <Field
                      span={8}
                      name={[field.name, 'price']}
                      label="price"
                      isRequired
                      isInputNumber
                    />
                    <Field
                      span={8}
                      name={[field.name, 'oldPrice']}
                      label={<OldPrice>old price</OldPrice>}
                      isRequired
                      isInputNumber
                    />
                  </Row>
                </Card>
              ))}
              <BaseForm.Item>
                <Button
                  block
                  type="dashed"
                  onClick={() => add()}
                  icon={<Icon name="PlusOutlined" />}
                >
                  add tour adult price ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
              <BaseForm.ErrorList errors={errors} />
            </div>
          )}
        </BaseForm.List>
      </Col>

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
          {locations?.map((loc, idx) => <Marker onClick={handleMaker} key={idx} position={loc} />)}
        </GoogleMap>
      ) : null}
      <PrimaryBtn style={{ marginTop: '15px' }} htmlType="submit" loading={loading.post}>
        Create
      </PrimaryBtn>
    </BaseForm>
  );
};
