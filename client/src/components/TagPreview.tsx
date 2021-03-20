import { Card, Typography } from 'antd';
import filter from 'lodash/filter';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import { Tag } from '../misc/types';

import Link from './Link';
import QuatroImage from './QuatroImage';

export interface TagPreviewProperties {
  tag: Tag;
}

export default function TagPreview({ tag }: TagPreviewProperties): JSX.Element {
  const previewImagesSources = map(
    filter(orderBy(tag.topAlbums, ['power'], ['desc']), 'thumbnail'),
    'thumbnail',
  ) as string[];
  return (
    <Link href={`/tag/${tag.name}`}>
      <Card
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
