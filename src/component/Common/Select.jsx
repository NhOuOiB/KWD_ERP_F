import { useState } from 'react';
import select from '../../styles/module/select.module.scss';

const Select = ({ data, name, id, main_clr, sub_clr }) => {
  const [selected, setSelected] = useState('請選擇');
  const [display, setDisplay] = useState(false);
  const [hovered, setHovered] = useState('');

  const handleMouseEnter = (e) => {
    setHovered(e.target.value);
  };

  const handleMouseLeave = () => {
    setHovered('');
  };

  function handleClickul() {
    setDisplay(!display);
  }

  function handleClick(v) {
    console.log(v);
    setSelected(v[name]);
    setDisplay(!display);
  }
  console.log(display);
  return (
    <div>
      <div className={select.select}>
        <div className={select.select_option} style={{ background: main_clr }} onClick={handleClickul}>
          <p>{selected}</p>
        </div>
        <div className={select.ul_container} style={{ height: display ? '215.59px' : '0' }}>
          <ul className={select.select_ul} style={{ background: main_clr, transform: display ? 'translateY(0px)' : 'translateY(-100%)' }}>
            {data.map((v, i) => {
              return (
                <li
                  key={i}
                  className={select.select_li}
                  value={v[id]}
                  onClick={() => handleClick(v)}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  style={{ background: v[id] == hovered ? sub_clr : '' }}
                >
                  <p className='h-6'>{v[name]}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
