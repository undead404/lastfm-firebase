import { Tag as AntDTag } from 'antd';
import { useMemo } from 'react';

import Link from './Link';

export interface TagBadgeProperties {
  count: number;
  name: string;
}

const BASIC_FONT_SIZE = 18;

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
    <Link href={`/tag/${name}`}>
      <AntDTag style={style}>{name}</AntDTag>
    </Link>
  );
}
