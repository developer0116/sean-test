import React from 'react'
import { Avatar, Card } from 'antd'
import { Link } from 'react-router-dom'

interface IUserItem {
  img: string
  id: string
  repoCount?: number
}
export default function UserItem({ img, repoCount, id }: IUserItem) {
  return (
    <Link to={`/user/${id}`}>
      <Card>
        <div className='d-flex justify-content-between'>
          <Avatar src={img} />
          <span>{id}</span>
          <span>Repo: {repoCount}</span>
        </div>
      </Card>
    </Link>
  )
}
