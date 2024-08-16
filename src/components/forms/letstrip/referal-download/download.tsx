import { BaseForm } from '@/components/common';
import { Loading } from '@/components/loading';

import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Select } from 'antd';
import { useState } from 'react';

export const DownloadReferal = () => {
  const [loding, setLoading] = useState<boolean>(false);
  const onFinish = ({ count, quality }: any) => {
    setLoading(true);
    fetch(`https://api.coreteam.uz/api/refferal/download?count=${count}&quality=${quality}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a') as any;
        link.href = url;
        link.setAttribute('download', 'refferal.zip'); // fayl nomini berishingiz mumkin
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const countOpt = [1, 2, 3, 4, 5].map((el) => ({ value: el, label: el }));
  const qualityOpt = ['NORMAL_1754x2480', 'HIGH_3508x4960'].map((el) => ({ value: el, label: el }));

  return (
    <BaseForm onFinish={onFinish}>
      {loding ? (
        <Loading />
      ) : (
        <Row>
          <Col span={24}>
            <BaseForm.Item required={true} label="Select a refferal count" name="count">
              <Select placeholder="count" options={countOpt} />
            </BaseForm.Item>
          </Col>
          <Col span={24}>
            <BaseForm.Item required={true} label="Select a refferal quality" name="quality">
              <Select placeholder="quality" options={qualityOpt} />
            </BaseForm.Item>
          </Col>
          <Col span={24}>
            <Button
              style={{ width: '100%' }}
              icon={<CloudDownloadOutlined />}
              htmlType="submit"
              type="primary"
            >
              Generate
            </Button>
          </Col>
        </Row>
      )}
    </BaseForm>
  );
};
