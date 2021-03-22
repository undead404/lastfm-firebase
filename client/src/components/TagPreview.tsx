import { CheckCircleTwoTone } from '@ant-design/icons';
import { Badge, Card, Tooltip, Typography } from 'antd';
import { formatDistance, formatISO, isBefore } from 'date-fns';
import filter from 'lodash/filter';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import { useMemo } from 'react';

import { Tag } from '../misc/types';

import Link from './Link';
import QuatroImage from './QuatroImage';

export interface TagPreviewProperties {
  tag: Tag;
}

export default function TagPreview({ tag }: TagPreviewProperties): JSX.Element {
  const previewImagesSources = useMemo(
    () =>
      map(
        filter(orderBy(tag.topAlbums, ['power'], ['desc']), 'thumbnail'),
        'thumbnail',
      ) as string[],
    [tag.topAlbums],
  );
  const ago = useMemo(() => {
    if (!tag.lastProcessedAt || !tag.listCreatedAt) {
      return '';
    }
    if (!isBefore(tag.lastProcessedAt, tag.listCreatedAt)) {
      return '';
    }
    return `Albums were scraped ${formatDistance(
      new Date(),
      tag.lastProcessedAt,
    )} ago`;
  }, [tag.lastProcessedAt, tag.listCreatedAt]);
  return (
    <Badge
      count={
        ago ? (
          <Tooltip title={ago}>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </Tooltip>
        ) : null
      }
    >
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
              tag.listCreatedAt ? (
                <Typography.Paragraph>
                  List created at: {formatISO(tag.listCreatedAt)}
                </Typography.Paragraph>
              ) : null
            }
            title={<Typography.Text>{tag.name}</Typography.Text>}
          />
        </Card>
      </Link>
    </Badge>
  );
}
