import { Image } from 'antd';
import classnames from 'classnames';
import head from 'lodash/head';
import map from 'lodash/map';
import size from 'lodash/size';
import take from 'lodash/take';
import { CSSProperties } from 'react';

import styles from './QuatroImage.module.css';

export interface QuatroImageProperties {
  height: number;
  imagesSources: string[];
  width: number;
}

const NUMBER_OF_PREVIEWS = 4;

const FOUR_STYLES: CSSProperties[] = [
  {
    left: 0,
    top: 0,
  },
  { right: 0, top: 0 },
  { bottom: 0, left: 0 },
  { bottom: 0, right: 0 },
];

export default function QuatroImage({
  imagesSources,
  width,
}: QuatroImageProperties): JSX.Element {
  const numberOfImages = size(imagesSources);
  if (numberOfImages < NUMBER_OF_PREVIEWS) {
    return (
      <Image
        className={classnames(styles.singleImage, 'tag-image-preview')}
        preview={false}
        src={head(imagesSources) || `https://via.placeholder.com/${width}`}
      />
    );
  }
  return (
    <div className={classnames(styles.wrapper, 'tag-image-preview')}>
      {map(take(imagesSources, NUMBER_OF_PREVIEWS), (imageSource, index) => (
        <Image
          className={styles.quarter}
          preview={false}
          src={imageSource}
          wrapperClassName={styles.quarterWrapper}
          wrapperStyle={FOUR_STYLES[index]}
        />
      ))}
    </div>
  );
}
