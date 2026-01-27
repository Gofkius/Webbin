import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';

export const useChartCapture = () => {
  const captureChart = useCallback(async (element: HTMLElement): Promise<string> => {
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing chart:', error);
      return '';
    }
  }, []);

  return { captureChart };
};
