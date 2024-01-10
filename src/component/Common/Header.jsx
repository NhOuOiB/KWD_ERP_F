import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Common/_header.scss';
import { Menu } from 'antd';
import { FaUser } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineDocument } from 'react-icons/hi';
import { FaRegClock } from 'react-icons/fa6';
import logo from '/images.jpg';
import UserContext from '../../store/userContext';

const Header = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const { user } = useContext(UserContext)
  const { id, name, permission } = user
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
            {
              label: <Link to={'/HR/leaveDays'}>員工休假天數</Link>,
              key: 'leaveDays',
            },
          ],
        },
        {
          type: 'group',
          label: '薪資',
          children: [
            {
              label: <Link to={'/HR/salary'}>薪資計算</Link>,
              key: 'salary',
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
          label: <Link to={'/pro/product'}>查看產品</Link>,
          key: 'product',
        },
        {
          label: <Link to={'/pro/addProduct'}>新增產品</Link>,
          key: 'addProduct',
        },
      ],
    },
    {
      label: <Link to={'/clock'}>打卡</Link>,
      key: 'clock',
      icon: <FaRegClock />,
    },
  ];

  const filteredItems = items.filter((item) => {
    if (id === 1) {

    } else if (item.key === 'pro' && permission === 2) {
      return false;
    } else if ((item.key === 'hr' || item.key === 'pro') && permission === 1) {
      return false;
    } 
    return true; 
  });

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={filteredItems} />;
};

export default Header;
