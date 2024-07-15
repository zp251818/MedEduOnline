import { XLS_FILE_ERROR } from '@/static/const';
import message from 'antd/es/message';
import * as XLSX from 'xlsx';

export const beforeUpload = (file: File) => {
    const isExcel =
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel';
    if (!isExcel) {
      message.error(XLS_FILE_ERROR);
    }
    return isExcel;
};

export const parseExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target?.result as string;
      if (binaryString) {
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; // 假设只有一个sheet
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        resolve(data);
      } else {
        reject(new Error(XLS_FILE_ERROR));
      }
    };
    reader.readAsBinaryString(file);
  });
};