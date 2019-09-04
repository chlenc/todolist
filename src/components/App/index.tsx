import React from 'react';
import {Button, Modal, Table} from "antd";
import './styles.css'
import 'antd/dist/antd.css'


interface IdataItem {
    key: number
    title: string
    description: string
}

interface IProps {
}

interface IState {
    data: IdataItem[]
    visible: boolean
}

export default class App extends React.Component<IProps, IState> {

    handleDelete = (index: number) => {
        const itemIndex = this.state.data.findIndex(({key}: IdataItem) => index === key);
        if (itemIndex != -1) {
            this.state.data.splice(itemIndex, 1);
            this.setState({data: this.state.data})
        }

    };

    showModal = () => this.setState({visible: true});

    handleOk = (e: any) => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => this.setState({visible: false});

    columns = [
        {title: 'title', dataIndex: 'title', key: 'title'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: ({key}: IdataItem) => <Button
                onClick={() => this.handleDelete(key)}
                icon="delete"
                type="danger"
                ghost
            >
                Delete
            </Button>,
        },
    ];

    state = {
        data: [{
            key: 1,
            title: "task 1",
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        }, {
            key: 2,
            title: "task 2",
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        }, {
            key: 3,
            title: "task 3",
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        }],
        visible: false
    };


    render() {
        const {data} = this.state;
        return <div className="root">
            <Button onClick={this.showModal} type="primary" className="button" icon="plus">New task</Button>
            <Table
                className="table"
                columns={this.columns}
                expandedRowRender={record => <p style={{margin: 0}}>{record.description}</p>}
                dataSource={data}
            />
            <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>;
    }
}
