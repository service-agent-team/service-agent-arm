import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Input, PrimaryBtn, Select } from '@/components';
import { ICreateCarDirection } from '@/types';
import { Col, Row } from 'antd';
import { useEffect } from 'react';

export const TransferCarSettinsForm = () => {
  const [form] = BaseForm.useForm();
  const {
    transferCarSettings,
    globalCountries,
    countryRegions,
    setCarModal,
    getAllLetsTripTransfer,
  } = useActions();
  const {
    car_details: { select_car_id },
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
  }: ICreateCarDirection) => {
    transferCarSettings({
      carId: Number(select_car_id),
      direction: {
        sourceBoundaryId,
        destinationBoundaryId,
        hourlyPrice: +hourlyPrice,
        transferPrice: +transferPrice,
      },
      callback: () => {
        getAllLetsTripTransfer({
          page: 0,
          size: 30,
          callback() {},
        });
        setCarModal(false);
      },
    });
  };

  const changeCountry = (countryId: number) => {
    countryRegions({ countryId: countryId });
  };

  const sourceCountry = global_countries.map((el) => ({ value: el.id, label: el.name.en }));
  const regions = country_regions.map((el) => ({ value: el.id, label: el.name.en }));

  return (
    <BaseForm name="Car settins" form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={10}>
        <Col span={12}>
          <BaseForm.Item
            name="sourceCountryId"
            label={'Source Country'}
            rules={[{ required: true, message: 'category is required!' }]}
          >
            <Select
              options={sourceCountry}
              onChange={(e) => changeCountry(Number(e))}
              placeholder="Select Source Country"
            />
          </BaseForm.Item>
        </Col>
        <Col span={12}>
          <BaseForm.Item
            name="destinationCountryId"
            label={'Destination Country'}
            rules={[{ required: true, message: 'category is required!' }]}
          >
            <Select
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
            rules={[{ required: true, message: 'category is required!' }]}
          >
            <Select options={regions} placeholder="Select Source Boundary" />
          </BaseForm.Item>
        </Col>

        <Col span={12}>
          <BaseForm.Item
            name="destinationBoundaryId"
            label={'Destination Boundary'}
            rules={[{ required: true, message: 'category is required!' }]}
          >
            <Select options={regions} placeholder="Select Destination Boundary" />
          </BaseForm.Item>
        </Col>

        <Col span={12}>
          <BaseForm.Item
            name="transferPrice"
            label={'Transfer Price'}
            rules={[{ required: true, message: 'tariff name is required!' }]}
          >
            <Input placeholder="Enter tariff name" />
          </BaseForm.Item>
        </Col>
        <Col span={12}>
          <BaseForm.Item
            name="hourlyPrice"
            label={'Hourly Price'}
            rules={[{ required: true, message: 'tariff name is required!' }]}
          >
            <Input placeholder="Enter tariff name" />
          </BaseForm.Item>
        </Col>

        <PrimaryBtn htmlType="submit">Create</PrimaryBtn>
      </Row>
    </BaseForm>
  );
};
