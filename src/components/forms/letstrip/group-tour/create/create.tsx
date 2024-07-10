import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn, TextArea, TextEditor } from '@/components';
import { BASE_URL, FILE_URL } from '@/constants';
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
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Id, IGoogleMouseEvent, IValuesForm } from '../types';
import { UploadFile } from 'antd/lib';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import toast from 'react-hot-toast';

export const LestTripTourCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { globalCountries } = useTypedSelector((state) => state.letsTripGlobalCountry);
  const {
    loading: { post },
    locations,
    errors,
  } = useTypedSelector((state) => state.letsTripTour);
  const { createLetsTripGroupTour, getAllGlobalCountry, setLetsTripGroupTourLocations } =
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
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((state) => state.app);
  const { countryId } = useParams();

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

  form.setFieldValue('countryId', Number(countryId));

  const onFinish = ({
    nameEn,
    nameRu,
    countryId,
    startingPrice,
    upTo2,
    upTo6,
    upTo10,
    upTo20,
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
    priceIncludes,
    priceNotIncludes,
  }: IValuesForm) => {
    if (locations.length === 0) {
      return toast.error('location required', { position: 'top-right' });
    }

    // console.log(priceIncludes);
    // console.log(priceNotIncludes);

    createLetsTripGroupTour({
      callback() {
        addNotification('successfully added group tour');
        setLetsTripGroupTourLocations([]);
        navigate(-1);
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
      startingPrice: startingPrice * 100,
      upTo2: upTo2 * 100,
      upTo6: upTo6 * 100,
      upTo10: upTo10 * 100,
      upTo20: upTo20 * 100,
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

  const selectOptionCountry = globalCountries?.map((el) => ({
    label: el.name.en,
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
    getAllGlobalCountry({ page: current - 1, size: pageSize });
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
      <Row gutter={10}>
        <Col span={12}>
          <BaseForm.Item name="nameEn" label={'name english'} rules={[{ required: true }]}>
            <Input name="nameEn" type="string" placeholder="Enter a english name ?" />
          </BaseForm.Item>
        </Col>
        <Col span={12}>
          <BaseForm.Item name="nameRu" label={'name russian'} rules={[{ required: true }]}>
            <Input name="nameRu" type="string" placeholder="Enter a russian name ? " />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            name="priceNoteEn"
            label={'price note english'}
            rules={[{ required: true }]}
          >
            <Input name="priceNoteEn" type="string" placeholder="Enter a price note english ?" />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            name="priceNoteRu"
            label={'price note russian'}
            rules={[{ required: true }]}
          >
            <Input name="priceNoteRu" type="string" placeholder="Enter a price note russian  ?" />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            name="startingPrice"
            label={'starting price ($)'}
            rules={[{ required: true }]}
          >
            <InputNumber
              $block
              name="starting price"
              type="number"
              placeholder="Enter a starting price ?"
            />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item name="countryId" label={'select country'} rules={[{ required: true }]}>
            <Select placeholder="Select country?" options={selectOptionCountry} />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item name="upTo2" label={'2 per person price ($)'} rules={[{ required: true }]}>
            <InputNumber $block name="upTo2" type="number" placeholder="2 per person price ($) ?" />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item name="upTo6" label={'6 per person price ($)'} rules={[{ required: true }]}>
            <InputNumber $block name="upTo6" type="number" placeholder="6 per person price ($) ?" />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            name="upTo10"
            label={'10 per person price ($)'}
            rules={[{ required: true }]}
          >
            <InputNumber
              $block
              name="upTo10"
              type="number"
              placeholder="10 per person price ($) ?"
            />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            name="upTo20"
            label={'20 per person price ($)'}
            rules={[{ required: true }]}
          >
            <InputNumber
              $block
              name="upTo20"
              type="number"
              placeholder="20 per person price ($) ?"
            />
          </BaseForm.Item>
        </Col>
        {/* <Col span={6}>
          <BaseForm.Item
            name="priceIncludeEn"
            label={'price include english'}
            rules={[{ required: true }]}
          >
            <Input
              name="priceIncludeEn"
              type="string"
              placeholder="Enter a price include english ?"
            />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            name="priceIncludeRu"
            label={'price include russian'}
            rules={[{ required: true }]}
          >
            <Input
              name="priceIncludeRu"
              type="string"
              placeholder="Enter a price include russian ?"
            />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            name="priceNotIncludeEn"
            label={'price not include english'}
            rules={[{ required: true }]}
          >
            <Input
              name="priceNotIncludeEn"
              type="string"
              placeholder="Enter a price not include english ?"
            />
          </BaseForm.Item>
        </Col>
        <Col span={6}>
          <BaseForm.Item
            name="priceNotIncludeRu"
            label={'price not include russian'}
            rules={[{ required: true }]}
          >
            <Input
              name="priceNotIncludeRu"
              type="string"
              placeholder="Enter a price not include russian ?"
            />
          </BaseForm.Item>
        </Col> */}
        <Col span={24}>
          <BaseForm.Item
            name="descriptionEn"
            label={'description english'}
            rules={[{ required: true }]}
          >
            {/* <TextEditor name="descriptionEn" placeholder="Enter a english description ?" /> */}
            <TextArea name="descriptionEn" placeholder="Enter a english description ?" />
          </BaseForm.Item>
        </Col>
        <Col span={24}>
          <BaseForm.Item
            name="descriptionRu"
            label={'description russian'}
            rules={[{ required: true }]}
          >
            {/* <TextEditor name="descriptionRu" placeholder="Enter a russian description ? " /> */}
            <TextArea name="descriptionRu" placeholder="Enter a russian description ? " />
          </BaseForm.Item>
        </Col>
        <Col span={24}>
          <BaseForm.Item
            name="images"
            label={'tour images'}
            rules={[{ required: true, message: 'tour images is required?', type: 'object' }]}
          >
            <Upload.Dragger
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
        </Col>
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
                      <Row gutter={12}>
                        <Col span={8}>
                          <BaseForm.Item
                            name={[field.name, 'itineraryTitleEn']}
                            label={'itinerary title english'}
                            rules={[{ required: true }]}
                          >
                            <Input
                              name="itineraryTitleEn"
                              type="string"
                              placeholder="Enter a itinerary title english ?"
                            />
                          </BaseForm.Item>
                        </Col>
                        <Col span={8}>
                          <BaseForm.Item
                            name={[field.name, 'itineraryTitleRu']}
                            label={'itinerary title russian'}
                            rules={[{ required: true }]}
                          >
                            <Input
                              name="itineraryTitleRu"
                              type="string"
                              placeholder="Enter a itinerary title russian ?"
                            />
                          </BaseForm.Item>
                        </Col>
                        <Col span={8}>
                          <BaseForm.Item
                            name={[field.name, 'itineraryItemOrder']}
                            label={'itinerary item order'}
                            rules={[{ required: true }]}
                          >
                            <InputNumber
                              $block
                              name="itineraryItemOrder"
                              type="number"
                              placeholder="Enter a itinerary item order ?"
                            />
                          </BaseForm.Item>
                        </Col>
                      </Row>
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
                                  <Row gutter={12}>
                                    <Col span={12}>
                                      <BaseForm.Item
                                        name={[subField.name, 'itineraryItemDescOrder']}
                                        label={'itinerary item description order'}
                                        rules={[
                                          {
                                            required: true,
                                          },
                                        ]}
                                      >
                                        <InputNumber
                                          $block
                                          name="itineraryItemDescOrder"
                                          type="number"
                                          placeholder="Enter a itinerary item description order ?"
                                        />
                                      </BaseForm.Item>
                                    </Col>
                                    <Col span={12}>
                                      <BaseForm.Item
                                        name={[subField.name, 'itineraryHour']}
                                        label={'itinerary hour'}
                                        rules={[{ required: true }]}
                                      >
                                        <Input
                                          name="itineraryHour"
                                          type="string"
                                          placeholder="Enter a itinerary hour ?"
                                        />
                                      </BaseForm.Item>
                                    </Col>
                                  </Row>
                                  <BaseForm.Item
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
                                    {/* <TextArea
                                      name="itineraryDescEn"
                                      placeholder="Enter a itinerary description english ?"
                                    /> */}
                                  </BaseForm.Item>
                                  <BaseForm.Item
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
                                    {/* <TextArea
                                      name="itineraryDescRu"
                                      placeholder="Enter a itinerary description russian ?"
                                    /> */}
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
                          {
                            required: true,
                            message: 'itinerary image is required?',
                            type: 'object',
                          },
                        ]}
                      >
                        <Upload.Dragger
                          key={field.key}
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
        </Col>

        <Col span={24}>
          <BaseForm.List
            name="priceIncludes"
            rules={[
              {
                validator: async (_, priceIncludes) => {
                  if (!priceIncludes) {
                    return Promise.reject(new Error('price includes field required?'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) =>
              fields.map((field) => (
                <>
                  <Card
                    key={field.key}
                    size="small"
                    title="price includes"
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
                          name={[field.key, 'priceIncludeEn']}
                          label={'price include english'}
                          rules={[{ required: true }]}
                        >
                          <Input type="string" placeholder="Enter a price include english ?" />
                        </BaseForm.Item>
                      </Col>
                      <Col span={12}>
                        <BaseForm.Item
                          name={[field.key, 'priceIncludeRu']}
                          label={'price include russian'}
                          rules={[{ required: true }]}
                        >
                          <Input type="string" placeholder="Enter a price include russian ?" />
                        </BaseForm.Item>
                      </Col>
                    </Row>
                  </Card>
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
                </>
              ))
            }
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
            {locations?.map((loc, idx) => (
              <Marker onClick={handleMaker} key={idx} position={loc} />
            ))}
          </GoogleMap>
        ) : null}
      </Row>

      <PrimaryBtn style={{ marginTop: '15px' }} htmlType="submit" loading={post}>
        Create
      </PrimaryBtn>
    </BaseForm>
  );
};
