import type { FC } from 'react'

import panIconImg from '@/img/icon/Pan.svg'

import styles from './index.module.scss'

const PanIcon: FC = () => <img src={panIconImg.src} className={styles.PanIcon} alt="鍋マーク" />

export default PanIcon
