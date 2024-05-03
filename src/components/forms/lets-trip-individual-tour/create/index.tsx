import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Icon, InputNumber, PrimaryBtn, TextArea } from '@/components';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import { Flex, GetProp, Image, Input, Select, Upload, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Id, IValuesForm } from '../types';
import * as S from './styled';
import { UploadFile } from 'antd/lib';

export const LestTripIndividualTourCreateForm: React.FC = () => {
  const [form] = BaseForm.useForm();
  const { countries } = useTypedSelector((state) => state.letsTripCountry);
  const {
    loading: { post },
    errors,
  } = useTypedSelector((state) => state.letsTripIndividualTour);
  const { createLetsTripIndividualTour, getAllLetsTripCountry } = useActions();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [fileList3, setFileList3] = useState<UploadFile[]>([]);
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
    tourItenararyDescriptionRu,
    tourItenararyDescriptionEn,
    tourItenararyDescriptionImgUrl,
    tourItenararyTitleRu,
    tourItenararyTitleEn,
    descriptionRu,
    descriptionEn,
    startingPrice,
    tourPrice,
    tourPriceDescriptionRu,
    tourPriceDescriptionEn,
    countryId,
  }: IValuesForm) => {
    createLetsTripIndividualTour({
      callback() {
        addNotification('successfully added tour');
        navigate(ROUTES.letsTripIndividualTour);
      },
      name: { en: nameEn, ru: nameRu },
      duration: { en: durationEn, ru: durationRu },
      countryId,
      images: images.fileList
        .map((item: UploadFile) => item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`))
        .flat(Infinity),
      videoUrl: videoUrl.fileList
        .map((item: UploadFile) => item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`))
        .flat(Infinity)[0],
      priceNote: {
        en: priceNoteEn,
        ru: priceNoteRu,
      },
      tourItenarary: [
        {
          imageUrl: tourItenararyDescriptionImgUrl.fileList
            .map((item: UploadFile) =>
              item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
            )
            .flat(Infinity)[0],
          description: [
            {
              en: tourItenararyDescriptionEn,
              ru: tourItenararyDescriptionRu,
            },
          ],
          title: {
            en: tourItenararyTitleEn,
            ru: tourItenararyTitleRu,
          },
        },
      ],
      description: [{ ru: descriptionRu, en: descriptionEn }],
      startingPrice,
      tourPrices: [
        {
          price: tourPrice,
          description: {
            en: tourPriceDescriptionEn,
            ru: tourPriceDescriptionRu,
          },
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
      name="letsTripIndividualTourForm"
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
            name="durationRu"
            label={'durationRu'}
            rules={[
              { required: true, message: 'durationRu is required?' },
              {
                type: 'string',
                message: 'Enter durationRu ?',
              },
            ]}
          >
            <Input name="durationRu" type="string" placeholder="Enter a durationRu ?" />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="durationEn"
            label={'durationEn'}
            rules={[
              { required: true, message: 'durationEn is required?' },
              {
                type: 'string',
                message: 'Enter durationEn ?',
              },
            ]}
          >
            <Input name="durationEn" type="string" placeholder="Enter a durationEn ?" />
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
            name="startingPrice"
            label={'startingPrice'}
            rules={[{ required: true, message: 'startingPrice is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="startingPrice"
              type="number"
              placeholder="Enter a startingPrice ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            name="tourPrice"
            style={{ width: '100%' }}
            label={'tourPrice'}
            rules={[{ required: true, message: 'tourPrice is required!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="tourPrice"
              type="number"
              placeholder="Enter a tourPrice ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="tourItenararyTitleRu"
            label={'tourItenararyTitleRu'}
            rules={[{ required: true, message: 'tourItenararyTitleRu is required?' }]}
          >
            <Input
              style={{ width: '100%' }}
              width={'100%'}
              name="tourItenararyTitleRu"
              type="string"
              placeholder="Enter a tourItenararyTitleRu ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="tourItenararyTitleEn"
            label={'tourItenararyTitleEn'}
            rules={[{ required: true, message: 'tourItenararyTitleEn is required?' }]}
          >
            <Input
              style={{ width: '100%' }}
              width={'100%'}
              name="tourItenararyTitleEn"
              type="string"
              placeholder="Enter a tourItenararyTitleEn ?"
            />
          </BaseForm.Item>
        </Flex>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="tourPriceDescriptionRu"
          label={'tourPriceDescriptionRu'}
          rules={[
            { required: true, message: 'tourPriceDescriptionRu is required?' },
            {
              type: 'string',
              message: 'Enter a tourPriceDescriptionRu ?',
            },
          ]}
        >
          <TextArea name="tourPriceDescriptionRu" placeholder="Enter a tourPriceDescriptionRu ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="tourPriceDescriptionEn"
          label={'tourPriceDescriptionEn'}
          rules={[
            { required: true, message: 'tourPriceDescriptionEn is required?' },
            {
              type: 'string',
              message: 'Enter a tourPriceDescriptionEn ?',
            },
          ]}
        >
          <TextArea name="tourPriceDescriptionEn" placeholder="Enter a tourPriceDescriptionEn ?" />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="tourItenararyDescriptionRu"
          label={'tourItenararyDescriptionRu'}
          rules={[
            { required: true, message: 'tourItenararyDescriptionRu is required?' },
            {
              type: 'string',
              message: 'Enter a tourItenararyDescriptionRu ?',
            },
          ]}
        >
          <TextArea
            name="tourItenararyDescriptionRu"
            placeholder="Enter a tourItenararyDescriptionRu ?"
          />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="tourItenararyDescriptionEn"
          label={'tourItenararyDescriptionEn'}
          rules={[
            { required: true, message: 'tourItenararyDescriptionEn is required?' },
            {
              type: 'string',
              message: 'Enter a tourItenararyDescriptionEn ?',
            },
          ]}
        >
          <TextArea
            name="tourItenararyDescriptionEn"
            placeholder="Enter a tourItenararyDescriptionEn ?"
          />
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
          name="images"
          label={'images'}
          rules={[{ required: true, message: 'images is required?', type: 'object' }]}
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
        <BaseForm.Item
          name="tourItenararyDescriptionImgUrl"
          label={'tourItenararyDescriptionImg'}
          rules={[
            {
              required: true,
              message: 'tourItenararyDescriptionImgUrl is required?',
              type: 'object',
            },
          ]}
        >
          <Upload.Dragger
            style={{ width: '100%' }}
            name="files"
            multiple={false}
            fileList={fileList2}
            onChange={handleChange2}
            onPreview={handlePreview2}
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
        <BaseForm.Item
          name="videoUrl"
          label={'video'}
          rules={[
            {
              required: true,
              message: 'videoUrl is required?',
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
        <PrimaryBtn htmlType="submit" loading={post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
