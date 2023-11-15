import React, { useState, useRef } from 'react';
import { Input, Space, Spin, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useEffect } from 'react';
import { Button, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
const UserRoleTable = ({ UserRoleDataArr, EditUserRoleToggle, toggleArchive, Loading, permissions }) => {

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
        setdataArr(UserRoleDataArr)
    }, [UserRoleDataArr])

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
                dataIndex == 'title' ? <strong>{text}</strong> : text
            ),
    });

    const columns = [
        {
            title: '#',
            render: (text, record, rowIndex) => rowIndex + 1,
            align: 'center'
        },
        {
            title: t('title'),
            dataIndex: 'title',
            render: (text) => <strong>{text}</strong>,

            sorter: (a, b) => a.title.localeCompare(b.title),
            ...getColumnSearchProps('title'),
        },
        {
            title: t('created_at'),
            render: (record) => <><p className='mb-0' >{record.created_at}</p><small className='mb-0 fst-italic' >{record.added_by_name}</small></>,
            sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
        },
        {
            title: t('updated_at'),
            render: (record) => <><p className='mb-0' >{record.updated_at}</p><small className='mb-0 fst-italic' >{record.updated_by_name}</small></>,
            sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
        },
        {
            title: t('action'),
            // dataIndex: 'Action',
            render: (data) => (


                <ButtonGroup>
                    <UncontrolledButtonDropdown>
                        {permissions?.edit ? <Button color="primary" className='d-flex align-items-center' onClick={() => toggleArchive(data, 'permission')}>
                            <i className="ri-lock-2-fill me-1 align-bottom"></i>{t('permission')}</Button> : <></>}

                        {(permissions?.edit || permissions?.delete) ? <>
                            <DropdownToggle tag="button" className="btn btn-primary" split>
                            </DropdownToggle>
                            <DropdownMenu >
                                {permissions?.edit ?
                                    <DropdownItem onClick={() => EditUserRoleToggle(data)} data-bs-toggle="modal" data-bs-target="#edit"><i className="ri-pencil-fill align-bottom me-2 text-muted" />{t('edit')}</DropdownItem>
                                    : <></>}
                                {permissions?.delete ? data.status === 2 ?
                                    <DropdownItem onClick={() => toggleArchive(data, 'Activate')} data-bs-toggle="modal" data-bs-target="#activateProjectModal"><i className="ri-restart-line align-bottom me-2 text-muted" />{t('re_activate')}</DropdownItem> :
                                    <DropdownItem onClick={() => toggleArchive(data, 'Archive')} data-bs-toggle="modal" data-bs-target="#archiveProjectModal"><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{t('archive')}</DropdownItem> : <></>}
                            </DropdownMenu>
                        </> : <></>}
                    </UncontrolledButtonDropdown>
                </ButtonGroup>
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
export default UserRoleTable;