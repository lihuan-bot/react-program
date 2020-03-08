import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/login'
import './login.less'

const mapState = state => ({
  isLogin: state.login.isLogin,
  isLoading: state.login.isLoading
})


@connect(mapState, { login })
class Login extends Component {
  onFinish = (userInfo) => {
    this.props.login(userInfo)
  }
 
  render() {
    return (
      this.props.isLogin 
      ? 
      <Redirect  to="/admin" /> 
      :
      <Card title="LH ADMIN登录"
        className="lh-login-card"
      >
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '用户名必须!' }]}
      >
        <Input disabled={this.props.isLoading} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '密码必须!' }]}
      >
        <Input disabled={this.props.isLoading}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <div style={{display:"flex"}}>
      <Form.Item  name="remember" valuePropName="checked">
        <Checkbox disabled={this.props.isLoading}> 记住我 </Checkbox>
      </Form.Item>
      <Form.Item>
      {/* <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox disabled={this.props.isLoading}>记住我</Checkbox>
        </Form.Item> */}
        
        <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
      </div>
    </Form>
    </Card>
    );
  }
}

export default Login;