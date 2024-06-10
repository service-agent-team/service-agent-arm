import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate } from 'react-router-dom';
import { IValuesForm } from './types';
import { ROUTES } from '@/constants';
import * as S from './styled';
import { Col, Input, Row } from 'antd';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { IGoogleMouseEvent } from '../../lets-trip-tour/types';
import toast from 'react-hot-toast';

export const GlobalCountryForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createGlobalCountry, setGlobalCountryLocations } = useActions();
  const { locations, loading } = useTypedSelector((state) => state.letsTripGlobalCountry);
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyALfqQ3ezC7K1GxmJ1e5EMqdQzrXdrDcdA',
  });
  const center = { lat: 41.875734, lng: 64.017636 };

  const onFinish = ({ code, nameEn, nameRu, nameUz }: IValuesForm) => {
    if (locations.length < 2) {
      return toast.error('location required', { position: 'top-right' });
    }
    if (type === 'create') {
      const name = { en: nameEn, ru: nameRu, uz: nameUz };
      createGlobalCountry({
        body: {
          name,
          code,
          upperCorner: { longitude: locations[0].lng, latitude: locations[0].lat },
          lowerCorner: { longitude: locations[1].lng, latitude: locations[1].lat },
          parentId: 1,
        },
        callback: () => {
          addNotification('global country created');
          navigate(ROUTES.letsTripGlobalCountry);
          setGlobalCountryLocations(null);
        },
      });
    } else if (type === 'edit') {
      return;
    }
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
          loading={type === 'edit' ? loading.put : loading.post}
        >
          {type === 'create' ? 'create' : 'edit'}
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
