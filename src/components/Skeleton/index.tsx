import React, { memo } from 'react'
import { Card, Skeleton } from 'antd'

export default memo(() => {
  return (
    <Card className='mb-3'>
      <Skeleton paragraph={{ rows: 0 }} active avatar />
    </Card>
  )
})
