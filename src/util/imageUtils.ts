export const conver2Base64 = (file: File) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onloadend = () => {
    return reader.result?.toString();
  };
};
