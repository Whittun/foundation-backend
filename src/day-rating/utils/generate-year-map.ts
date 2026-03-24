type YearMap = Record<string, number | null>;

const zeroFormatted = (number: number) => {
  return `${number}`.length < 2 ? `0${number}` : `${number}`;
};

export const getYearMap = (targetYear: number) => {
  const yearMap: YearMap = {};

  const processedDate = new Date(targetYear, 0, 1);   

  while (targetYear === processedDate.getFullYear()) {
    const year = processedDate.getFullYear();
    const month = processedDate.getMonth() + 1;
    const day = processedDate.getDate();

    const fullFormatDay = `${year}-${zeroFormatted(month)}-${zeroFormatted(day)}`;

    yearMap[fullFormatDay] = null;

    processedDate.setDate(processedDate.getDate() + 1);
  }

  return yearMap;
}