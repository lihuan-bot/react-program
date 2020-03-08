import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Avatar, Badge} from 'antd';
import {  createFromIconfontCN, DownOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllNotification } from '../../actions/notifications'
// import { adminRoutes } from '../../routes'
import logo from './logo.png'
import './frame.less'
const { Header, Content, Sider } = Layout;
// const menus = adminRoutes.filter(route => route.isNav ===true)
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1674316_ogs1ki7ov8.js',
});

const mapstate = state => {
  return {
    notificationsCount:state.notifications.list.filter(item => item.hasRead ===false).length
  }
}

@connect(mapstate, { getAllNotification })
@withRouter
class Frame extends Component {
  componentDidMount() {
    this.props.getAllNotification()
  }
  onMemuClick=({key}) => {
    this.props.history.push(key)
  }
  
  onDropCLick= ({key}) => {
    this.props.history.push(key)
  }
   renderMenu = () => (
  <Menu onClick={this.onDropCLick}>
    <Menu.Item key="/admin/notifications">
        <Badge dot={Boolean(this.props.notificationsCount)}>
        通知中心
        </Badge>
    </Menu.Item>
    <Menu.Item key="/admin/settings">
        个人设置
    </Menu.Item>
    <Menu.Item key="/login">
        退出登录
    </Menu.Item>
  </Menu>
);
  render() {
    const seletedKey = this.props.location.pathname.split('/')
    seletedKey.length = 3
    return (
  <Layout  style={{minHeight:"100%"}}>
    <Header className="header lh-header" >
      <div className="lh-logo" >
       <img src={logo} alt="LH"/>
      </div>
      <div>
      <Dropdown overlay={this.renderMenu}>
      <div style={{ cursor:"pointer", display:"flex", alignItems:"center" }} >
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <span>欢迎您!李欢欢</span> 
      <Badge count={this.props.notificationsCount} offset={[-10, -10]}>
      <DownOutlined />
      </Badge>
      </div>
  </Dropdown>
      </div>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background lh-sider">
        <Menu
          mode="inline"
          selectedKeys={seletedKey.join('/')}
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
      <Layout style={{ paddingLeft: '16px'}}>
        
        <Content
          className="site-layout-background lh-content "
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