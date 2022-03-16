import React, { useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Form, message } from 'antd';
const defaultData = new Array(2).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `活动名称${index}`,
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  };
});
const NewTable = () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(() => defaultData);
  const [form] = Form.useForm()
  const columns = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          }
        ],
      },
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: { text: '未解决', status: 'Error' },
        closed: { text: '已解决', status: 'Success' },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          }
        ],
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];
  return (<>
    <EditableProTable 
      headerTitle="新建表格" 
      columns={columns} 
      rowKey="id" 
      value={dataSource} 
      onChange={setDataSource} 
      recordCreatorProps={{
        newRecordType: 'dataSource',
        record: () => ({ id: Date.now().toString() }),
      }} 
      toolBarRender={() => {
        return [
          <Button type="primary" key="save" onClick={() => {
            // 触发校验 
            form.validateFields().then(res => {
              console.log(res)
              // dataSource 就是当前数据，可以调用 api 将其保存
            console.log(dataSource);
            }).catch(err => {
              message.error('校验不通过，请将数据填写完整')
              console.log(err)
            })
              }}>
            保存数据
          </Button>,
        ];
      }} 
      editable={{
        type: 'multiple',
        editableKeys,
        form,
        actionRender: (row, config, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onValuesChange: (record, recordList) => {
          setDataSource(recordList);
        },
        onChange: setEditableRowKeys,
      }}/>
  </>);
};

const EditTable = () => {
  const [editableKeys, setEditableRowKeys] = useState(() => defaultData.map((item) => item.id));
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm()
    const columns = [
        {
          title: '活动名称',
          dataIndex: 'title',
          formItemProps: {
            rules: [{ required: true, message: '此项为必填项' }]
          },
          editable: true,
        },
        {
          title: '状态',
          key: 'state',
          dataIndex: 'state',
          valueType: 'select',
          valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: { text: '未解决', status: 'Error' },
            closed: { text: '已解决', status: 'Success' },
          },
        },
        {
          title: '描述',
          dataIndex: 'decs'
        },
        {
          title: '活动时间',
          dataIndex: 'created_at',
          valueType: 'date',
        },
        {
          title: '操作',
          valueType: 'option',
          width: 200,
          render: (text, record, _, action) => [
            <a key="editable" onClick={() => {
              console.log(action, 'action')
              action?.startEditable?.(record.id);
            }}>编辑</a>,
            <a key="delete" onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}>删除</a>,
          ],
        },
    ];
    return (<>
      <EditableProTable rowKey="id" headerTitle="可编辑表格" maxLength={5} 
        recordCreatorProps={{ 
          newRecordType: 'dataSource',
          record: { id: (Math.random() * 1000000).toFixed(0) }
        }}  
        columns={columns} 
        toolBarRender={() => {
          return [
            <Button type="primary" key="save" onClick={() => {
              // 触发校验 
              form.validateFields().then(res => {
                console.log(res)
                // dataSource 就是当前数据，可以调用 api 将其保存
              console.log(dataSource);
              }).catch(err => {
                message.error('校验不通过，请将数据填写完整')
                console.log(err)
              })
                }}>
              保存数据
            </Button>,
          ];
        }} 
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })} 
        value={dataSource} 
        onChange={setDataSource} 
        editable={{
          type: 'multiple',
          form,
          editableKeys,
          onSave: async (rowKey, data, row) => {
              console.log(rowKey, data, row, '单行保存');
          },
          onChange: setEditableRowKeys,
        }}/>
    </>);
}

const TableFormDemo = () => {
  return (
    <>
      <NewTable></NewTable>
      <EditTable></EditTable>
    </>
  )
}
export default TableFormDemo