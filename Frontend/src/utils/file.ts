import { uniqueId } from 'lodash';

export const convertFileToImage = (file: File) => {
  return new Promise<string>((res) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      res(fileReader.result as string);
    };

    fileReader.readAsDataURL(file);
  });
};
export const convertImageUrlToFile = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], `${uniqueId()}.${blob.type}`, {
    type: blob.type,
  });
  return file;
};

export const getFileFromPaste = (pasteEvent: React.ClipboardEvent) => {
  let files: File[] = [];
  let items = Array.from(pasteEvent.clipboardData.items);
  for (let i in items) {
    let item = items[i];
    if (item.type.indexOf('image') === 0) {
      var file = item.getAsFile();
      if (file) {
        files.push(file);
      }
    }
  }

  return files;
};
