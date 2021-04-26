import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import styles from './index.less'
import locale from 'antd/lib/locale/zh_CN'
import { useDispatch } from 'dva'
import { history } from 'umi'
import { setStorage } from '@/utils/storage'
const BasicLayout = props => {
  const { children } = props
  const dispatch = useDispatch()
  const config = {
    autoInsertSpaceInButton: false,
    locale,
    prefixCls: '',
    pageHeader: { ghost: true },
    direction: 'ltr'
  }

  useEffect(() => {
    dispatch({
      type: 'application/getDictList'
    })
  }, [])

  return (
    <ConfigProvider {...config}>
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </ConfigProvider>
  )
}

BasicLayout.propTypes = {}

BasicLayout.defaultProps = {}

export default React.memo(BasicLayout)
