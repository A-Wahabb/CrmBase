import React, { useState, useRef } from 'react';
import { Input, Space, Spin, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useEffect } from 'react';
import { Badge, Button, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import TooltipComp from '../../Components/Common/Tooltip';
import { Link } from 'react-router-dom';
const UserTable = ({ UserDataArr, toggleArchive, Loading, permissions }) => {

    const { t } = useTranslation();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [dataArr, setdataArr] = useState([]);

    const [userColors, setUserColors] = useState({});
    useEffect(() => {
        const colors = {};

        // Initialize the colors for each user
        UserDataArr.forEach((user) => {
            if (!user.profile_photo) {
                colors[user.first_name[0]] = getRandomIndex();
            }
        });

        setUserColors(colors);
    }, [UserDataArr]);


    const colors = [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'dark',
    ]
    function getRandomIndex() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }


    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    useEffect(() => {
        setdataArr(UserDataArr)
    }, [UserDataArr])

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
                dataIndex == 'name' ? <strong>{text}</strong> : text
            ),
    });

    const columns = [
        {
            title: t('profile'),
            render: (record) =>
                record.profile_photo ? <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" >
                    <TooltipComp tooltip={record?.first_name}>
                        <div className="avatar-xxs mx-auto">
                            <img src={record.profile_photo} alt="" className="rounded-circle img-fluid h-100" />
                        </div>
                    </TooltipComp>
                </Link> : <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" >
                    <TooltipComp tooltip={record?.first_name}>
                        <div className="avatar-xxs mx-auto">
                            <div className={`avatar-title rounded-circle h-100 bg-${userColors[record.first_name[0]]}`}>
                                {record.first_name[0]}
                            </div>
                        </div>
                    </TooltipComp>
                </Link>,
            align: 'center',
        },
        {
            title: t('display_name'),
            dataIndex: 'name',
            render: (text) => <strong>{text}</strong>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name'),
        },
        {
            title: t('full_name'),
            render: (record) => <span>{record.first_name + ' ' + record.last_name}</span>,
            sorter: (a, b) => a.first_name.localeCompare(b.first_name),
        },
        {
            title: t('placeholder_email'),
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: t('placeholder_phone'),
            render: (record) => <>+{record?.country_code + '-' + record?.phone}</>,
            sorter: (a, b) => a.phone.localeCompare(b.phone),
        },
        {
            title: t('designation_singular'),
            dataIndex: 'user_designation',
        },
        {
            title: t('user_role_singular'),
            dataIndex: 'user_role',
        },
        {
            title: t('placeholder_status'),
            render: (record) => record.user_status == 1 ? <Badge color='success' pill>Active</Badge> : <Badge color='danger' pill>De-Actived</Badge>,
        },
        {
            title: t('action'),
            // dataIndex: 'Action',
            render: (data) => (


                <ButtonGroup>
                    <UncontrolledButtonDropdown>
                        <Button color="primary" className='d-flex align-items-center' onClick={() => toggleArchive(data, 'View')}>
                            <i className="ri-eye-fill me-1 align-bottom"></i>{t('view')}</Button>
                        {(permissions?.edit || permissions?.delete) ? <>
                            <DropdownToggle tag="button" className="btn btn-primary" split>
                            </DropdownToggle>
                            <DropdownMenu >
                                {permissions?.edit ? <DropdownItem onClick={() => toggleArchive(data, 'Edit')} data-bs-toggle="modal" data-bs-target="#editProjectModal"><i className="ri-pencil-line align-bottom me-2 text-muted" />{t('edit')}</DropdownItem> : <></>}


                                {permissions?.delete ? data.user_status === 2 ?
                                    <DropdownItem onClick={() => toggleArchive(data, 'Activate')} data-bs-toggle="modal" data-bs-target="#activateProjectModal"><i className="ri-restart-line align-bottom me-2 text-muted" />{t('re_activate')}</DropdownItem>
                                    :
                                    <DropdownItem onClick={() => toggleArchive(data, 'Archive')} data-bs-toggle="modal" data-bs-target="#archiveProjectModal"><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{t('archive')}</DropdownItem>
                                    : <></>}
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
                    rowClassName={(record, index) => record.user_status === 2 ? 'bg-danger-subtle' : index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    size="small"
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
                    onChange={onChange} />

            </Spin>

        </>)
};
export default UserTable;