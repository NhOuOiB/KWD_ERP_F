import { useEffect, useState } from 'react';
import select from '../../styles/module/select.module.scss';

const Select = ({ data, data_name, data_id, main_clr, hover_clr, text_clr, selected_clr, order, handleChange, clear, setClear }) => {
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

  function handleClick(e, v, name) {
    setSelected(v[data_name]);
    setDisplay(!display);
    // console.log(v[data_id]);
    handleChange(e, order, name);
  }
  useEffect(() => {
    if (clear) {
      setSelected('請選擇');
      setClear(false)
    }
  }, [clear]);
  return (
    <div>
      <div className={select.select} style={{ color: text_clr }}>
        <div className={`${select.select_option} bg-[${main_clr}]`} onClick={handleClickul}>
          <p>{selected}</p>
        </div>
        <div className={select.ul_container} style={{ height: display ? '215.59px' : '0' }}>
          <ul className={select.select_ul} style={{ background: main_clr, transform: display ? 'translateY(0px)' : 'translateY(-100%)' }} name={data_id}>
            {data.map((v, i) => {
              return (
                <li
                  key={i}
                  className={`${v[data_name] == selected ? select.select_li_p : select.select_li} ${hover_clr ? `hover:bg-[${hover_clr}]` : `hover:bg-[#eee]`}`}
                  value={v[data_id]}
                  onClick={(e) => handleClick(e, v, data_id)}
                >
                  {v[data_name]}
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
