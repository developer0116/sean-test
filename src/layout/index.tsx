import React from 'react'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
const { Header, Content } = Layout
import './style.scss'
interface ILayout {
  children?: React.ReactNode
}

export default ({ children }: ILayout) => {
  return (
    <Layout className='layout'>
      <Header>
        <Link to='/'>
          <h1 className='text-center text-light'>GitHub Searcher</h1>
        </Link>
      </Header>
      <Content>
        <div className='container site-layout-content'>{children}</div>
      </Content>
    </Layout>
  )
}
