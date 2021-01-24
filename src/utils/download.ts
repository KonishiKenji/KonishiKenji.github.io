const saveFileToLocal = (
  data: any,
  fileName: string,
  fileType: string,
  callback: () => void
) => {
  const blob =
    fileType === "text/csv" ? data : new Blob([data], { type: fileType });

  if (window.navigator && window.navigator.msSaveBlob) {
    // for IE11
    navigator.msSaveBlob(blob, fileName);
  } else {
    // for Chrome
    const atag = document.createElement("a");
    atag.download = fileName;
    atag.target = "_blank";
    atag.href = window.URL.createObjectURL(blob);
    atag.click();
  }
  callback();
};

export default saveFileToLocal;
