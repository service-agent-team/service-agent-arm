import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Input, PrimaryBtn, Select } from '@/components';
import { ICreateCarDirection } from '@/types';
import { Col, Row } from 'antd';
import { useEffect } from 'react';

export const TransferCarSettingsForm = () => {
  const [form] = BaseForm.useForm();

  const {
    transferCarSettings,
    globalCountries,
    countryRegions,
    setCarModal,
    updateTransferDirectionPrice,
  } = useActions();

  const {
    car_details: { select_car_id, select_car_direction },
    modal: { type },
    global_countries,
    country_regions,
  } = useTypedSelector((state) => state.letsTripTransfer);

  useEffect(() => {
    globalCountries({});
  }, []);

  const onFinish = ({
    sourceBoundaryId,
    destinationBoundaryId,
    hourlyPrice,
    transferPrice,
    oldHourlyPrice,
    oldTransferPrice,
  }: ICreateCarDirection) => {
    if (type === 'create') {
      transferCarSettings({
        carId: Number(select_car_id),
        direction: {
          sourceBoundaryId,
          destinationBoundaryId,
          hourlyPrice: +hourlyPrice * 100,
          transferPrice: +transferPrice * 100,
          oldHourlyPrice: +oldHourlyPrice * 100,
          oldTransferPrice: +oldTransferPrice * 100,
        },
        callback: () => {
          setCarModal(false);
        },
      });
    } else if (type === 'edit') {
      updateTransferDirectionPrice({
        callback() {
          addNotification('Successfully updated transfer direction price');
          setCarModal(false);
        },
        carId: Number(select_car_id),
        directionId: Number(select_car_direction?.id),
        body: {
          hourlyPrice: +hourlyPrice * 100,
          transferPrice: +transferPrice * 100,
          oldHourlyPrice: +oldHourlyPrice * 100,
          oldTransferPrice: +oldTransferPrice * 100,
        },
      });
    }
  };

  const changeCountry = (countryId: number) => {
    countryRegions({ countryId: countryId });
  };

  useEffect(() => {
    if (type === 'edit' && select_car_direction) {
      const {
        transferPrice,
        hourlyPrice,
        oldTransferPrice,
        oldHourlyPrice,
        sourceBoundary,
        destinationBoundary,
      } = select_car_direction;

      form.setFieldsValue({
        sourceCountryId: { label: sourceBoundary.name.en, value: sourceBoundary.id },
        sourceBoundaryId: { label: sourceBoundary.name.en, value: sourceBoundary.id },
        destinationCountryId: { label: destinationBoundary.name.en, value: destinationBoundary.id },
        destinationBoundaryId: {
          label: destinationBoundary.name.en,
          value: destinationBoundary.id,
        },
        transferPrice: transferPrice / 100,
        hourlyPrice: hourlyPrice / 100,
        oldTransferPrice: oldTransferPrice / 100,
        oldHourlyPrice: oldHourlyPrice / 100,
      });
    } else {
      form.resetFields();
    }
  }, [select_car_direction, type]);

  const sourceCountry = global_countries.map((el) => ({ value: el.id, label: el.name.en }));
  const regions = country_regions.map((el) => ({ value: el.id, label: el.name.en }));

  return (
    <BaseForm name="Car settings" form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={10}>
        <Col span={12}>
          <BaseForm.Item
            name="sourceCountryId"
            label={'Source Country'}
            rules={[{ required: true, message: 'Source Country is required!' }]}
          >
            <Select
              options={sourceCountry}
              disabled={type === 'edit'}
              onChange={(e) => changeCountry(Number(e))}
              placeholder="Select Source Country"
            />
          </BaseForm.Item>
        </Col>
        <Col span={12}>
          <BaseForm.Item
            name="destinationCountryId"
            label={'Destination Country'}
            rules={[{ required: true, message: 'Destination Country is required!' }]}
          >
            <Select
              disabled={type === 'edit'}
              options={sourceCountry}
              onChange={(e) => changeCountry(Number(e))}
              placeholder="Select Destination Country"
            />
          </BaseForm.Item>
        </Col>

        <Col span={12}>
          <BaseForm.Item
            name="sourceBoundaryId"
            label={'Source Boundary'}
            rules={[{ required: true, message: 'Select Source Boundary is required!' }]}
          >
            <Select
              disabled={type === 'edit'}
              options={regions}
              placeholder="Select Source Boundary"
            />
          </BaseForm.Item>
        </Col>

        <Col span={12}>
          <BaseForm.Item
            name="destinationBoundaryId"
            label={'Destination Boundary'}
            rules={[{ required: true, message: 'Destination Boundary is required!' }]}
          >
            <Select
              disabled={type === 'edit'}
              options={regions}
              placeholder="Select Destination Boundary"
            />
          </BaseForm.Item>
        </Col>

        <Col span={12}>
          <BaseForm.Item
            name="transferPrice"
            label={'Transfer Price'}
            rules={[{ required: true, message: 'Transfer price is required!' }]}
          >
            <Input placeholder="Enter transfer price" />
          </BaseForm.Item>
        </Col>
        <Col span={12}>
          <BaseForm.Item
            name="hourlyPrice"
            label={'Hourly Price'}
            rules={[{ required: true, message: 'Hourly Price is required!' }]}
          >
            <Input placeholder="Enter hourly price" />
          </BaseForm.Item>
        </Col>

        <Col span={12}>
          <BaseForm.Item
            name="oldTransferPrice"
            label={'Old Transfer Price'}
            rules={[{ required: true, message: 'Old transfer price is required!' }]}
          >
            <Input placeholder="Enter transfer old price" />
          </BaseForm.Item>
        </Col>
        <Col span={12}>
          <BaseForm.Item
            name="oldHourlyPrice"
            label={'Old Hourly Price'}
            rules={[{ required: true, message: 'Old hourly Price is required!' }]}
          >
            <Input placeholder="Enter hourly old price" />
          </BaseForm.Item>
        </Col>

        <PrimaryBtn htmlType="submit">{type === 'create' ? 'Create' : 'Update'}</PrimaryBtn>
      </Row>
    </BaseForm>
  );
};
