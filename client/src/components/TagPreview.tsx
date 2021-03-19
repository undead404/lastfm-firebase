import { Card, Typography } from 'antd';
import filter from 'lodash/filter';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import { Link } from 'react-router-dom';

import { Tag } from '../misc/types';

import QuatroImage from './QuatroImage';
import styles from './TagPreview.module.css';

export interface TagPreviewProperties {
  tag: Tag;
}

export default function TagPreview({ tag }: TagPreviewProperties): JSX.Element {
  const previewImagesSources = map(
    filter(orderBy(tag.topAlbums, ['power'], ['desc']), 'thumbnail'),
    'thumbnail',
  ) as string[];
  return (
    <Link component={Typography.Link} to={`/tag/${tag.name}`}>
      <Card
        className={styles.card}
        cover={
          <QuatroImage
            height={250}
            imagesSources={previewImagesSources}
            width={250}
          />
        }
      >
        <Card.Meta
          description={
            <Typography.Paragraph>
              List created at: {tag.listCreatedAt?.toISOString?.()}
            </Typography.Paragraph>
          }
          title={<Typography.Text>{tag.name}</Typography.Text>}
        />
      </Card>
    </Link>
  );
}
