import React, { Component } from 'react';
import moment from 'moment'
import XLSX from 'xlsx'
import { Card, Tag, Button, Table, Modal, Typography, message, Tooltip} from 'antd'
import { getArticles, deleteArtileById } from '../../netWork'
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
      isLoading:false,
      offset: 0,
      limited: 20,
      deleteArticleModalTitle: '',
      isShowArticleModal:false,
      deleteArticleConfirmLoading:false,
      currentDeleteArtileId:null
    }
  }
  createColumns = columnsKeys => {
    const columns = columnsKeys.map(item => {
      if(item === 'amount') {
        return {
          title:titleMap[item],
          key: item,
          render: record => {
            const {amount} = record
          return <Tooltip title={amount > 300 ? '超过300' : '低于300'}>
            <Tag color={amount > 300 ? 'red' : 'green'}>{amount}</Tag>
            </Tooltip>
          }
        }
      }
      if(item === 'createAt') {
        return {
          title:titleMap[item],
          key: item,
          render(text, record){
            const { createAt } = record
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
      render: record =>
           (
          <ButtonGroup>
            <Button size="small" type="primary" onClick={()=>this.toEdit(record.id)}>编辑</Button>
            <Button size="small" type="danger" onClick={() => this.showDeleteArticles(record)}>删除</Button>
          </ButtonGroup>
        )
      
    })
    return columns
  }
  toEdit= id => {
    this.props.history.push(`/admin/article/edit/${id}`)
  }
  showDeleteArticles = (record) => {
    this.setState({
      isShowArticleModal:true,
      deleteArticleModalTitle:record.title,
      currentDeleteArtileId: record.id
    })
    
  }
  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset,this.state.limited).then(res => {
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
  
  componentDidMount() {
    this.getData()
  }
    
  onChangePage=(page,pageSize) => {
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    },() => {
     this.getData()
    })
  }
  onShowSizeChange = (current, size) => {
    this.setState({
      offset:0,
      limited:size
    },() => {
      this.getData()
    })
    
  }
  toExcel = () => {
    const data = [Object.keys(this.state.dataSource[0])]
    for (let item of this.state.dataSource) {
      data.push([
        item.id,
        item.title,
        item.author,
        item.amount,
        moment(item.createAt).format('YYYY年-MM月-DD日 HH:mm:ss')
      ])
      
    }
    const ws = XLSX.utils.aoa_to_sheet( data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `LH-${moment().format('YYYY年-MM月-DD日 HH:mm:ss')}.xlsx`)
    
  }
  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticleModalTitle: '',
      deleteArticleConfirmLoading:false
    })
  }
  deleteArticle = () => {
    this.setState({
      deleteArticleConfirmLoading:true
    })
    deleteArtileById(this.state.currentDeleteArtileId).then(res=>{
      message.success(res.data.msg)
      this.setState({
        offset: 0
      }, () => {
        this.getData()
      })
    }).catch(err =>{
    }).finally(() => {
      this.setState({
        deleteArticleConfirmLoading:false,
        isShowArticleModal:false
      })
    })
  }
  render() {
    return (
      <Card title="文章列表"
       bordered={false}
       extra={<Button onClick={this.toExcel}>导出excel</Button>} >
        <Table 
        rowKey={record => record.id}
        dataSource={this.state.dataSource} 
        columns={this.state.columns}
        pagination={{
          current:this.state.offset / this.state.limited + 1 ,
          total: this.state.total,
          hideOnSinglePage: true,
          pageSize:20,
          showSizeChanger:true,
          showQuickJumper:true,
          pageSizeOptions: ['10', '20', '30', '40'],
          onChange:this.onChangePage,
          onShowSizeChange:this.onShowSizeChange
        }}
         loading={this.state.isLoading}
         />
         <Modal
          title='此操作不可逆,请谨慎'
          visible={this.state.isShowArticleModal}
          onCancel={this.hideDeleteModal}
          maskClosable={false}
          confirmLoading={this.state.deleteArticleConfirmLoading}
          onOk={this.deleteArticle}
         >
          <Typography>
            确定删除 <span style={{color:'#f00'}}>
              {this.state.deleteArticleModalTitle}
              </span> 吗?
              </Typography>
           </Modal>
    </Card>
    );
  }
}

export default Article;