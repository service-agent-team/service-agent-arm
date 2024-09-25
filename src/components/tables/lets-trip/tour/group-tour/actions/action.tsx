import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { modal } from '@/components';
import { Icon } from '@/components/common/icon';
import { ROUTES } from '@/constants';
import { ILetsTripGroupTour } from '@/store/lets-trip/group-tour/types';
import { Button, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

export const Actions = ({ record }: { record: ILetsTripGroupTour }) => {
  const navigate = useNavigate();
  const { deleteLetsTripGroupTour, setLetsTripGroupTourByCountryId, getOneRawLetsTripTour } =
    useActions();

  const { byCountryIdTours } = useTypedSelector((s) => s.letsTripTour);
  const { countryId, tourType } = useParams();

  const handleDelete = () => {
    modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteLetsTripGroupTour({
          callback() {
            addNotification('Successfully deleted');
            if (byCountryIdTours)
              setLetsTripGroupTourByCountryId(
                byCountryIdTours.filter((el) => el.tourId !== record.tourId),
              );
          },
          id: String(record?.tourId),
        });
      },
    });
  };

  return (
    <Space>
      <Button
        type="primary"
        key={1}
        onClick={() =>
          getOneRawLetsTripTour({
            id: String(record.tourId),
            callback: () => {
              navigate(
                `${ROUTES.letsTripTour}/by-country/${countryId}/${tourType}/edit/${record.tourId}`,
              );
            },
          })
        }
      >
        <Icon name="EditOutlined" />
      </Button>
      <Button type="primary" danger key={2} onClick={handleDelete}>
        <Icon name="DeleteOutlined" />
      </Button>
    </Space>
  );
};
