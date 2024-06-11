import { Icon } from '@/components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return <Icon onClick={() => handleBack()} btn name="ArrowLeftOutlined" />;
};
