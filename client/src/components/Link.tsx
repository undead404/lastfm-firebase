import TypographyLink, { LinkProps } from 'antd/lib/typography/Link';
import { push } from 'connected-react-router';
import { MouseEventHandler, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function Link(
  properties: LinkProps &
    React.RefAttributes<HTMLElement> & {
      href: string;
    },
): JSX.Element {
  const dispatch = useDispatch();
  const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(push(properties.href));
    },
    [dispatch, properties.href],
  );
  return <TypographyLink {...properties} onClick={handleClick} />;
}
