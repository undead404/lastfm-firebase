import { Spin } from 'antd';

import styles from './SuspenseFallback.module.css';

export default function SuspenseFallback(): JSX.Element {
  return <Spin className={styles.spin} spinning></Spin>;
}
