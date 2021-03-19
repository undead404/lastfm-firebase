import { Card, Image, Spin, Typography } from 'antd';
import filter from 'lodash/filter';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import { CSSProperties } from 'react';

import { Album } from '../misc/types';

import styles from './AlbumCard.module.css';
import TagBadge from './TagBadge';

const TAG_COUNT_LIMIT = 50;

export interface AlbumCardProperties {
  album: Album;
  index: number;
}

const CARD_BODY_STYLE: CSSProperties = {
  flexGrow: 0,
};

const ELLIPSIS_CONFIG = {
  rows: 2,
};

export default function AlbumCard({
  album,
  index,
}: AlbumCardProperties): JSX.Element {
  const title = `${album.artist} - ${album.name}`;
  return (
    <Card
      bodyStyle={CARD_BODY_STYLE}
      className={styles.albumCard}
      cover={
        <Image
          alt={title}
          fallback="https://via.placeholder.com/500"
          //   height={500}
          placeholder={<Spin spinning tip={title} />}
          preview={false}
          src={album.cover || 'https://via.placeholder.com/500'}
          //   width={500}
          wrapperClassName={styles.imageWrapper}
        />
      }
    >
      <Card.Meta
        description={
          <>
            {album.date && (
              <Typography.Paragraph>
                Released at: {album.date}
              </Typography.Paragraph>
            )}
            <Typography.Paragraph ellipsis={ELLIPSIS_CONFIG}>
              {map(
                sortBy(
                  filter(
                    toPairs(album.tags || {}),
                    ([, tagCount]) => tagCount > TAG_COUNT_LIMIT,
                  ),
                  [([, tagCount]) => -tagCount, ([tagName]) => tagName],
                ),
                ([albumTagName, albumTagCount]) => (
                  <TagBadge count={albumTagCount} name={albumTagName} />
                ),
              )}
            </Typography.Paragraph>
          </>
        }
        title={
          <>
            {index + 1}.{' '}
            <Typography.Text className={styles.albumTitle} copyable>
              {title}
            </Typography.Text>
          </>
        }
      />
    </Card>
  );
}
