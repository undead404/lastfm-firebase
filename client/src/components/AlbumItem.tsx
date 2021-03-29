import { Button, Image, List, Spin, Tag, Typography } from 'antd';
import filter from 'lodash/filter';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import { useCallback, useState } from 'react';

import { Album } from '../misc/types';

import styles from './AlbumItem.module.css';
import DuplicateModal from './DuplicateModal';
import TagBadge from './TagBadge';

export interface AlbumItemProperties {
  album: Album;
  index: number;
}

const ELLIPSIS_CONFIG = {
  rows: 2,
};
const TAG_COUNT_LIMIT = 50;

export default function AlbumItem({
  album,
  index,
}: AlbumItemProperties): JSX.Element {
  const title = `${album.artist} - ${album.name}`;
  let dateString = 'Processing...';
  if (album.date) {
    dateString = album.date;
  } else if (isUndefined(album.date)) {
    dateString = 'Unknown';
  }
  const [duplicateModalVisible, setDuplicateModalVisible] = useState(false);
  const hideDuplicateModalVisible = useCallback(
    () => setDuplicateModalVisible(false),
    [],
  );
  const showDuplicateModalVisible = useCallback(
    () => setDuplicateModalVisible(true),
    [],
  );
  return (
    <List.Item
      className={styles.root}
      extra={
        <Image
          alt={title}
          className={styles.image}
          //   height={500}
          placeholder={<Spin spinning wrapperClassName={styles.spinWrapper} />}
          preview={false}
          src={album.cover || 'https://via.placeholder.com/125'}
          //   width={500}
        />
      }
    >
      <List.Item.Meta
        description={
          <>
            <Typography.Paragraph>
              <Typography.Text>Released at: {dateString}</Typography.Text>
              <Button ghost onClick={showDuplicateModalVisible}>
                Duplicate?
              </Button>
            </Typography.Paragraph>
            <Typography.Paragraph ellipsis={ELLIPSIS_CONFIG}>
              {map(
                sortBy(
                  filter(
                    toPairs(album.tags || {}),
                    ([, tagCount]) => tagCount > TAG_COUNT_LIMIT,
                  ),
                  [([, tagCount]) => -tagCount, ([name]) => name],
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
            <Typography.Text className={styles.title} copyable>
              {title}
            </Typography.Text>
            {album.duplicateOf && <Tag color="warning">DUPLICATE</Tag>}
          </>
        }
      />
      <DuplicateModal
        hide={hideDuplicateModalVisible}
        show={showDuplicateModalVisible}
        targetArtist={album.artist}
        targetId={album.id}
        visible={duplicateModalVisible}
      />
    </List.Item>
  );
}
