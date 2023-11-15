import React, { useState, useRef } from 'react';
import { Input, Space, Spin, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useEffect } from 'react';
import { Badge, Button } from 'reactstrap';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
const EmailTempTable = ({ allEmails, EditEmailTempToggle, Loading, permissions }) => {

    const { t } = useTranslation();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [dataArr, setdataArr] = useState([]);




    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    useEffect(() => {
        setdataArr(allEmails)
    }, [allEmails])

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`${t('search')} ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button color='primary'
                        className="custom-toggle active"
                        style={{
                            width: 90,
                        }}
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}> {t('search')}
                    </Button>
                    <Button
                        outline
                        color='primary'
                        onClick={() => {
                            searchInput.current.input.value = ''
                            setSelectedKeys([])
                            handleSearch([], confirm, dataIndex)
                        }
                        }
                        size="small"
                    >
                        {t('reset')}
                    </Button>
                    <Button
                        outline
                        color='primary'
                        className='btn btn-ghost-primary'
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        {t('filter')}
                    </Button>
                    <Button
                        outline
                        color='primary'
                        className='btn btn-ghost-primary'
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        {t('btn_close')}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <i className='ri-search-line'
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => {
            return record[searchedColumn]?.toLowerCase()?.includes(value?.toLowerCase());
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                dataIndex == 'event' ? <strong>{text}</strong> : text
            ),
    });

    const columns = [
        {
            title: '#',
            render: (text, record, rowIndex) => rowIndex + 1,
            align: 'center',
        },
        {
            title: t('event'),
            dataIndex: 'event',
            render: (text) => <strong>{text}</strong>,

            sorter: (a, b) => a.event.localeCompare(b.event),
            ...getColumnSearchProps('event'),
        },
        {
            title: t('subject'),
            dataIndex: 'subject',

            sorter: (a, b) => a.subject.localeCompare(b.subject),
            ...getColumnSearchProps('subject'),
        },
        {
            title: t('placeholder_status'),
            render: (record) => record.is_active == 1 ? <Badge color='success' pill>Active</Badge> : <Badge color='danger' pill>De-Actived</Badge>,

            sorter: (a, b) => a.is_active.localeCompare(b.is_active),
        },
        {
            title: t('updated_at'),
            dataIndex: 'updated_at',
            sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
        },
        {
            title: t('action'),
            // dataIndex: 'Action',
            render: (data) => (
                permissions?.edit ? <Button color="primary" className='d-flex align-items-center' onClick={() => EditEmailTempToggle(data)}>
                    <i className="ri-pencil-fill me-1 align-bottom"></i>{t('edit')}</Button> : <></>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Spin spinning={Loading}>

                <Table columns={columns} dataSource={dataArr}
                    rowKey="id"
                    rowClassName={(record, index) => record.status === 2 ? 'bg-danger-subtle' : index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    size="small"
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
                    onChange={onChange} />

            </Spin>

        </>)
};
export default EmailTempTable;