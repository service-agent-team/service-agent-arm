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
    tourPriceUptoPersons,
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
          upToPersons: tourPriceUptoPersons,
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
            <Input name="priceNoteRu" type="string" placeholder="Enter a price note russian ?" />
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
        <Flex gap={'15px'}>
          <BaseForm.Item
            name="tour price"
            style={{ width: '100%' }}
            label={'tourPrice'}
            rules={[{ required: true, message: 'tour price is required!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="tourPrice"
              type="number"
              placeholder="Enter a tour price ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="tourPriceUptoPersons"
            label={'tour price up to persons'}
            rules={[{ required: true, message: 'tour price up to persons is required?' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              width={'100%'}
              name="tourPriceUptoPersons"
              type="number"
              placeholder="Enter a tour price up to persons ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="tourItenararyTitleRu"
            label={'tour itenarary title russian'}
            rules={[{ required: true, message: 'tour itenarary title russian is required?' }]}
          >
            <Input
              style={{ width: '100%' }}
              width={'100%'}
              name="tourItenararyTitleRu"
              type="string"
              placeholder="Enter a tour itenarary title russian ?"
            />
          </BaseForm.Item>
          <BaseForm.Item
            style={{ width: '100%' }}
            name="tourItenararyTitleEn"
            label={'tour itenarary title english'}
            rules={[{ required: true, message: 'tour itenarary title english is required?' }]}
          >
            <Input
              style={{ width: '100%' }}
              width={'100%'}
              name="tourItenararyTitleEn"
              type="string"
              placeholder="Enter a tour itenarary title english ?"
            />
          </BaseForm.Item>
        </Flex>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="tourPriceDescriptionRu"
          label={'tour price description russian'}
          rules={[
            { required: true, message: 'tour price description russian is required?' },
            {
              type: 'string',
              message: 'Enter a tour price description russian ?',
            },
          ]}
        >
          <TextArea
            name="tourPriceDescriptionRu"
            placeholder="Enter a tour price description russian ?"
          />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="tourPriceDescriptionEn"
          label={'tour price description english'}
          rules={[
            { required: true, message: 'tour price description english is required?' },
            {
              type: 'string',
              message: 'Enter a tour price description english ?',
            },
          ]}
        >
          <TextArea
            name="tourPriceDescriptionEn"
            placeholder="Enter a tour price description english ?"
          />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="tourItenararyDescriptionRu"
          label={'tour itenarary description russian'}
          rules={[
            { required: true, message: 'tour itenarary description russian is required?' },
            {
              type: 'string',
              message: 'Enter a tour itenarary description russian ?',
            },
          ]}
        >
          <TextArea
            name="tourItenararyDescriptionRu"
            placeholder="Enter a tour itenarary description russian ?"
          />
        </BaseForm.Item>
        <BaseForm.Item
          style={{ width: '100%' }}
          name="tourItenararyDescriptionEn"
          label={'tour itenarary description english'}
          rules={[
            { required: true, message: 'tour itenarary description english is required?' },
            {
              type: 'string',
              message: 'Enter a tour itenarary description english ?',
            },
          ]}
        >
          <TextArea
            name="tourItenararyDescriptionEn"
            placeholder="Enter a tour itenarary description english ?"
          />
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
          name="tourItenararyDescriptionImgUrl"
          label={'tour itenarary description image'}
          rules={[
            {
              required: true,
              message: 'tour itenarary description image is required?',
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
          name="videoUrl"
          label={'video'}
          rules={[
            {
              required: true,
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
        <PrimaryBtn htmlType="submit" loading={post}>
          create
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
