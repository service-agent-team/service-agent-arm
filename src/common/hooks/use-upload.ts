import { getImgUrl } from '@/common';
import {
  VALID_MIME_TYPES,
  getImageFormData,
  handleBeforeUpload,
  handlePreview,
} from '@/common/utils/upload';
import { message } from '@/components';
import { TUploadFileResponse } from '@/types';
import { FormItemProps, InputProps, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { useDeleteFileQuery, useUploadFileQuery } from '../services/queries';
import { useActions } from '.';

export const useUpload = (mutateAsync: any, isDisable?: boolean) => {
  const [values, setValues] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { setModal, setPreviewImage, setPreviewTitle } = useActions();
  const { mutateAsync: uploadMutateAsync } = useUploadFileQuery(onUploadSuccess);
  const { mutateAsync: deleteMutateAsync } = useDeleteFileQuery(onDeleteSuccess);

  function onUploadSuccess(data: TUploadFileResponse) {
    const newValues = {
      ...values,
      image_id: data.id,
    };
    setFileList([]);
    mutateAsync(newValues);
  }

  function onDeleteSuccess(data: any) {
    return data;
  }

  const handleOnPreview = (file: UploadFile) => {
    handlePreview({ file, setPreviewOpen: setModal, setPreviewImage, setPreviewTitle });
  };

  const handleSetImages = (data: string[]) => {
    const images: UploadFile[] = [];

    if (data.length) {
      data.forEach((image, idx) => {
        images.push({
          uid: `${idx}`,
          name: image,
          status: 'done',
          url: getImgUrl(image),
        });
      });

      setFileList(images);
    }
  };

  const handleRemove: UploadProps['onRemove'] = (file) => {
    const isHasFile = fileList.some((f) => f.status === 'done');

    if (isHasFile) {
      deleteMutateAsync(file.uid);
    }
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleOnFinish = (values: any) => {
    if (fileList.length === 0) {
      return message.warning('Пожалуйста, загрузите изображения');
    } else {
      const formData = getImageFormData(fileList);

      uploadMutateAsync(formData);
      setValues(values);
    }
  };

  const fieldProps = (label: string): Partial<FormItemProps & InputProps> => ({
    label,
    required: true,
  });

  const uploadProps: UploadProps = {
    accept: VALID_MIME_TYPES,
    listType: 'picture-card',
    fileList,
    disabled: isDisable,
    multiple: true,
    maxCount: 10,
    onRemove: handleRemove,
    onChange: handleChange,
    onPreview: handleOnPreview,
    beforeUpload: handleBeforeUpload,
  };

  return {
    uploadProps,
    fieldProps,
    setFileList,
    handleOnFinish,
    handleSetImages,
    uploadMutateAsync,
  };
};
