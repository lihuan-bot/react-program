import React, { Component, createRef } from 'react';
import E from 'wangeditor' 
import moment from 'moment'
import { getArticleById } from '../../netWork'
import { Card, Button, Form, Input, DatePicker} from 'antd'
import './Edit.less'
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

class Edit extends Component {
  constructor(){
    super()
    this.editRef = createRef()
    this.formRef = createRef()
  }
  onFinish = values => {
    console.log('Success:', values);

  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  initEdit = () => {
    this.editor = new E(this.editRef.current)
    this.editor.customConfig.onchange = (html) => {
      // html 即变化之后的内容
      this.formRef.current.setFieldsValue({
        content:html
      })
  }
     this.editor.create()
  }
  componentDidMount() {
   this.initEdit()
   getArticleById(this.props.match.params.id)
   .then(res => {
     const {id, ...data} = res.data
     data.createAt = moment(data.createAt)
    this.formRef.current.setFieldsValue(data)
    this.editor.txt.html(data.content)
   })
   .catch(err => {
     
   })
  }

  render() {
    
    return (
      <Card title="编辑文章"
        bordered={false}
        extra={<Button>取消</Button>} >
        <Form
          ref={this.formRef}
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
            amount:20
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your title!',
              },
            ]}
          >
            <Input placeholder="请输入标题"/>
          </Form.Item>
          <Form.Item
            label="作者"
            name="author"
            rules={[
              {
                required: true,
                message: 'Please input your author!',
              },
            ]}
          >
            <Input placeholder="请输入作者"/>
          </Form.Item>
          <Form.Item
            label="阅读量"
            name="amount"
            rules={[
              {
                required: true,
                message: 'Please input your amount!',
              },
            ]}
          >
            <Input placeholder="请输入阅读量"/>
          </Form.Item>
          <Form.Item
            label="创建时间"
            name="createAt"
            rules={[
              {
                required: true,
                message: 'Please input your title!',
              },
            ]}
          >
            <DatePicker showTime placeholder="请选择时间" />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[
              {
                required: true,
                message: '内容是必须的!',
              },
            ]}
            
          >
           <div ref={this.editRef}  className="lh-editor"/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              保存修改
        </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Edit;
