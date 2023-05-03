import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Common/_header.scss';
import { Menu } from 'antd';
import { FaUser } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineDocument } from 'react-icons/hi';
import logo from '/images.jpg';

const Header = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    {
      label: <img src={logo} className="w-14 border-none"></img>,
    },
    {
      label: '人事',
      key: 'hr',
      icon: <AiOutlineUser />,
      children: [
        {
          type: 'group',
          label: '員工',
          children: [
            {
              label: <Link to={'/HR/employee'}>基本資料</Link>,
              key: 'employee',
            },
            {
              label: <Link to={'/HR/addEmployee'}>新增職員</Link>,
              key: 'addEmployee',
            },
          ],
        },
        {
          type: 'group',
          label: '出勤',
          children: [
            {
              label: <Link to={'/HR/leave'}>查詢出勤</Link>,
              key: 'leave',
            },
            {
              label: <Link to={'/HR/addLeave'}>請假</Link>,
              key: 'addLeave',
            },
          ],
        },
        {
          type: 'group',
          label: '薪資',
          children: [
            {
              label: <Link to={''}>薪資計算</Link>,
              key: 'salary',
            },
            {
              label: <Link to={''}>新增津貼</Link>,
              key: 'addAllowance',
            },
            {
              label: <Link to={''}>新增扣除</Link>,
              key: 'addDeduction',
            },
          ],
        },
      ],
    },
    {
      label: '產品',
      key: 'pro',
      icon: <HiOutlineDocument />,
      children: [
        {
          label: <Link to={''}>查看產品</Link>,
          key: 'product',
        },
        {
          label: <Link to={''}>新增產品</Link>,
          key: 'addProduct',
        },
      ],
    },
  ];

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
