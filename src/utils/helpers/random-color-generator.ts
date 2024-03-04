import { ChartTypeEnum } from "@/enums";

export const randomRgbColorGenerator = (): string => {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);

  return `rgb(${R},${G},${B})`;
};

export const createBackgroundColor = (type: ChartTypeEnum, length: number) => {
  if (type === ChartTypeEnum.DOUGHNUT || type === ChartTypeEnum.PIE) {
    const colorArray: string[] = [];
    for (let i = 0; i < length; i++) {
      const color = randomRgbColorGenerator();
      colorArray.push(color);
    }
    return colorArray;
  } else return randomRgbColorGenerator();
};
