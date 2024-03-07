import { UploadFile, UploadProps, message } from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import { getBase64 } from './general';

type Props = {
  file: UploadFile;
  setPreviewOpen: (open: boolean) => void;
  setPreviewImage: (url: string) => void;
  setPreviewTitle: (title: string) => void;
};

export const PHOTO_SIZE_LIMIT = 5 * 1024 * 1024;
export const VALID_MIME_TYPES = 'image/png, image/jpeg, image/jpg';

export const handlePreview = async ({
  file,
  setPreviewOpen,
  setPreviewImage,
  setPreviewTitle,
}: Props) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj as RcFile);
  }

  setPreviewOpen(true);
  setPreviewImage(file.url || (file.preview as string));
  setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
};

export const handlePreviewDragger = async (file: UploadFile) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

export const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
  if (!VALID_MIME_TYPES.includes(file.type) || file.size > PHOTO_SIZE_LIMIT) {
    message.error({
      content: 'Изображение должно быть в формате PNG, JPG или JPEG и размером не более 5 МБ',
      duration: 3,
    });

    return Upload.LIST_IGNORE;
  }

  return false;
};

export const getNormFile = (e: { file: UploadFile; fileList: UploadFile[] }) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

export const getImageFormData = (fileList: UploadFile[]) => {
  const formData = new FormData();

  for (const file of fileList) {
    formData.append('images', file.originFileObj as File);
  }

  return formData;
};
