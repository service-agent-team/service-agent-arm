import { BaseButtonsForm, BaseForm, PrimaryBtn, Upload } from '@/components';
import { useActions, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { ICreateCarValues } from '@/pages/transfer/car/create-page/types.ts';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../users-form/styled';
import { normFile } from './util';

export const CarTypeForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createCar, editCar, getCar } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading } = useTypedSelector((state) => state.car);

  const onFinish = (value: ICreateCarValues) => {
    if (type === 'create') {
      createCar({
        file: value.file,
        carNumber: value.carNumber,
        modelId: +value.modelId,
        callback: () => {
          getCar({ callback: () => {} });
          addNotification('created');
          navigate('/transfer/cars');
        },
      });
      // form.resetFields();
    } else if (type === 'edit') {
      editCar({
        id: id as string,
        number: value.carNumber,
        modelId: +value.modelId,
        callback: () => {
          addNotification('eddited');
          navigate('/transfer/cars');
        },
      });
    }
  };

  return (
    <>
      <BaseForm name="usersForm" form={form} layout="vertical" onFinish={onFinish}>
        <S.FormContent>
          <BaseForm.Item
            name="carNumber"
            label={'carNumber'}
            rules={[
              { required: true, message: 'filed is required' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('filed is required'));
                  }
                  if (getFieldValue('carNumber') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('error from carNumber!'));
                },
              }),
            ]}
          >
            <Input placeholder="Enter name ?" />
          </BaseForm.Item>

          <BaseForm.Item
            name="modelId"
            label={'modelId'}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter modelId ?" />
          </BaseForm.Item>
          {type === 'edit' ? null : (
            <BaseButtonsForm.Item
              name="file"
              label={'Upload'}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button type="default" icon={<UploadOutlined />}>
                  Upload file
                </Button>
              </Upload>
            </BaseButtonsForm.Item>
          )}

          <PrimaryBtn htmlType="submit" loading={loading.post || loading.patch}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </S.FormContent>
      </BaseForm>
    </>
  );
};
