import type { FC } from 'react'

import breadIconImg from '@/img/icon/bread.svg'

import styles from './index.module.scss'

const BreadIcon: FC = () => (
  <img src={breadIconImg.src} className={styles.BreadIcon} alt="パンマーク" />
)

export default BreadIcon
