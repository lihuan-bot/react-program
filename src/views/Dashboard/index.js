import React, { Component, Fragment, createRef } from 'react';
import echarts from 'echarts'
import { getArticleAmount } from '../../network'
import { Card, Row, Col, Spin } from 'antd'
import './dashboard.less'
class Dashbodrd extends Component {
  constructor() {
    super()
    this.articleAmount = createRef()
    this.state={
      isLoading: false,
    }
  }
  initArticleChart = () =>{
    this.setState({
      isLoading: true
    })
    this.articleChart = echarts.init(this.articleAmount.current)
    getArticleAmount()
    .then(res => {
      const option = {
        title: {
            text: '最近访问量'
        },
        tooltip: {},
        legend: {
            data:['访问量']
        },
        xAxis: {
            data: res.data.amount.map(item => item.month)
        },
        yAxis: {},
        series: [{
            name: '访问量',
            type: 'bar',
            data: res.data.amount.map(item => item.value)
        }]
    };
    this.articleChart.setOption(option)
    }).finally(() => {
      this.setState({
        isLoading:false
      })
    })
    
  
  }
  componentDidMount() {
    this.initArticleChart()
  }
  render() {
    return (
      <Fragment>
        <Spin spinning={this.state.isLoading} size="large">
        <Card
          className="lh-card"
          title="概览"
          bordered={false}
        >
          <Row gutter={16}>
            <Col className="lh-gutter-row" span={6}>
              <div style={{ background: '#29b6f6', padding: '8px 0', borderRadius:'10px' }}>col-6</div>
            </Col>
            <Col className="lh-gutter-row" span={6}>
              <div style={{ background: '#ab47bc', padding: '8px 0', borderRadius:'10px'}}>col-6</div>
            </Col>
            <Col className="lh-gutter-row" span={6}>
              <div style={{ background: '#ff7043', padding: '8px 0',borderRadius:'10px' }}>col-6</div>
            </Col>
            <Col className="lh-gutter-row" span={6}>
              <div style={{ background: '#43a047', padding: '8px 0', borderRadius:'10px' }}>col-6</div>
            </Col>
          </Row>
        </Card>
        <Card
          style={{marginTop:'80px'}}
          // title="最近访问量"
          bordered={false}
        >
          <div ref={this.articleAmount} style={{height:'400px'}} />
          </Card>
          </Spin>
      </Fragment>
    );
  }
}

export default Dashbodrd;