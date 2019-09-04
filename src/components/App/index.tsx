import React from 'react';
import {Button, Modal, Table, Input} from "antd";
import './styles.css'
import 'antd/dist/antd.css'

const {TextArea} = Input;


interface IdataItem {
    key: number
    title: string
    description: string
}

interface IProps {
}

type TForm = {
    title: string
    description: string
}

interface IState {
    data: IdataItem[]
    visible: boolean
    formData: TForm
}

export default class App extends React.Component<IProps, IState> {

    handleDelete = (index: number) => {
        const itemIndex = this.state.data.findIndex(({key}: IdataItem) => index === key);
        if (itemIndex !== -1) {
            this.state.data.splice(itemIndex, 1);
            this.setState({data: this.state.data})
        }

    };

    showModal = () => this.setState({visible: true});

    handleOk = () => {
        this.setState({
            visible: false,
            data: [...this.state.data, {...this.state.formData, key: this.state.data.length}],
            formData: {title: '', description: ''}
        });
    };

    handleCancel = () => this.setState({visible: false, formData: {title: '', description: ''}});

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
    //fixme
    state = {
        data: [{
            key: 0,
            title: "task 1",
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        }, {
            key: 1,
            title: "task 2",
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        }, {
            key: 2,
            title: "task 3",
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        }],
        visible: false,
        formData: {
            title: '',
            description: ''
        }
    };


    render() {
        const {data, visible} = this.state;
        let {formData} = this.state;
        return <div className="root">
            <Button onClick={this.showModal} type="primary" className="button" icon="plus">New task</Button>
            <Table
                className="table"
                columns={this.columns}
                expandedRowRender={record => <p style={{margin: 0}}>{record.description}</p>}
                dataSource={data}
            />
            <Modal
                title="Task form"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <b>Input your task</b>
                <TextArea
                    onChange={e => this.setState({formData: {...this.state.formData, title: e.target.value}})}
                    value={formData.title}
                    className="input"
                    placeholder="Your title"
                    autosize
                />
                <TextArea
                    onChange={e => this.setState({formData: {...this.state.formData, description: e.target.value}})}
                    value={formData.description}
                    placeholder="Your description"
                    autosize={{minRows: 3, maxRows: 5}}
                />
            </Modal>
        </div>;
    }
}
