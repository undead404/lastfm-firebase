import isFunction from 'lodash/isFunction';
import { ReportHandler } from 'web-vitals';

const reportWebVitals = async (onPerfEntry?: ReportHandler): Promise<void> => {
  if (onPerfEntry && isFunction(onPerfEntry)) {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import(
      'web-vitals'
    );
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
