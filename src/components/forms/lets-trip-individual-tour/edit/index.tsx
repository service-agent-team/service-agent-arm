import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, modal, PrimaryBtn, TextArea } from '@/components';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import { Button, Card, Flex, GetProp, Image, Input, Select, Upload, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Id, IValuesForm } from '../types';
import * as S from './styled';
import { UploadFile } from 'antd/lib';

export const LestTripIndividualTourEditForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { countries } = useTypedSelector((state) => state.letsTripCountry);
  const {
    loading: { post, patch },
    individualTourRaw,
    errors,
  } = useTypedSelector((state) => state.letsTripIndividualTour);
  const {
    getAllLetsTripCountry,
    updateByObjectLetsTripGroupTour,
    addImageLetsTripIndividualTour,
    deleteImageLetsTripIndividualTour,
    addPriceLetsTripIndividualTour,
    removePriceLetsTripIndividualTour,
    addItenararyLetsTripIndividualTour,
    removeItenararyLetsTripIndividualTour,
  } = useActions();
  const [fileList, setFileList] = useState<UploadFile[]>(
    individualTourRaw?.images.map((el) => ({ uid: el, name: el, url: el, status: 'done' })) || [],
  );
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [fileList3, setFileList3] = useState<UploadFile[]>(
    individualTourRaw?.videoUrl
      ? [
          {
            uid: individualTourRaw?.videoUrl,
            name: individualTourRaw?.videoUrl,
            url: individualTourRaw?.videoUrl,
            status: 'done',
          },
        ]
      : [],
  );
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onFinish = ({
    nameRu,
    nameEn,
    durationRu,
    durationEn,
    images,
    videoUrl,
    priceNoteRu,
    priceNoteEn,
    descriptionRu,
    descriptionEn,
    startingPrice,
    countryId,
    tourItenarary,
    tourPrices,
  }: IValuesForm) => {
    if (individualTourRaw) {
      if (individualTourRaw.name.en !== nameEn || individualTourRaw.name.ru !== nameRu) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('name changed');
          },
          ru: nameRu,
          en: nameEn,
          id: individualTourRaw.name.id as number,
        });
      }

      if (
        individualTourRaw.duration.en !== durationEn ||
        individualTourRaw.duration.ru !== durationRu
      ) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('duration changed');
          },
          en: durationEn,
          ru: durationRu,
          id: individualTourRaw.duration.id as number,
        });
      }

      if (
        individualTourRaw.description[0].en !== descriptionEn ||
        individualTourRaw.description[0].ru !== descriptionRu
      ) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('description changed');
          },
          en: descriptionEn,
          ru: descriptionRu,
          id: individualTourRaw.description[0].id as number,
        });
      }

      if (
        individualTourRaw.priceNote.en !== priceNoteEn ||
        individualTourRaw.priceNote.ru !== priceNoteRu
      ) {
        updateByObjectLetsTripGroupTour({
          callback() {
            addNotification('priceNote changed');
          },
          en: priceNoteEn,
          ru: priceNoteRu,
          id: individualTourRaw.priceNote.id as number,
        });
      }

      // if (
      //   startingPrice !== individualTourRaw.startingPrice ||
      //   countryId !== individualTourRaw.country.id ||
      //   videoUrl?.file?.url !== individualTourRaw.videoUrl
      // ) {
      //   console.log('changed');
      // }

      const newPrices = tourPrices?.filter((p) => !p?.id);

      if (newPrices?.length) {
        newPrices.forEach((el) => {
          addPriceLetsTripIndividualTour({
            callback() {
              addNotification('price added');
            },
            tourId: individualTourRaw.id as number,
            price: el.tourPrice,
            upToPersons: el.tourPriceUptoPersons,
            description: {
              en: el.tourPriceDescriptionEn,
              ru: el.tourPriceDescriptionRu,
            },
          });
        });
      }

      // console.log(images);
      // console.log(videoUrl);
      // console.log(tourItenarary);
    }
  };

  const handlePriceDelete = (field: any, remove: any) => {
    const existPrice = individualTourRaw?.tourPrices[field.key];

    if (existPrice) {
      modal.confirm({
        okText: 'Delete',
        title: `You want to delete right ?`,
        onOk() {
          removePriceLetsTripIndividualTour({
            callback() {
              addNotification('price deleted');
              remove(field.name);
            },
            tourId: individualTourRaw.id as number,
            tourPriceId: existPrice.id as number,
          });
        },
      });
    } else remove(field.name);
  };

  const handleItenararyDelete = (field: any, remove: any) => {
    const existItenarary = individualTourRaw?.tourItenarary[field.key];

    if (existItenarary) {
      modal.confirm({
        okText: 'Delete',
        title: `You want to delete right ?`,
        onOk() {
          removeItenararyLetsTripIndividualTour({
            callback() {
              addNotification('itenarary deleted');
              remove(field.name);
            },
            tourId: individualTourRaw.id as number,
            tourItenararyItemId: existItenarary.id as number,
          });
        },
      });
    } else remove(field.name);
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

  const handleChange3: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList3(newFileList);

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

  const handlePreview3 = async (file: UploadFile) => {
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
      name="letsTripIndividualTourEditForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
      initialValues={{
        nameEn: individualTourRaw?.name.en,
        nameRu: individualTourRaw?.name.ru,
        durationEn: individualTourRaw?.duration.en,
        durationRu: individualTourRaw?.duration.ru,
        countryId: individualTourRaw?.country.id,
        startingPrice: individualTourRaw?.startingPrice,
        tourPrices: individualTourRaw?.tourPrices.map((el) => ({
          id: 1,
          tourPrice: el.price,
          tourPriceUptoPersons: el.upToPersons,
          tourPriceDescriptionEn: el.description.en,
          tourPriceDescriptionRu: el.description.ru,
        })),
        tourItenarary: individualTourRaw?.tourItenarary?.map((el) => ({
          tourItenararyTitleEn: el.title.en,
          tourItenararyTitleRu: el.title.ru,
          tourItenararyDescriptionEn: el.description[0].en,
          tourItenararyDescriptionRu: el.description[0].ru,
        })),
        descriptionEn: individualTourRaw?.description[0].en,
        descriptionRu: individualTourRaw?.description[0].ru,
        priceNoteEn: individualTourRaw?.priceNote.en,
        priceNoteRu: individualTourRaw?.priceNote.ru,
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
            name="durationEn"
            label={'duration english'}
            rules={[
              { required: true, message: 'duration english is required?' },
              {
                type: 'string',
                message: 'Enter duration english ?',
              },
            ]}
          >
            <Input name="durationEn" type="string" placeholder="Enter a duration english ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="durationRu"
            label={'duration russian'}
            rules={[
              { required: true, message: 'duration russian is required?' },
              {
                type: 'string',
                message: 'Enter duration russian ?',
              },
            ]}
          >
            <Input name="durationRu" type="string" placeholder="Enter a duration russian ?" />
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
            <Input name="priceNoteRu" type="string" placeholder="Enter a price note russian ?" />
          </BaseForm.Item>
          <BaseForm.Item
            name="countryId"
            style={{ width: '100%' }}
            label={'select country'}
            rules={[{ required: true, message: 'country is required!' }]}
          >
            <Select placeholder="Select country?" options={selectOptionCountry} />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="startingPrice"
            label={'starting price'}
            rules={[{ required: true, message: 'starting price is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="startingPrice"
              type="number"
              placeholder="Enter a starting price ?"
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
          rules={[{ message: 'images is required?', type: 'object' }]}
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
              if (individualTourRaw && file)
                deleteImageLetsTripIndividualTour({
                  callback() {
                    addNotification('remove image ');
                  },
                  tourId: individualTourRaw?.id,
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
        <BaseForm.Item
          name="videoUrl"
          label={'video'}
          rules={[
            {
              message: 'video is required?',
              type: 'object',
            },
          ]}
        >
          <Upload.Dragger
            style={{ width: '100%' }}
            name="files"
            multiple={false}
            fileList={fileList3}
            onChange={handleChange3}
            onPreview={handlePreview3}
            beforeUpload={(file) => file.type.split('/')[0] === 'video'}
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
        <BaseForm.List name="tourItenarary">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field) => (
                <Card
                  key={field.key}
                  size="small"
                  title={`${field.key + 1}. individual tour itinerary`}
                  extra={
                    <Icon
                      name="CloseOutlined"
                      onClick={() => {
                        handleItenararyDelete(field, remove);
                      }}
                    />
                  }
                >
                  <Flex gap={'15px'}>
                    <BaseForm.Item
                      style={{ width: '100%' }}
                      name={[field.name, 'tourItenararyTitleEn']}
                      label={'tour itenarary title english'}
                      rules={[
                        { required: true, message: 'tour itenarary title english is required?' },
                      ]}
                    >
                      <Input
                        style={{ width: '100%' }}
                        width={'100%'}
                        type="string"
                        placeholder="Enter a tour itenarary title english ?"
                      />
                    </BaseForm.Item>
                    <BaseForm.Item
                      style={{ width: '100%' }}
                      name={[field.name, 'tourItenararyTitleRu']}
                      label={'tour itenarary title russian'}
                      rules={[
                        { required: true, message: 'tour itenarary title russian is required?' },
                      ]}
                    >
                      <Input
                        style={{ width: '100%' }}
                        width={'100%'}
                        type="string"
                        placeholder="Enter a tour itenarary title russian ?"
                      />
                    </BaseForm.Item>
                  </Flex>
                  <BaseForm.Item
                    style={{ width: '100%' }}
                    name={[field.name, 'tourItenararyDescriptionEn']}
                    label={'tour itinerary description english'}
                    rules={[
                      {
                        required: true,
                        message: 'tour itinerary description english is required?',
                      },
                      {
                        type: 'string',
                        message: 'Enter a tour itinerary description english ?',
                      },
                    ]}
                  >
                    <TextArea placeholder="Enter a tour itinerary description english ?" />
                  </BaseForm.Item>
                  <BaseForm.Item
                    style={{ width: '100%' }}
                    name={[field.name, 'tourItenararyDescriptionRu']}
                    label={'tour itinerary description russian'}
                    rules={[
                      {
                        required: true,
                        message: 'tour itinerary description russian is required?',
                      },
                      {
                        type: 'string',
                        message: 'Enter a tour itinerary description russian ?',
                      },
                    ]}
                  >
                    <TextArea placeholder="Enter a tour itinerary description russian ?" />
                  </BaseForm.Item>
                  <BaseForm.Item
                    name={[field.name, 'tourItenararyImgUrl']}
                    label={'tour itenarary image'}
                    rules={[
                      {
                        message: 'tour itenarary image is required?',
                        type: 'object',
                      },
                    ]}
                  >
                    <Upload.Dragger
                      style={{ width: '100%' }}
                      listType="picture"
                      name="files"
                      multiple={false}
                      fileList={
                        individualTourRaw
                          ? [
                              {
                                uid:
                                  individualTourRaw?.tourItenarary[field.key]?.imageUrl + field.key,
                                name: individualTourRaw?.tourItenarary[field.key]?.imageUrl,
                                url: individualTourRaw?.tourItenarary[field.key]?.imageUrl,
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
                </Card>
              ))}
              <BaseForm.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<Icon name="PlusOutlined" />}
                >
                  add individual tour itenarary ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
            </div>
          )}
        </BaseForm.List>
        <BaseForm.List name="tourPrices">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field) => (
                <Card
                  key={field.key}
                  size="small"
                  title={`${field.key + 1}. individual tour price`}
                  extra={
                    <Icon
                      name="CloseOutlined"
                      onClick={() => {
                        handlePriceDelete(field, remove);
                      }}
                    />
                  }
                >
                  <Flex gap={'15px'}>
                    <BaseForm.Item
                      name={[field.name, 'tourPrice']}
                      style={{ width: '100%' }}
                      label={'tour price $ (per person)'}
                      rules={[{ required: true, message: 'tour per person price is required!' }]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        width={'100%'}
                        type="number"
                        placeholder="Enter a tour price per person ?"
                      />
                    </BaseForm.Item>
                    <BaseForm.Item
                      style={{ width: '100%' }}
                      name={[field.name, 'tourPriceUptoPersons']}
                      label={'tour price up to person'}
                      rules={[{ required: true, message: 'tour price up to person is required?' }]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        width={'100%'}
                        type="number"
                        placeholder="Enter a tour price up to person ?"
                      />
                    </BaseForm.Item>
                  </Flex>
                  <BaseForm.Item
                    style={{ width: '100%' }}
                    name={[field.name, 'tourPriceDescriptionEn']}
                    label={'tour price description english'}
                    rules={[
                      { required: true, message: 'tour price description english is required?' },
                      {
                        type: 'string',
                        message: 'Enter a tour price description english ?',
                      },
                    ]}
                  >
                    <TextArea placeholder="Enter a tour price description english ?" />
                  </BaseForm.Item>
                  <BaseForm.Item
                    style={{ width: '100%' }}
                    name={[field.name, 'tourPriceDescriptionRu']}
                    label={'tour price description russian'}
                    rules={[
                      { required: true, message: 'tour price description russian is required?' },
                      {
                        type: 'string',
                        message: 'Enter a tour price description russian ?',
                      },
                    ]}
                  >
                    <TextArea placeholder="Enter a tour price description russian ?" />
                  </BaseForm.Item>
                </Card>
              ))}
              <BaseForm.Item>
                <Button
                  block
                  type="dashed"
                  onClick={() => add()}
                  icon={<Icon name="PlusOutlined" />}
                >
                  add individual tour price ({fields.length}) {fields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
            </div>
          )}
        </BaseForm.List>
        <PrimaryBtn htmlType="submit" loading={post || patch}>
          Edit
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
