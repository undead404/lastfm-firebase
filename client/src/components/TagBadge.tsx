import { Tag as AntDTag, Typography } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export interface TagBadgeProperties {
  count: number;
  name: string;
}

const BASIC_FONT_SIZE = 24;

const PERCENTS = 100;

export default function TagBadge({
  count,
  name,
}: TagBadgeProperties): JSX.Element {
  const style = useMemo(
    () => ({
      fontSize: `${Math.trunc((BASIC_FONT_SIZE * count) / PERCENTS)}px`,
    }),
    [count],
  );
  return (
    <Link component={Typography.Link} to={`/tag/${name}`}>
      <AntDTag style={style}>{name}</AntDTag>
    </Link>
  );
}
