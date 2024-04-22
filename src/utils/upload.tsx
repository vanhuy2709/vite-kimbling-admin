import { Upload, message } from "antd";

export const beforeUpload = (file: any) => {
  const acceptedFormats = ['png', 'jpg', 'jpeg'];
  let isJpgOrPng = acceptedFormats.includes(file.name.split('.')[1].toLowerCase());
  let isLt10M = file.size / 1024 / 1024 < 10;
  if (!isJpgOrPng) {
    message.error('You can only upload JPG / PNG / JPEG file!');
    return Upload.LIST_IGNORE;
  }
  if (!isLt10M) {
    message.error('Image must smaller than 10MB!');
    return Upload.LIST_IGNORE;
  }
  return isJpgOrPng && isLt10M;
}

export const customRequest = ({ onSuccess }: any) => {
  if (onSuccess) {
    onSuccess('ok');
  }
}