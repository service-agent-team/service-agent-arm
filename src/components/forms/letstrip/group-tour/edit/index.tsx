import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, modal, PrimaryBtn, TextArea, TextEditor } from '@/components';
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
import { Id, IGoogleMouseEvent, IValuesForm } from '../types';
import { UploadFile } from 'antd/lib';
// import { dateFormatDayJs } from '@/common/utils/format';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import toast from 'react-hot-toast';
// import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { Lang } from '@/store/lets-trip/group-tour/types';
import { LestTripGroupTourItenararyModal } from '@/components/modal';
import { OldPrice } from './styled';

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
    updatePriceIncludesGroupTour,
    getAllGlobalCountry,
    getOneRawLetsTripTour,
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
    setModal,
    setItenararyItem,
  } = useActions();
  const [fileList, setFileList] = useState<UploadFile[]>(
    groupTourRaw?.images.map((el) => ({ uid: el, name: el, url: el, status: 'done' })) || [],
  );
  // const [fileList2, setFileList2] = useState<UploadFile[][]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyANA8h-fA595Nq-OMLG7JmTBWT-1R5eNVQ',
  });
  const center = { lat: 41.875734, lng: 64.017636 };
  const { id } = useParams();
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((state) => state.app);

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

  useEffect(() => {
    if (id && groupTourRaw) {
      const priceIncludes =
        groupTourRaw.priceIncludes.en.length > groupTourRaw.priceIncludes.ru.length
          ? groupTourRaw.priceNotIncludes.en
          : groupTourRaw.priceIncludes.ru;

      const priceNotIncludes =
        groupTourRaw.priceNotIncludes.en.length > groupTourRaw.priceNotIncludes.ru.length
          ? groupTourRaw.priceNotIncludes.en
          : groupTourRaw.priceNotIncludes.ru;

      form.setFieldsValue({
        nameEn: groupTourRaw?.name?.en,
        nameRu: groupTourRaw?.name?.ru,
        cityEn: groupTourRaw?.cityName?.en,
        cityRu: groupTourRaw?.cityName?.ru,
        freeCancellationDay: groupTourRaw?.freeCancellation?.day,
        freeCancellationHour: groupTourRaw?.freeCancellation?.hour,
        countryId: groupTourRaw?.countryId,
        price: Number(groupTourRaw?.price) / 100,
        oldPrice: Number(groupTourRaw?.oldPrice) / 100,
        upTo2: Number(groupTourRaw?.upTo2) / 100,
        upTo4: Number(groupTourRaw?.upTo4) / 100,
        upTo6: Number(groupTourRaw?.upTo6) / 100,
        upTo10: Number(groupTourRaw?.upTo10) / 100,
        oldUpTo2: Number(groupTourRaw?.oldUpTo2) / 100,
        oldUpTo4: Number(groupTourRaw?.oldUpTo4) / 100,
        oldUpTo6: Number(groupTourRaw?.oldUpTo6) / 100,
        oldUpTo10: Number(groupTourRaw?.oldUpTo10) / 100,
        descriptionEn: groupTourRaw?.description[0]?.en,
        descriptionRu: groupTourRaw?.description[0]?.ru,
        priceNoteEn: groupTourRaw?.priceNote?.en,
        priceNoteRu: groupTourRaw?.priceNote?.ru,
        priceIncludeEn: groupTourRaw?.priceIncludes?.en[0],
        priceIncludeRu: groupTourRaw?.priceIncludes?.ru[0],
        priceIncludes: priceIncludes.reduce((acc: any, _, i) => {
          acc.push({
            priceIncludeEn: groupTourRaw?.priceIncludes?.en?.[i],
            priceIncludeRu: groupTourRaw?.priceIncludes?.ru?.[i],
          });
          return acc;
        }, []),
        priceNotIncludes: priceNotIncludes.reduce((acc: any, _, i) => {
          acc.push({
            priceNotIncludeEn: groupTourRaw?.priceNotIncludes?.en?.[i],
            priceNotIncludeRu: groupTourRaw?.priceNotIncludes?.ru?.[i],
          });
          return acc;
        }, []),
        priceNotIncludeEn: groupTourRaw?.priceNotIncludes?.en[0],
        priceNotIncludeRu: groupTourRaw?.priceNotIncludes?.ru[0],
        extraInformation: [
          {
            en: groupTourRaw?.extraInformation?.en,
            ru: groupTourRaw?.extraInformation?.ru,
            EN: 'EN',
            RU: 'RU',
          },
        ],
        tourItenarary: groupTourRaw?.tourItenarary.map((el) => ({
          id: el.id,
          itineraryTitleEn: el.title.en,
          itineraryTitleRu: el.title.ru,
          itineraryItemOrder: el.item_order,
          description: el.descriptions?.map((item, i) => ({
            itineraryDescEn: item.items[i].en,
            itineraryDescRu: item.items[i].ru,
            itineraryItemDescOrder: item.item_order,
            itineraryHour: item.hour,
          })),
        })),
      });
    }
  }, [id, groupTourRaw]);

  const onFinish = ({
    nameEn,
    nameRu,
    countryId,
    price,
    oldPrice,
    upTo2,
    upTo4,
    upTo6,
    upTo10,
    oldUpTo2,
    oldUpTo4,
    oldUpTo6,
    oldUpTo10,
    descriptionEn,
    descriptionRu,
    priceNoteEn,
    priceNoteRu,

    priceIncludes,
    priceNotIncludes,

    images,
    extraInformation,
    // availableDate,
    tourItenarary,

    freeCancellationDay,
    freeCancellationHour,
  }: IValuesForm) => {
    if (locations.length === 0) {
      return toast.error('location required', { position: 'top-right' });
    }

    if (groupTourRaw) {
      if (groupTourRaw?.name.en !== nameEn || groupTourRaw?.name.ru !== nameRu) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('name changed');
          },
          en: nameEn,
          ru: nameRu,
          id: groupTourRaw.name?.id as number,
        });
      }

      if (
        price !== Number(groupTourRaw.price) / 100 ||
        oldPrice !== Number(groupTourRaw.oldPrice) / 100 ||
        countryId !== groupTourRaw.countryId ||
        groupTourRaw.upTo2 / 100 !== upTo2 ||
        groupTourRaw.upTo4 / 100 !== upTo4 ||
        groupTourRaw.upTo6 / 100 !== upTo6 ||
        groupTourRaw.upTo10 / 100 !== upTo10 ||
        groupTourRaw.oldUpTo2 / 100 !== oldUpTo2 ||
        groupTourRaw.oldUpTo4 / 100 !== oldUpTo4 ||
        groupTourRaw.oldUpTo6 / 100 !== oldUpTo6 ||
        groupTourRaw.oldUpTo10 / 100 !== oldUpTo10
      ) {
        otherUpdatesLetsTripGroupTour({
          callback() {
            addNotification('country and prices changed');
          },
          tourId: groupTourRaw.tourId as number,
          countryId: countryId as number,
          price: price * 100,
          oldPrice: oldPrice * 100,
          upTo2: upTo2 * 100,
          upTo4: upTo4 * 100,
          upTo6: upTo6 * 100,
          upTo10: upTo10 * 100,
          oldUpTo2: oldUpTo2 * 100,
          oldUpTo4: oldUpTo4 * 100,
          oldUpTo6: oldUpTo6 * 100,
          oldUpTo10: oldUpTo10 * 100,
          freeCancellation: {
            day: freeCancellationDay,
            hour: freeCancellationHour,
          },
        });
      }

      if (
        groupTourRaw.description[0].en !== descriptionEn ||
        groupTourRaw.description[0].ru !== descriptionRu
      ) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('description changed');
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
          },
          en: priceNoteEn,
          ru: priceNoteRu,
          id: groupTourRaw?.priceNote.id as number,
        });
      }
      updatePriceIncludesGroupTour({
        callback() {
          addNotification('price includes changed');
        },
        en: priceIncludes.map((item) => item.priceIncludeEn),
        ru: priceIncludes.map((item) => item.priceIncludeRu),
        id: groupTourRaw.priceIncludes.id as number,
      });

      updatePriceIncludesGroupTour({
        callback() {
          addNotification('price not includes changed');
        },
        en: priceNotIncludes.map((item) => item.priceNotIncludeEn),
        ru: priceNotIncludes.map((item) => item.priceNotIncludeRu),
        id: groupTourRaw.priceNotIncludes.id as number,
      });

      tourItenarary.filter((el) => {
        if (!el.id) {
          return addItenararyLetsTripGroupTour({
            callback() {
              addNotification('add tour itenarary');
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
              imageUrl: 'https://files.coreteam.uz/api/v1/media/open/1180', // `${FILE_URL}/${el.itineraryImgUrl?.file?.response?.ids[0]?.id}`,
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
      //       history.back()
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
          },
          tourId: groupTourRaw.tourId as number,
          images: newImages,
        });
      }

      const filterEnglishInfo = extraInformation[0]?.en.filter((item: any) => !item.id);

      const filterRussianInfo = extraInformation[0]?.ru.filter((item: any) => !item.id);

      if (filterEnglishInfo.length) {
        addExtraInfoLetsTripGroupTour({
          callback() {
            addNotification('successfully added extra info');
          },
          tourId: groupTourRaw.tourId,
          items: filterEnglishInfo,
          lang: Lang.En,
        });
      }

      if (filterRussianInfo.length) {
        addExtraInfoLetsTripGroupTour({
          callback() {
            addNotification('successfully added extra info');
          },
          tourId: groupTourRaw.tourId,
          items: filterRussianInfo,
          lang: Lang.Ru,
        });
      }
      history.back();
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

  const [countryCode, setCountryCode] = useState(
    globalCountries?.find((c) => c.id === groupTourRaw?.countryId)?.code === 'UZ',
  );

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

  // const handleChange2: UploadProps['onChange'] = ({ fileList: newFileList }) =>
  //   setFileList2(newFileList);

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

    if (id) {
      getOneRawLetsTripTour({
        id: id as string,
      });
    }

    if (groupTourRaw?.locations) setLetsTripGroupTourLocations(groupTourRaw?.locations);

    if (errors) addNotification(errors);
  }, [errors, id]);

  return (
    <>
      <BaseForm
        name="letsTripGroupTourForm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={() => {}}
      >
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <BaseForm.Item name="nameEn" label={'name english'} rules={[{ required: true }]}>
              <Input name="nameEn" placeholder="Enter a english name ?" />
            </BaseForm.Item>
          </Col>
          <Col span={12}>
            <BaseForm.Item name="nameRu" label={'name russian'} rules={[{ required: true }]}>
              <Input name="nameRu" placeholder="Enter a russian name ?" />
            </BaseForm.Item>
          </Col>

          <Col span={12}>
            <BaseForm.Item name="cityEn" label={'city name english'} rules={[{ required: false }]}>
              <Input name="cityEn" placeholder="Enter a english city name ?" />
            </BaseForm.Item>
          </Col>
          <Col span={12}>
            <BaseForm.Item name="cityRu" label={'city name russian'} rules={[{ required: false }]}>
              <Input name="cityRu" placeholder="Enter a russian city name ?" />
            </BaseForm.Item>
          </Col>

          <Col span={12}>
            <BaseForm.Item
              name="priceNoteEn"
              label={'price note english'}
              rules={[{ required: true }]}
            >
              <Input name="priceNoteEn" type="string" placeholder="Enter a price note english ?" />
            </BaseForm.Item>
          </Col>
          <Col span={12}>
            <BaseForm.Item
              style={{ width: '100%' }}
              name="priceNoteRu"
              label={'price note russian'}
              rules={[{ required: true }]}
            >
              <Input name="priceNoteRu" type="string" placeholder="Enter a price note russian  ?" />
            </BaseForm.Item>
          </Col>

          {/* price */}
          <Col span={countryCode ? 0 : 12}>
            <BaseForm.Item name="price" label={'excursion price ($)'} rules={[{ required: true }]}>
              <InputNumber
                $block
                name="price"
                type="number"
                placeholder="Enter a excursion price ?"
              />
            </BaseForm.Item>
          </Col>
          <Col span={countryCode ? 0 : 12}>
            <BaseForm.Item
              name="oldPrice"
              label={<OldPrice>excursion old price ($)</OldPrice>}
              rules={[{ required: true }]}
            >
              <InputNumber
                $block
                name="oldPrice"
                type="number"
                placeholder="Enter a excursion old price ?"
              />
            </BaseForm.Item>
          </Col>

          <Col span={24}>
            <BaseForm.Item
              name="countryId"
              style={{ width: '100%' }}
              label={'select country'}
              rules={[{ required: true, message: 'country is required!' }]}
            >
              <Select placeholder="Select country?" options={selectOptionCountry} />
            </BaseForm.Item>
          </Col>

          {countryCode ? (
            <>
              {/* per person prices */}
              <Col span={6}>
                <BaseForm.Item
                  name="upTo2"
                  label={'2 per person price ($)'}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    $block
                    name="upTo2"
                    type="number"
                    placeholder="2 per person price ($) ?"
                  />
                </BaseForm.Item>
              </Col>
              <Col span={6}>
                <BaseForm.Item
                  name="upTo4"
                  label={'4 per person price ($)'}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    $block
                    name="upTo4"
                    type="number"
                    placeholder="4 per person price ($) ?"
                  />
                </BaseForm.Item>
              </Col>
              <Col span={6}>
                <BaseForm.Item
                  name="upTo6"
                  label={'6 per person price ($)'}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    $block
                    name="upTo6"
                    type="number"
                    placeholder="6 per person price ($) ?"
                  />
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

              {/* per person old prices */}
              <Col span={6}>
                <BaseForm.Item
                  name="oldUpTo2"
                  label={<OldPrice>2 per person old price ($)</OldPrice>}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    $block
                    name="oldUpTo2"
                    type="number"
                    placeholder="2 per person old price ($) ?"
                  />
                </BaseForm.Item>
              </Col>
              <Col span={6}>
                <BaseForm.Item
                  name="oldUpTo4"
                  label={<OldPrice>4 per person old price ($)</OldPrice>}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    $block
                    name="oldUpTo4"
                    type="number"
                    placeholder="4 per person price ($) ?"
                  />
                </BaseForm.Item>
              </Col>
              <Col span={6}>
                <BaseForm.Item
                  name="oldUpTo6"
                  label={<OldPrice>6 per person price ($)</OldPrice>}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    $block
                    name="oldUpTo6"
                    type="number"
                    placeholder="6 per person old price ($) ?"
                  />
                </BaseForm.Item>
              </Col>
              <Col span={6}>
                <BaseForm.Item
                  name="oldUpTo10"
                  label={<OldPrice>10 per person old price ($)</OldPrice>}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    $block
                    name="oldPpTo10"
                    type="number"
                    placeholder="10 per person old price ($) ?"
                  />
                </BaseForm.Item>
              </Col>
            </>
          ) : null}

          <Col span={12}>
            <BaseForm.Item
              name="freeCancellationDay"
              label="Free cancellation day"
              rules={[{ required: false }]}
            >
              <InputNumber min={0} $block placeholder="Free cancellation day" />
            </BaseForm.Item>
          </Col>
          <Col span={12}>
            <BaseForm.Item
              name="freeCancellationHour"
              label="Free cancellation hour"
              rules={[{ required: false }]}
            >
              <InputNumber min={0} max={23} $block placeholder="Free cancellation hour" />
            </BaseForm.Item>
          </Col>

          <BaseForm.Item
            style={{ width: '100%' }}
            name="descriptionEn"
            label={'description english'}
            rules={[{ required: true }]}
          >
            <TextArea name="descriptionEn" placeholder="Enter a english description ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="descriptionRu"
            label={'description russian'}
            rules={[{ required: true }]}
          >
            <TextArea name="descriptionRu" placeholder="Enter a russian description ? " />
          </BaseForm.Item>
          <Col span={24}>
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
          </Col>

          <Col span={24}>
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
                          <Row gutter={12}>
                            <Col>
                              <Icon
                                color="blue"
                                size="large"
                                name="EditOutlined"
                                onClick={() => {
                                  setItenararyItem(groupTourRaw?.tourItenarary[field.name]);
                                  setModal(true);
                                }}
                              />
                            </Col>
                            <Col>
                              <Icon
                                size="large"
                                color="red"
                                name="DeleteOutlined"
                                onClick={() => {
                                  handleItenararyDelete(field, remove);
                                }}
                              />
                            </Col>
                          </Row>
                        }
                      >
                        <Row gutter={12}>
                          <Col span={8}>
                            <BaseForm.Item
                              style={{ width: '100%' }}
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
                              style={{ width: '100%' }}
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
                              style={{ width: '100%' }}
                              name={[field.name, 'itineraryItemOrder']}
                              label={'itinerary item order'}
                              rules={[{ required: true }]}
                            >
                              <InputNumber
                                style={{ width: '100%' }}
                                width={'100%'}
                                name="itineraryItemOrder"
                                type="number"
                                placeholder="Enter a itinerary item order ?"
                              />
                            </BaseForm.Item>
                          </Col>
                        </Row>

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
                                  <Row gutter={12}>
                                    <Col span={12}>
                                      <BaseForm.Item
                                        style={{ width: '100%' }}
                                        name={[subField.name, 'itineraryItemDescOrder']}
                                        label={'itinerary item description order'}
                                        rules={[
                                          {
                                            required: true,
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
                                    </Col>
                                    <Col span={12}>
                                      <BaseForm.Item
                                        style={{ width: '100%' }}
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
                                    style={{ width: '100%' }}
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
                                      setContents={
                                        groupTourRaw?.tourItenarary?.[field.name]?.descriptions?.[
                                          subField.name
                                        ]?.items?.[0]?.en
                                      }
                                      placeholder="Enter a itinerary description english ?"
                                    />
                                    {/* <TextArea
                                    name="itineraryDescEn"
                                    placeholder="Enter a itinerary description english ?"
                                  /> */}
                                  </BaseForm.Item>
                                  <BaseForm.Item
                                    style={{ width: '100%' }}
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
                                      setContents={
                                        groupTourRaw?.tourItenarary?.[field.name]?.descriptions?.[
                                          subField.name
                                        ]?.items?.[0]?.ru
                                      }
                                      // setContents={groupTourRaw?.tourItenarary}
                                      placeholder="Enter a itinerary description russian ?"
                                    />
                                    {/* <TextArea
                                    name="itineraryDescRu"
                                    placeholder="Enter a itinerary description russian ?"
                                  /> */}
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
                        {/* <BaseForm.Item
                        key={field.key}
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
                                      groupTourRaw?.tourItenarary[field.name]?.imageUrl +
                                      field.name,
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
                      </BaseForm.Item> */}
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
          </Col>
          <Col span={24}>
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
                          rules={[{ required: false, message: 'field required' }]}
                        >
                          <Input disabled />
                        </BaseForm.Item>
                        <BaseForm.Item
                          label="ENGLISH"
                          initialValue={{ EN: 'EN' }}
                          rules={[{ required: false, message: 'field required' }]}
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
          </Col>

          <Col span={24}>
            <BaseForm.List
              name="priceIncludes"
              rules={[
                {
                  validator: async (_, priceNotIncludes) => {
                    if (!priceNotIncludes.length) {
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
                      key={field.name}
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
                        <Col span={24}>
                          <BaseForm.Item
                            name={[field.name, 'priceIncludeEn']}
                            label={'price include english'}
                            rules={[{ required: true }]}
                          >
                            <TextArea placeholder="Enter a price include english ?" />
                          </BaseForm.Item>
                        </Col>
                        <Col span={24}>
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
                  validator: async (_, priceIncludes) => {
                    if (!priceIncludes.length) {
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
                      key={field.name}
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
                        <Col span={24}>
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
                        <Col span={24}>
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
          </Col>
          <PrimaryBtn style={{ marginTop: '15px' }} htmlType="submit" loading={post || patch}>
            Edit
          </PrimaryBtn>
        </Row>
      </BaseForm>

      <LestTripGroupTourItenararyModal />
    </>
  );
};
