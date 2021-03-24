import property from 'lodash/property';
import toNumber from 'lodash/toNumber';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

export default function usePageNumber(): number {
  const page =
    useSelector<RootState, string>(property('router.location.query.page')) ||
    '1';
  return toNumber(page);
}
