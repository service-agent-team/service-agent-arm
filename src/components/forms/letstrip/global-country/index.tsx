import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, Icon, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate } from 'react-router-dom';
import { Id, IValuesForm } from './types';
import { BASE_URL, FILE_URL, ROUTES } from '@/constants';
import * as S from './styled';
import { Col, GetProp, Image, Input, Row, Upload, UploadFile } from 'antd';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { IGoogleMouseEvent } from '../../lets-trip-tour/types';
import toast from 'react-hot-toast';
import { UploadProps } from 'antd/lib';
import { useEffect, useState } from 'react';

export const GlobalCountryForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createGlobalCountry, setGlobalCountryLocations, updateImageGlobalCountry } = useActions();
  const { locations, loading, globalCountry } = useTypedSelector(
    (state) => state.letsTripGlobalCountry,
  );
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyALfqQ3ezC7K1GxmJ1e5EMqdQzrXdrDcdA',
  });

  const [fileList, setFileList] = useState<UploadFile[]>(
    (type === 'edit' &&
      globalCountry?.picture && [
        {
          uid: globalCountry?.picture,
          url: globalCountry?.picture,
          name: globalCountry?.picture,
          status: 'done',
        },
      ]) ||
      [],
  );
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const center = { lat: 41.875734, lng: 64.017636 };

  const onFinish = ({ code, nameEn, nameRu, nameUz, pictureUrl }: IValuesForm) => {
    if (locations.length < 2) {
      return toast.error('location required', { position: 'top-right' });
    }
    if (type === 'create') {
      const name = { en: nameEn, ru: nameRu, uz: nameUz };
      return createGlobalCountry({
        body: {
          name,
          code,
          upperCorner: { longitude: locations[0].lng, latitude: locations[0].lat },
          lowerCorner: { longitude: locations[1].lng, latitude: locations[1].lat },
          defaultLocation: { longitude: locations[2].lng, latitude: locations[2].lat },
          pictureUrl: pictureUrl?.fileList.flatMap((item: UploadFile) =>
            item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
          )[0],
        },
        callback: () => {
          addNotification('global country created');
          navigate(ROUTES.letsTripGlobalCountry);
          setGlobalCountryLocations(null);
        },
      });
    } else if (type === 'edit') {
      return updateImageGlobalCountry({
        callback() {
          addNotification('global country image updated');
          navigate(ROUTES.letsTripGlobalCountry);
          setGlobalCountryLocations(null);
        },
        body: {
          id: globalCountry?.id as number,
          pictureUrl: pictureUrl?.fileList.flatMap((item: UploadFile) =>
            item?.response?.ids?.map((file: Id) => `${FILE_URL}/${file.id}`),
          )[0],
        },
      });
    }
  };

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

  const handleMapClick = (event: IGoogleMouseEvent) => {
    if (event.latLng && locations.length < 2) {
      setGlobalCountryLocations([
        ...locations,
        { lng: event.latLng.lng(), lat: event.latLng.lat() },
      ]);
    }
  };

  const handleMaker = (loc: IGoogleMouseEvent) => {
    const existLocation = locations?.find(
      (l) => l.lat !== loc?.latLng?.lat() && l.lng !== loc.latLng?.lng(),
    );

    if (existLocation) {
      setGlobalCountryLocations(
        locations?.filter((l) => l.lat !== loc?.latLng?.lat() && l.lng !== loc.latLng?.lng()),
      );
    }
  };

  if (type === 'edit') {
    form.setFieldValue('nameEn', globalCountry?.name?.en);
    form.setFieldValue('nameRu', globalCountry?.name?.ru);
    form.setFieldValue('nameUz', globalCountry?.name?.uz);
    form.setFieldValue('code', globalCountry?.code);
  }

  useEffect(() => {
    if (type === 'edit') {
      setGlobalCountryLocations([
        {
          lat: Number(globalCountry?.upperCorner?.latitude),
          lng: Number(globalCountry?.upperCorner?.longitude),
        },
        {
          lat: Number(globalCountry?.lowerCorner?.latitude),
          lng: Number(globalCountry?.lowerCorner?.longitude),
        },
      ]);
    }
  }, []);

  return (
    <BaseForm
      initialValues={type === 'edit' ? {} : {}}
      name="letsTripCountryForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <S.FormContent>
        <Row gutter={10}>
          <Col span={6}>
            <BaseForm.Item
              name="nameEn"
              label={'name english'}
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'filed is required' }]}
            >
              <Input placeholder="Enter name english ?" />
            </BaseForm.Item>
          </Col>
          <Col span={6}>
            <BaseForm.Item
              name="nameRu"
              label={'name russian'}
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'filed is required' }]}
            >
              <Input placeholder="Enter name russian ?" />
            </BaseForm.Item>
          </Col>
          <Col span={6}>
            <BaseForm.Item
              name="nameUz"
              label={'name uzbek'}
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'filed is required' }]}
            >
              <Input placeholder="Enter nameRu ?" />
            </BaseForm.Item>
          </Col>
          <Col span={6}>
            <BaseForm.Item
              name="code"
              label={'country code'}
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'filed is required' }]}
            >
              <Input placeholder="Enter country code ?" />
            </BaseForm.Item>
          </Col>
          <Col span={24}>
            <BaseForm.Item
              name="pictureUrl"
              label={'country picture'}
              rules={[{ required: true, message: 'country picture is required?', type: 'object' }]}
            >
              <Upload.Dragger
                style={{ width: '100%' }}
                name="files"
                multiple={false}
                fileList={fileList}
                listType="picture"
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
        </Row>
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
              <Marker
                onClick={handleMaker}
                key={idx}
                position={loc}
                label={idx === 0 ? '⬆️' : '⬇️'}
              />
            ))}
          </GoogleMap>
        ) : null}
        <PrimaryBtn
          style={{ marginTop: 20 }}
          htmlType="submit"
          loading={type === 'edit' ? loading.patch : loading.post}
        >
          {type === 'create' ? 'Create' : 'Edit'}
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
