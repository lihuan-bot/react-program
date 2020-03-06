import React, { Component } from 'react';
import moment from 'moment'
import { Card, Tag, Button, Table} from 'antd'
import { getArticles } from '../../netWork'
const titleMap = {
  id:'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}
const ButtonGroup = Button.Group
class Article extends Component {
  constructor(){
    super()
    this.state = {
       dataSource : [],
      columns: [],
      total: 0 ,
      isLoading:false
    }
  }
  createColumns = columnsKeys => {
    const columns = columnsKeys.map(item => {
      if(item === 'amount') {
        return {
          title:titleMap[item],
          key: item,
          render(text, record){
            const {amount} = record
          return <Tag color={amount > 300 ? 'red' : 'green'}>{amount}</Tag>
          }
        }
      }
      if(item === 'createAt') {
        return {
          title:titleMap[item],
          key: item,
          render(text, record){
            const { createAt } = record
            console.log(createAt);
          return <Tag color='skyblue'> {moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')} </Tag>
          }
        }
      } 
      return {
        title:titleMap[item],
        dataIndex:item,
        key:item
      }
    })
    columns.push({
      title: '操作',
      key: 'actions',
      render() {
        return (
          <ButtonGroup>
            <Button size="small" type="primary">编辑</Button>
            <Button size="small" type="danger">删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    getArticles().then(res => {
      const columnsKeys = Object.keys(res.data.list[0])
      const columns = this.createColumns(columnsKeys)
      this.setState({
        total:res.total,
        dataSource: res.data.list,
        columns,      
      })
      
    }).catch(err => {

    }).finally(() => {
      this.setState({
        isLoading:false
      })
    })
  }
  
  render() {
    return (
      <Card title="文章列表"
       bordered={false}
       extra={<Button>导出excel</Button>} >
        <Table 
        rowKey={record => record.id}
        dataSource={this.state.dataSource} 
        columns={this.state.columns}
        pagination={{
          total: this.state.total,
          hideOnSinglePage: true
        }}
         loading={this.state.isLoading}
         />
    </Card>
    );
  }
}

export default Article;