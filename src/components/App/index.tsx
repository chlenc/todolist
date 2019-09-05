import React from 'react';
import { Button, Input, Modal, Table } from "antd";
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

    componentDidMount(): void {
        this.getFromLocalStorage();
    }

    handleDelete = (index: number) => {
        const itemIndex = this.state.data.findIndex((val, i) => index === i);
        if (itemIndex !== -1) {
            this.saveToLocalStorageAndState(
                {
                    ...this.state,
                    data: this.state.data.filter((_, i) => i ! - itemIndex).map((v, key) => ({...v, key}))
                })
        }
    };

    showModal = () => this.setState({visible: true});

    handleAdd = () => {
        this.saveToLocalStorageAndState({
            visible: false,
            data: [...this.state.data, this.state.formData].map((v, key) => ({...v, key})),
            formData: {title: '', description: ''}
        });
    };

    saveToLocalStorageAndState = (data: IState) => {
        this.setState(data);
        localStorage.setItem('todolistStorage', JSON.stringify(data))
    };

    getFromLocalStorage = () => {
        const storage = localStorage.getItem('todolistStorage');
        let state = this.state;
        if (storage) {
            state = {...state, ...JSON.parse(storage)}
        }
        this.setState(state)
    };


    handleCancel = () => this.setState({visible: false, formData: {title: '', description: ''}});

    columns = [
        {title: 'Title', dataIndex: 'title', key: 'title'},
        {
            title: 'Action',
            dataIndex: '',
            width: 100,
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
    state: IState = {
        data: [],
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
                pagination={{position: "top"}}
                bordered
            />
            <Modal
                title="Task form"
                visible={visible}
                onOk={this.handleAdd}
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
