import React from 'react'
import { Card } from 'antd'

interface IRepoItem {
  url: string
  name: string
  forkCount: number
  starCount: number
}
export default function RepoItem({
  url,
  name,
  forkCount,
  starCount,
}: IRepoItem) {
  return (
    <a href={url} target='_blank' rel='noreferrer'>
      <Card>
        <div className='d-flex justify-content-between'>
          <span className='my-auto'>{name}</span>
          <div>
            <div>{forkCount} Forks</div>
            <div>{starCount} Stars</div>
          </div>
        </div>
      </Card>
    </a>
  )
}
