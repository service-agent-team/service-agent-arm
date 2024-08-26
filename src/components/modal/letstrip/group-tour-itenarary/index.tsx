import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, TextEditor } from '@/components/common';
import { Icon } from '@/components/common/icon';
import { Modal } from '@/components/common/modal';
import { Button, Card, Col, Input, InputNumber, Row } from 'antd';
import { useEffect } from 'react';
import { IValues } from './types';
import { PrimaryBtn } from '@/components/primary-btn';
import { addNotification } from '@/common';
import { Items } from '@/store/lets-trip/group-tour/types';

export const LestTripGroupTourItenararyModal = () => {
  const { setModal, updateItenarary } = useActions();
  const { isModal } = useTypedSelector((s) => s.app);
  const {
    itenararyItem,
    groupTourRaw,
    loading: { patch, post },
  } = useTypedSelector((s) => s.letsTripTour);
  const [form] = BaseForm.useForm();

  const onClose = () => {
    setModal(false);
  };

  const onFinish = ({ titleEn, titleRu, itemOrder, description }: IValues) => {
    if (!itenararyItem) return;
    updateItenarary({
      callback() {
        addNotification('Successfully updated tour itenarary');
        setModal(false);
      },
      tourId: groupTourRaw?.tourId as number,
      tourItenararyId: itenararyItem?.id as number,
      body: {
        title: { en: titleEn, ru: titleRu },
        item_order: itemOrder,
        imageUrl: '',
        descriptions: description.map((item, i) => ({
          id: itenararyItem?.descriptions?.[i].id as number,
          hour: item.hour,
          item_order: item.itemDescOrder,
          items: itenararyItem?.descriptions?.[i].items.map((d) => ({
            id: d.id as number,
            en: item.descEn,
            ru: item.descRu,
          })) as Items[],
        })),
      },
    });
  };

  useEffect(() => {
    if (itenararyItem) {
      form.setFieldsValue({
        titleEn: itenararyItem?.title.en,
        titleRu: itenararyItem?.title.ru,
        itemOrder: itenararyItem?.item_order,
        description: itenararyItem?.descriptions?.map((item, i) => ({
          itemDescOrder: item.item_order,
          descEn: item.items[i].en,
          descRu: item.items[i].ru,
          hour: item.hour,
        })),
      });
    }
  }, [itenararyItem]);

  return (
    <Modal
      title="Update group tour itenarary"
      size="large"
      onCancel={onClose}
      open={isModal}
      footer={null}
    >
      <BaseForm form={form} onFinish={onFinish}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <BaseForm.Item
              name={'titleEn'}
              label={'itinerary title english'}
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter a itinerary title english ?" />
            </BaseForm.Item>
          </Col>
          <Col span={24}>
            <BaseForm.Item
              name={'titleRu'}
              label={'itinerary title russian'}
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter a itinerary title russian ?" />
            </BaseForm.Item>
          </Col>
          <Col span={24}>
            <BaseForm.Item
              style={{ width: '100%' }}
              name={'itemOrder'}
              label={'itinerary item order'}
              rules={[{ required: true }]}
            >
              <InputNumber
                type="number"
                style={{ width: '100%' }}
                placeholder="Enter a itinerary item order ?"
              />
            </BaseForm.Item>
          </Col>
        </Row>

        <BaseForm.List name={'description'}>
          {(subFields) => (
            <div>
              {subFields.map((subField) => (
                <Card
                  key={subField.key}
                  size="small"
                  title={`${subField.name + 1}. tour itinerary description`}
                >
                  <Row gutter={12}>
                    <Col span={12}>
                      <BaseForm.Item
                        style={{ width: '100%' }}
                        name={[subField.name, 'itemDescOrder']}
                        label={'itinerary item description order'}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <InputNumber
                          type="number"
                          style={{ width: '100%' }}
                          placeholder="Enter a itinerary item description order ?"
                        />
                      </BaseForm.Item>
                    </Col>
                    <Col span={12}>
                      <BaseForm.Item
                        style={{ width: '100%' }}
                        name={[subField.name, 'hour']}
                        label={'itinerary hour'}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Enter a itinerary hour ?" />
                      </BaseForm.Item>
                    </Col>
                  </Row>
                  <BaseForm.Item
                    style={{ width: '100%' }}
                    name={[subField.name, 'descEn']}
                    label={'itinerary description english'}
                    rules={[
                      {
                        validator: async (_, itenararyDescEn: string) => {
                          if (itenararyDescEn === '<p><br></p>') {
                            return Promise.reject(
                              new Error('extra information english description field required?'),
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <TextEditor
                      name="descEn"
                      setContents={itenararyItem?.descriptions?.[subField.name]?.items?.[0]?.en}
                      placeholder="Enter a itinerary description english ?"
                    />
                  </BaseForm.Item>
                  <BaseForm.Item
                    style={{ width: '100%' }}
                    name={[subField.name, 'descRu']}
                    label={'itinerary description russian'}
                    rules={[
                      {
                        validator: async (_, itenararyDescRu: string) => {
                          if (itenararyDescRu === '<p><br></p>') {
                            return Promise.reject(
                              new Error('extra information russian description field required?'),
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <TextEditor
                      name="descRu"
                      setContents={itenararyItem?.descriptions?.[subField.name]?.items?.[0]?.ru}
                      placeholder="Enter a itinerary description russian ?"
                    />
                  </BaseForm.Item>
                </Card>
              ))}
              <BaseForm.Item>
                <Button type="dashed" block disabled icon={<Icon name="PlusOutlined" />}>
                  add tour itinerary description ({subFields.length})
                  {subFields.length ? '✅' : '❌'}
                </Button>
              </BaseForm.Item>
            </div>
          )}
        </BaseForm.List>

        <PrimaryBtn type="primary" htmlType="submit" loading={post || patch}>
          Update Itenarary
        </PrimaryBtn>
      </BaseForm>
    </Modal>
  );
};
