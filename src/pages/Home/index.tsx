import React, { useEffect } from 'react'
import Layout from 'layout'
import { useSelector, useDispatch } from 'react-redux'
import { times } from 'lodash'
import qs from 'query-string'
import { List } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
import { fetchUsers } from 'state/users/usersActions'
import { Skeleton, UserItem } from 'components'
import { useDebounce } from 'use-debounce'
import { useInput } from 'hooks'

export default function HomePage() {
  const location = useLocation()
  const history = useHistory()
  const parsedSearch = qs.parse(location.search)
  const dispatch = useDispatch()
  const search = useInput('')
  const [searchValue] = useDebounce(search.value, 500)

  const { users, isRunning } = useSelector((state: any) => state.users)
  useEffect(() => {
    searchValue && history.push('/?query=' + searchValue)
    return () => {}
  }, [searchValue])

  useEffect(() => {
    dispatch(fetchUsers(parsedSearch.query as string))
    return () => {}
  }, [parsedSearch.query])

  return (
    <Layout>
      <input
        type='text'
        placeholder='Search for Users'
        className='form-control mt-3 mb-5'
        {...search}
      />

      {isRunning ? (
        times(5, String).map((d: any) => {
          return <Skeleton key={`${d}key`} />
        })
      ) : (
        <List
          dataSource={users}
          renderItem={(item: any) => (
            <UserItem
              img={item.avatar_url}
              id={item.login}
              repoCount={item.public_repos}
            />
          )}
        />
      )}
    </Layout>
  )
}
