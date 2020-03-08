import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Button, List, Avatar, Badge, Spin } from 'antd'
import './Notifications.less'
import  { markNotificationAsReadById, markAllNotificationAsReadById } from '../../actions/notifications'
const mapSate = state => {
  const { list, isLoading } = state.notifications
  return {
    list,
    isLoading
  }
}
@connect(mapSate, { markNotificationAsReadById, markAllNotificationAsReadById })
class Notifications extends Component {
  render() {
    return (
      <Spin spinning={this.props.isLoading}>
      <Card title="通知中心" 
      className="lh-card"
      bordered={false}
      extra={<Button disabled={this.props.list.every(item => item.hasRead === true)}
          onClick={this.props.markAllNotificationAsReadById}
      >全部标记为已读</Button>}
      >
        <List
    itemLayout="horizontal"
    dataSource={this.props.list}
    renderItem={item => (
      <List.Item extra={item.hasRead ? null : <Button type="primary" ghost
      onClick={() => {this.props.markNotificationAsReadById(item.id)}}>标记为已读</Button>}>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar}/>}
          title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
          description={item.desc}
        />
      </List.Item>
    )}
  /> 

      </Card>
      </Spin>
    );
  }
}

export default Notifications;