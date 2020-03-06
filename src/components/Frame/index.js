import React, { Component } from 'react';
import { Layout, Menu} from 'antd';
import {  createFromIconfontCN } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
// import { adminRoutes } from '../../routes'
import logo from './logo.png'
import './frame.less'
const { Header, Content, Sider } = Layout;
// const menus = adminRoutes.filter(route => route.isNav ===true)
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1674316_ogs1ki7ov8.js',
});
@withRouter
class Frame extends Component {
  onMemuClick=({key}) => {
    this.props.history.push(key)
  }
  render() {
    return (
<Layout  style={{minHeight:"100%"}}>
    <Header className="header lh-header" >
      <div className="lh-logo" >
       <img src={logo} alt="LH"/>
      </div>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={this.props.location.pathname}
          onClick={this.onMemuClick}
          style={{ height: '100%', borderRight: 0 }}
        >   
        {
          this.props.menus.map(item => {
            return (
            <Menu.Item key={item.pathname} ><IconFont type={item.icon} /> {item.title}</Menu.Item>
            )
          })
        }
            
        </Menu>
      </Sider>
      <Layout style={{ padding: '16px' }}>
        
        <Content
          className="site-layout-background "
          style={{
            margin: 0,
          }}
        >
          {
            this.props.children
          }
        </Content>
      </Layout>
    </Layout>
  </Layout>
    );
  }
}

export default Frame;