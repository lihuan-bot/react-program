import React, { Component } from 'react';
import { Card, Upload, Spin } from 'antd'
import { connect } from 'react-redux'
import { changeAvatar } from '../../actions/login'
import axios from 'axios'
import './profile.less'
const mapState = state => ({
  avatarUrl: state.login.avatar
})
@connect(mapState, { changeAvatar })
class Profile extends Component {
  state = {
    isUpLoading: false
  }
  handelUpLoadAvatar = ({ file }) => {
    const data = new FormData()
    data.append('Token',
    '5795d2596782533aa160a069facaecadda37c7dc:6cCC_UNyZR7oAhdfVSWZm4aKC4E=:eyJkZWFkbGluZSI6MTU4MzczNTcyMiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzEyMTYyIiwiYWlkIjoiMTY2OTQwMSIsImZyb20iOiJmaWxlIn0=')
    data.append('file',file)
    axios.post('http://up.imgapi.com/',data)
    .then(res => {
      if(res.status === 200) {
        this.setState({
          // avatarUrl: res.data.linkurl,
          isUpLoading:false
        })
      }
      this.props.changeAvatar(res.data.linkurl)
    }).catch(err => {

    })
    this.setState({
      isUpLoading: true
    })
    
  }
  render() { 
    return (
      <Card className="lh-card"
      title="个人设置"
      bordered={false}
      >
        <Upload showUploadList={false} customRequest={this.handelUpLoadAvatar}>
          <Spin spinning={this.state.isUpLoading}>
            {this.props.avatarUrl ? <img style={{border:"1px dashed #dedede",height:"80px",width:"80px"}} src={this.props.avatarUrl} alt="图片"/> : 
            <span style={{border:"2px dashed #dedede", display:"block",width:"80px", height:"80px"}}>
            上传头像
            </span>
            }
          </Spin>
          上传头像
        </Upload>
      
    </Card>
    );
  }
}

export default Profile;