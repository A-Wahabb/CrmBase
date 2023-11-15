import React, { useState, useRef } from 'react';
import { Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useEffect } from 'react';
import { Button, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import moment from 'moment';
import TooltipComp from '../../Components/Common/Tooltip';

import { useTranslation } from 'react-i18next';

const ModuleTable = ({ ModuleDataArr, EditModuleToggle, expandedRowKeys, setExpandedRowKeys, openArchiveModal, openActivateModal, props }) => {
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
    setdataArr(ModuleDataArr)
  }, [ModuleDataArr])

  function searchNestedObjects(parentObject, searchedColumn, value) {
    let isMatch = false;

    const searchRecursive = (obj) => {
      // Check if the current object matches the search criteria
      if (obj[searchedColumn]?.toLowerCase()?.includes(value?.toLowerCase())) {
        isMatch = true;
        return;
      }

      // Recursive search within nested objects
      if (obj.children && Array.isArray(obj.children)) {
        obj.children.forEach(child => searchRecursive(child));
      }
    };

    searchRecursive(parentObject);

    return isMatch;
  }
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
      return searchNestedObjects(record, searchedColumn, value)
      // return record[searchedColumn]?.toLowerCase()?.includes(value?.toLowerCase());
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
      title: (
        <p className='mb-0' style={{ textAlign: 'center' }}>#</p>
      ),
      render: (text, record, rowIndex) => rowIndex + 1,
    },
    {
      title: t('module_singular'),
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,

      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
    },
    {
      title: t('url'),
      dataIndex: 'url',
      render: (url) => (
        <TooltipComp tooltip={url}>
          {url}
        </TooltipComp>
      ),
      sorter: (a, b) => a.url.localeCompare(b.url),
      defaultSortOrder: 'ascend', // Default sorting order for this column
    },
    {
      title: t('icon'),
      dataIndex: 'icon',
      render: (a) => (
        <TooltipComp tooltip={a}>
          <i className={`ri-${a}-line`}></i>
        </TooltipComp>
      ),
    },
    {
      title: t('slug'),
      dataIndex: 'slug',
      sorter: (a, b) => a.slug.localeCompare(b.slug),
    },
    {
      title: t('sort_order'),
      dataIndex: 'sort_order',
    },
    {
      title: t('feature'),
      render: (data) => (
        <>
          <TooltipComp tooltip={t(data.readable ? 'label_readable' : 'label_unreadable')}>
            <i className={`ri-eye-line fs-16 ${data.readable ? 'text-info' : 'text-muted'}`} />
          </TooltipComp>

          <TooltipComp tooltip={t(data.writable ? 'label_writeable' : 'label_unwriteable')}>
            <i className={`ri-add-box-line fs-16 ${data.writable ? 'text-info' : 'text-muted'}`} />
          </TooltipComp>

          <TooltipComp tooltip={t(data.editable ? 'label_editable' : 'label_uneditable')}>
            <i className={`ri-pencil-line fs-16 ${data.editable ? 'text-info' : 'text-muted'}`} />
          </TooltipComp>

          <TooltipComp tooltip={t(data.deletable ? 'label_deleteable' : 'label_undeleteable')}>
            <i className={`ri-delete-bin-line fs-16 ${data.deletable ? 'text-info' : 'text-muted'}`} />
          </TooltipComp>

        </>
      )
    },
    {
      title: t('created_at'),
      dataIndex: 'created_at',
      sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
    },
    {
      title: t('action'),
      // dataIndex: 'Action',
      render: (data) => (


        <ButtonGroup>
          <UncontrolledButtonDropdown>
            <Button color="primary" className='d-flex align-items-center' onClick={() => EditModuleToggle(data, dataArr)}>
              <i className="ri-pencil-fill me-1 align-bottom"></i>{t('edit')}</Button>
            <DropdownToggle tag="button" className="btn btn-primary" split>
            </DropdownToggle>
            <DropdownMenu >
              {data.module_status === 2 ?
                <DropdownItem onClick={() => openActivateModal(data)} data-bs-toggle="modal" data-bs-target="#activateProjectModal"><i className="ri-restart-line align-bottom me-2 text-muted" />{t('re_activate')}</DropdownItem> :
                <DropdownItem onClick={() => openArchiveModal(data)} data-bs-toggle="modal" data-bs-target="#archiveProjectModal"><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{t('archive')}</DropdownItem>}
            </DropdownMenu>
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
      <Table columns={columns} dataSource={dataArr}
        rowKey="id"
        rowClassName={(record, index) => record.module_status === 2 ? 'bg-danger-subtle' : index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
        expandable={{
          expandedRowKeys,
          onExpand: (expandable, record) => {
            if (expandable) {
              setExpandedRowKeys([...expandedRowKeys, record.id]);
            } else {
              setExpandedRowKeys(expandedRowKeys.filter((id) => record.id !== id));
            }
          },
        }}
        size="small"
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        onChange={onChange} />

    </>)
};
export default ModuleTable;