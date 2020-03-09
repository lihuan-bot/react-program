import React, { Component } from 'react';
import { Card } from 'antd'
import './noauth.less'
class NoAuth extends Component {
  render() {
    return (
      <Card className="lh-card">
        没有权限
      </Card>
    );
  }
}

export default NoAuth;