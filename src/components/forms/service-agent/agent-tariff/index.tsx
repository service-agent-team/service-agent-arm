import { BaseForm, Input, PrimaryBtn } from '@/components';
import { Select } from 'antd';
import { useEffect } from 'react';
import * as S from './styled';
import { IValuesForm } from './types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const AgentTariffCategoryForm = ({ type }: { type: 'create' | 'edit' }) => {
  const [form] = BaseForm.useForm();
  const { createAgentTariffCategory, getAllAgentCategory, updateAgentTariffCategory } =
    useActions();
  const {
    loading: { post },
    categories,
    tariff,
  } = useTypedSelector((state) => state.agentTariff);
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = ({ name, categoryId }: IValuesForm) => {
    if (type === 'create') {
      createAgentTariffCategory({
        name,
        categoryId,
        callback() {
          addNotification('tariff successfully created');
          navigate(ROUTES.agentTariff);
          form.resetFields();
        },
      });
    } else if (type === 'edit') {
      updateAgentTariffCategory({
        name,
        categoryId,
        id: id as string,
        callback() {
          addNotification('tariff successfully updated');
          navigate(ROUTES.agentTariff);
          form.resetFields();
        },
      });
    }
  };
  const selectOptionCategory = categories?.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  useEffect(() => {
    getAllAgentCategory({ callback() {}, pageNumber: 0, pageSize: 20 });
  }, []);

  return (
    <BaseForm
      name="AgentTariffCategoryForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={type === 'edit' ? { name: tariff?.name, categoryId: tariff?.categoryId } : {}}
    >
      <S.FormContent>
        <BaseForm.Item
          name="name"
          label={'tariff name'}
          rules={[{ required: true, message: 'tariff name is required!' }]}
        >
          <Input placeholder="Enter tariff name" />
        </BaseForm.Item>
        <BaseForm.Item
          name="categoryId"
          label={'category'}
          rules={[{ required: true, message: 'category is required!' }]}
        >
          <Select placeholder="Select category?" options={selectOptionCategory} />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={post}>
          {type === 'edit' ? 'edit' : 'create'}
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
