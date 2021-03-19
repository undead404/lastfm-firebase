import { Image } from 'antd';
import head from 'lodash/head';
import map from 'lodash/map';
import size from 'lodash/size';
import take from 'lodash/take';

import styles from './QuatroImage.module.css';

export interface QuatroImageProperties {
  height: number;
  imagesSources: string[];
  width: number;
}

const NUMBER_OF_PREVIEWS = 4;

export default function QuatroImage({
  imagesSources,
  width,
}: QuatroImageProperties): JSX.Element {
  const numberOfImages = size(imagesSources);
  if (numberOfImages < NUMBER_OF_PREVIEWS) {
    return (
      <Image
        preview={false}
        src={head(imagesSources) || `https://via.placeholder.com/${width}`}
        wrapperClassName={styles.wrapper}
      />
    );
  }
  return (
    <div className={styles.wrapper}>
      {map(take(imagesSources, NUMBER_OF_PREVIEWS), (imageSource) => (
        <Image
          className={styles.quarter}
          preview={false}
          src={imageSource}
          wrapperClassName={styles.quarterWrapper}
        />
      ))}
    </div>
  );
}
