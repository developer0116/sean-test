import React, { useEffect } from 'react'
import Layout from 'layout'
import { List } from 'antd'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { useInput } from 'hooks'
import { fetchUserInfo } from 'state/users/usersActions'
import { Skeleton, RepoItem } from 'components'
import { times } from 'lodash'
import { useDebounce } from 'use-debounce'

export default function UserPage() {
  const dispatch = useDispatch()
  const { id } = useParams() as any
  const { repos, isRunning, userInfo } = useSelector(
    (state: any) => state.users
  )
  const search = useInput('')
  const [searchValue] = useDebounce(search.value, 500)

  useEffect(() => {
    dispatch(fetchUserInfo(id))
    return () => {}
  }, [id])

  useEffect(() => {
    return () => {}
  }, [searchValue])

  return (
    <Layout>
      <div className='d-flex flex-wrap mb-3'>
        <div className='col-md-6 my-2'>
          <div className='col-md-6 m-auto'>
            <img src={userInfo.avatar_url} className='w-100' alt='' />
          </div>
        </div>
        <div className='col-md-6 text-left d-flex flex-column justify-content-center'>
          <div>UserName: {userInfo.name}</div>
          <div>Email: {userInfo.email}</div>
          <div>Location: {userInfo.location}</div>
          <div>
            Join Date:{' '}
            {userInfo.created_at &&
              format(new Date(userInfo.created_at), 'MM/dd/yyyy')}
          </div>
          <div>Followers: {userInfo.followers} </div>
          <div>Following: {userInfo.following}</div>
        </div>
      </div>
      <div className='mb-3'></div>
      <div>
        <input
          type='text'
          className='form-control mb-3'
          placeholder="Search for User's Repositories"
          {...search}
        />
        {isRunning ? (
          times(5, String).map((d: any) => {
            return <Skeleton key={`${d}key`} />
          })
        ) : (
          <List
            dataSource={repos.filter((repo: any) =>
              repo.name.includes(searchValue)
            )}
            renderItem={(item: any) => (
              <RepoItem
                url={item.html_url}
                name={item.name}
                forkCount={item.forks_count}
                starCount={item.stargazers_count}
              />
            )}
          />
        )}
      </div>
    </Layout>
  )
}
