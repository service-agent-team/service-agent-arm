import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, modal, PrimaryBtn, TextArea } from '@/components';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import {
  Button,
  Card,
  // DatePicker,
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
import { Id, IGoogleMouseEvent, IValuesForm } from '../types';
import * as S from './styled';
import { UploadFile } from 'antd/lib';
// import { dateFormatDayJs } from '@/common/utils/format';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import toast from 'react-hot-toast';
// import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export const LestTripTourEditForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { globalCountries } = useTypedSelector((state) => state.letsTripGlobalCountry);
  const {
    loading: { post, patch },
    locations,
    groupTourRaw,
    errors,
  } = useTypedSelector((state) => state.letsTripTour);
  const {
    updateByObjectLetsTripGroupTour,
    updatePriceNoteTripGroupTour,
    getAllGlobalCountry,
    setLetsTripGroupTourLocations,
    // addNewDateLetsTripGroupTour,
    // removeDateLetsTripGroupTour,
    addLocationLetsTripGroupTour,
    removeLocationLetsTripGroupTour,
    addImageLetsTripGroupTour,
    deleteImageLetsTripGroupTour,
    otherUpdatesLetsTripGroupTour,
    addExtraInfoLetsTripGroupTour,
    removeExtraInfoLetsTripGroupTour,
    addItenararyLetsTripGroupTour,
    removeItenararyLetsTripGroupTour,
  } = useActions();
  const [fileList, setFileList] = useState<UploadFile[]>(
    groupTourRaw?.images.map((el) => ({ uid: el, name: el, url: el, status: 'done' })) || [],
  );
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyALfqQ3ezC7K1GxmJ1e5EMqdQzrXdrDcdA',
  });
  const center = { lat: 41.875734, lng: 64.017636 };
  const navigate = useNavigate();

  const handleMapClick = (event: IGoogleMouseEvent) => {
    if (event.latLng) {
      addLocationLetsTripGroupTour({
        callback() {
          addNotification('add location');
          setLetsTripGroupTourLocations([
            ...locations,
            { lng: event.latLng.lng(), lat: event.latLng.lat() },
          ]);
        },
        tourId: groupTourRaw?.tourId as number,
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  const handleMaker = (loc: IGoogleMouseEvent) => {
    const existLocation = locations?.find(
      (l) => l.lat !== loc?.latLng?.lat() && l.lng !== loc.latLng?.lng(),
    );
    if (existLocation) {
      removeLocationLetsTripGroupTour({
        callback() {
          addNotification('remove location');
          setLetsTripGroupTourLocations(
            locations?.filter((l) => l.lat !== loc?.latLng?.lat() && l.lng !== loc.latLng?.lng()),
          );
        },
        tourId: groupTourRaw?.tourId as number,
        locationItemId: existLocation.id as number,
      });
    }
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
    if (groupTourRaw) {
      if (groupTourRaw?.name.en !== nameEn || groupTourRaw?.name.ru !== nameRu) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('name changed');
            navigate(ROUTES.letsTripGroupTour);
          },
          en: nameEn,
          ru: nameRu,
          id: groupTourRaw.name?.id as number,
        });
      }
      if (startingPrice !== groupTourRaw.startingPrice || countryId !== groupTourRaw.countryId) {
        otherUpdatesLetsTripGroupTour({
          callback() {
            addNotification('country and starting price changed');
            navigate(ROUTES.letsTripGroupTour);
          },
          tourId: groupTourRaw.tourId as number,
          countryId: countryId as number,
          startingPrice: startingPrice * 100,
        });
      }
      if (
        groupTourRaw.description[0].en !== descriptionEn ||
        groupTourRaw.description[0].ru !== descriptionRu
      ) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('description changed');
            navigate(ROUTES.letsTripGroupTour);
          },
          en: descriptionEn,
          ru: descriptionRu,
          id: groupTourRaw.description[0].id as number,
        });
      }
      if (groupTourRaw.priceNote.en !== priceNoteEn || groupTourRaw.priceNote.ru !== priceNoteRu) {
        updatePriceNoteTripGroupTour({
          callback() {
            addNotification('price note changed');
            navigate(ROUTES.letsTripGroupTour);
          },
          en: priceNoteEn,
          ru: priceNoteRu,
          id: groupTourRaw?.priceNote.id as number,
        });
      }
      if (
        groupTourRaw.priceIncludes.en[0] !== priceIncludeEn ||
        groupTourRaw.priceIncludes.ru[0] !== priceIncludeRu
      ) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('price includes changed');
            navigate(ROUTES.letsTripGroupTour);
          },
          en: priceIncludeEn,
          ru: priceIncludeRu,
          id: groupTourRaw.priceIncludes.id as number,
        });
      }
      if (
        groupTourRaw.priceNotIncludes.en[0] !== priceNotIncludeEn ||
        groupTourRaw.priceNotIncludes.ru[0] !== priceNotIncludeRu
      ) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('price not includes changed');
            navigate(ROUTES.letsTripGroupTour);
          },
          en: priceNotIncludeEn,
          ru: priceNotIncludeRu,
          id: groupTourRaw.priceNotIncludes.id as number,
        });
      }
      tourItenarary.filter((el) => {
        if (!el.id) {
          return addItenararyLetsTripGroupTour({
            callback() {
              addNotification('add tour itenarary');
              navigate(ROUTES.letsTripGroupTour);
            },
            tourId: groupTourRaw.tourId,
            body: {
              title: {
                en: el.itineraryTitleEn,
                ru: el.itineraryTitleRu,
              },
              description: el?.description?.map((desc) => ({
                item_order: desc.itineraryItemDescOrder,
                hour: desc.itineraryHour,
                items: [
                  {
                    en: desc.itineraryDescEn,
                    ru: desc.itineraryDescRu,
                  },
                ],
              })),
              item_order: el.itineraryItemOrder,
              imageUrl: `${FILE_URL}/${el.itineraryImgUrl?.file?.response?.ids[0]?.id}`,
            },
          });
        }
      });

      // availableDate.splice(groupTourRaw.availableDate.length).map((el) => {
      //   const formatMonth = +dateFormatDayJs(el.month, 'M');
      //   const formatYear = +dateFormatDayJs(el.year, 'YYYY');

      //   addNewDateLetsTripGroupTour({
      //     callback() {
      //       addNotification('available date added');
      //       navigate(ROUTES.letsTripGroupTour);
      //     },
      //     tourId: groupTourRaw.tourId,
      //     availableDateItem: {
      //       month: formatMonth,
      //       year: formatYear,
      //       departures: el.departures.map((dep) => ({
      //         price: dep.price,
      //         transferType: {
      //           en: dep.transferTypeEn,
      //           ru: dep.transferTypeRu,
      //         },
      //         startDate: dateFormatDayJs(dep.transferDate[0]),
      //         endDate: dateFormatDayJs(dep.transferDate[1]),
      //       })),
      //     },
      //   });
      // });

      const newImages = images?.fileList
        .filter((el) => el.response)
        .flatMap((el) => el.response.ids.map((file: Id) => `${FILE_URL}/${file.id}`));

      if (newImages?.length) {
        addImageLetsTripGroupTour({
          callback() {
            addNotification('group tour images added');
            navigate(ROUTES.letsTripGroupTour);
          },
          tourId: groupTourRaw.tourId as number,
          images: newImages,
        });
      }

      const filterEnglishInfo = extraInformation[0]?.en.filter((item: any) => !item.id);

      const filterRussianInfo = extraInformation[0]?.ru.filter((item: any) => !item.id);

      if (filterEnglishInfo.length || filterRussianInfo.length) {
        addExtraInfoLetsTripGroupTour({
          callback() {
            addNotification('successfully added extra info');
            navigate(ROUTES.letsTripGroupTour);
          },
          tourId: groupTourRaw.tourId,
          en: filterEnglishInfo,
          ru: filterRussianInfo,
        });
      }
    }
  };

  // const handleAvailableDateDelete = (field: any, remove: any) => {
  //   const existDate = groupTourRaw?.availableDate[field.name];
  //   if (existDate) {
  //     modal.confirm({
  //       okText: 'Delete',
  //       title: `You want to delete right ?`,
  //       onOk: () => {
  //         removeDateLetsTripGroupTour({
  //           callback() {
  //             addNotification('available date deleted');
  //             remove(field.name);
  //           },
  //           availableDateItemId: existDate.id as number,
  //           tourId: groupTourRaw?.tourId as number,
  //         });
  //       },
  //     });
  //   } else remove(field.name);
  // };

  const handleExtraInfoEnglishDelete = (subField: any, remove: any) => {
    const existItem = groupTourRaw?.extraInformation.en[subField.name];

    if (existItem) {
      modal.confirm({
        okText: 'Delete',
        title: `You want to delete right ?`,
        onOk: () => {
          removeExtraInfoLetsTripGroupTour({
            callback() {
              addNotification('successfully deleted extra information item');
              remove(subField.name);
            },
            tourId: groupTourRaw?.tourId,
            extraInfoId: existItem?.id as number,
            lang: 'EN',
          });
        },
      });
    } else remove(subField.name);
  };

  const handleExtraInfoRussianDelete = (subField: any, remove: any) => {
    const existItem = groupTourRaw?.extraInformation.ru[subField.name];

    if (existItem) {
      modal.confirm({
        okText: 'Delete',
        title: `You want to delete right ?`,
        onOk: () => {
          removeExtraInfoLetsTripGroupTour({
            callback() {
              addNotification('successfully deleted extra information item');
              remove(subField.name);
            },
            tourId: groupTourRaw?.tourId,
            extraInfoId: existItem?.id as number,
            lang: 'RU',
          });
        },
      });
    } else remove(subField.name);
  };

  const handleItenararyDelete = (field: any, remove: any) => {
    const existItem = groupTourRaw?.tourItenarary[field.name];

    if (existItem) {
      modal.confirm({
        okText: 'Delete',
        title: `You want to delete right ?`,
        onOk: () => {
          removeItenararyLetsTripGroupTour({
            callback() {
              addNotification('successfully deleted tour itenarary');
              remove(field.name);
            },
            tourId: groupTourRaw?.tourId,
            tourItenararyItemId: existItem?.id as number,
          });
        },
      });
    } else remove(field.name);
  };

  const selectOptionCountry = globalCountries?.map((el) => ({
    label: el.name.en ? el.name.en : el.code,
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
    getAllGlobalCountry({ page: 0, size: 100 });
    if (groupTourRaw?.locations) setLetsTripGroupTourLocations(groupTourRaw?.locations);
    if (errors) addNotification(errors);
  }, [errors]);

  return (
    <BaseForm
      name="letsTripGroupTourForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
      initialValues={{
        nameEn: groupTourRaw?.name?.en,
        nameRu: groupTourRaw?.name?.ru,
        countryId: groupTourRaw?.countryId,
        startingPrice: Number(groupTourRaw?.startingPrice) / 100,
        descriptionEn: groupTourRaw?.description[0]?.en,
        descriptionRu: groupTourRaw?.description[0]?.ru,
        priceNoteEn: groupTourRaw?.priceNote?.en,
        priceNoteRu: groupTourRaw?.priceNote?.ru,
        priceIncludeEn: groupTourRaw?.priceIncludes?.en[0],
        priceIncludeRu: groupTourRaw?.priceIncludes?.ru[0],
        priceNotIncludeEn: groupTourRaw?.priceNotIncludes?.en[0],
        priceNotIncludeRu: groupTourRaw?.priceNotIncludes?.ru[0],
        extraInformation: [
          { en: groupTourRaw?.extraInformation?.en, ru: groupTourRaw?.extraInformation?.ru },
        ],
        // availableDate: groupTourRaw?.availableDate.map((el) => ({
        //   month: dayjs(`${el?.year}-${el?.month}`),
        //   year: dayjs(`${el?.year}-${el?.month}`),
        //   departures: el?.departures?.map((dep) => ({
        //     price: dep.price,
        //     transferTypeEn: dep.transferType.en,
        //     transferTypeRu: dep.transferType.ru,
        //     transferDate: [dayjs(dep.startDate), dayjs(dep.endDate)],
        //   })),
        // })),
        tourItenarary: groupTourRaw?.tourItenarary.map((el) => ({
          id: el.id,
          itineraryTitleEn: el.title.en,
          itineraryTitleRu: el.title.ru,
          itineraryItemOrder: el.item_order,
          description: el.descriptions?.map((item) => ({
            itineraryDescEn: item.items[0].en,
            itineraryDescRu: item.items[0].ru,
            itineraryItemDescOrder: item.item_order,
            itineraryHour: item.hour,
          })),
        })),
      }}
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
            label={'starting price ($)'}
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
          rules={[{ message: 'tour images is required?', type: 'object' }]}
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
            onRemove={(file) => {
              if (file.url && groupTourRaw?.tourId)
                deleteImageLetsTripGroupTour({
                  callback() {
                    addNotification('group tour image deleted');
                  },
                  tourId: groupTourRaw?.tourId,
                  images: [file.url as string],
                });
            }}
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
        {/* <BaseForm.List name="availableDate">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <>
                  <Card
                    size="small"
                    title={`${field.key + 1}. available date`}
                    key={field.key}
                    extra={
                      <Icon
                        color="red"
                        name="DeleteOutlined"
                        onClick={() => {
                          if (groupTourRaw) {
                            handleAvailableDateDelete(field, remove);
                          }
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
                    <BaseForm.List name={[field.key, 'departures']}>
                      {(subFields, { add, remove }) => (
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
                                    name={[subField.key, 'transferTypeEn']}
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
                                    name={[subField.key, 'transferTypeRu']}
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
                                    name={[subField.key, 'price']}
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
            </div>
          )}
        </BaseForm.List> */}
        <BaseForm.List name="tourItenarary">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <>
                  <Card
                    size="small"
                    title={`${field.key + 1}. tour itenarary`}
                    key={field.key}
                    extra={
                      <Icon
                        color="red"
                        name="DeleteOutlined"
                        onClick={() => {
                          handleItenararyDelete(field, remove);
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

                    <BaseForm.List name={[field.key, 'description']}>
                      {(subFields, { add, remove }) => (
                        <div>
                          {subFields.map((subField) => (
                            <Card
                              key={field.key + subField.key}
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
                        </div>
                      )}
                    </BaseForm.List>
                    <BaseForm.Item
                      name={[field.name, 'itineraryImgUrl']}
                      label={'itinerary image'}
                      rules={[
                        {
                          required: groupTourRaw?.tourItenarary[field.name]?.imageUrl
                            ? false
                            : true,
                          message: 'itinerary image is required?',
                          type: 'object',
                        },
                      ]}
                    >
                      <Upload.Dragger
                        key={field.key}
                        style={{ width: '100%' }}
                        listType="picture"
                        name="files"
                        multiple={false}
                        fileList={
                          groupTourRaw?.tourItenarary[field.name]?.imageUrl
                            ? [
                                {
                                  uid:
                                    groupTourRaw?.tourItenarary[field.name]?.imageUrl + field.name,
                                  name: groupTourRaw?.tourItenarary[field.name]?.imageUrl,
                                  url: groupTourRaw?.tourItenarary[field.name]?.imageUrl,
                                  status: 'done',
                                },
                              ]
                            : fileList2
                        }
                        onChange={handleChange2}
                        onPreview={handlePreview2}
                        beforeUpload={(file) => file.type.split('/')[0] === 'image'}
                        action={`${BASE_URL}/api/file`}
                      >
                        <div
                          style={{
                            marginTop: 8,
                            display: groupTourRaw?.tourItenarary[field.name]?.imageUrl
                              ? 'none'
                              : 'block',
                          }}
                        >
                          <Icon fontSize="20" color="blue" name="InboxOutlined" />
                          <br />
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
            </div>
          )}
        </BaseForm.List>
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
                      <Input disabled />
                    </BaseForm.Item>
                    <BaseForm.Item
                      label="ENGLISH"
                      initialValue={{ EN: 'EN' }}
                      rules={[{ required: true, message: 'field required' }]}
                    >
                      <BaseForm.List
                        name={[field.name, 'en']}
                        initialValue={groupTourRaw?.extraInformation.en.map((el) => ({
                          id: el.id,
                          value: el.value,
                          title: el.title,
                        }))}
                      >
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
                                  color="red"
                                  name="DeleteOutlined"
                                  onClick={() => {
                                    if (groupTourRaw?.extraInformation.en.length) {
                                      handleExtraInfoEnglishDelete(subField, subOpt.remove);
                                    }
                                  }}
                                />
                              </Space>
                            ))}
                            <Button type="dashed" onClick={() => subOpt.add()} block>
                              + Add Sub Item {subFields.length ? '✅' : '❌'}
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
                      <Input disabled />
                    </BaseForm.Item>
                    <BaseForm.Item
                      label="RUSSIAN"
                      initialValue={{ RU: 'RU' }}
                      rules={[{ required: true, message: 'field required' }]}
                    >
                      <BaseForm.List
                        name={[field.name, 'ru']}
                        initialValue={groupTourRaw?.extraInformation.ru.map((el) => ({
                          id: el.id,
                          value: el.value,
                          title: el.title,
                        }))}
                      >
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
                                  color="red"
                                  name="DeleteOutlined"
                                  onClick={() => {
                                    if (groupTourRaw?.extraInformation.ru.length) {
                                      handleExtraInfoRussianDelete(subField, subOpt.remove);
                                    }
                                  }}
                                />
                              </Space>
                            ))}
                            <Button type="dashed" onClick={() => subOpt.add()} block>
                              + Add Sub Item {subFields.length ? '✅' : '❌'}
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
                  add extra information ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
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
              options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 3 }}
            />
            {locations?.map((loc, idx) => (
              <Marker onClick={handleMaker} key={idx} position={loc} />
            ))}
          </GoogleMap>
        ) : null}
        <PrimaryBtn style={{ marginTop: '15px' }} htmlType="submit" loading={post || patch}>
          Edit
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
