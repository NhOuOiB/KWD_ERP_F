import { useEffect, useState } from 'react';
import select from '../../styles/module/select.module.scss';
const Select = ({
  data, // 選項資料
  data_name, // value
  data_id, // name
  main_clr, // 主色
  hover_clr, // hover後
  text_clr, // 文字顏色
  selected_clr, // 選擇後
  order, // 物件超過1
  handleChange,
  clear, // 清除用
  setClear, // 清除用
  width,
  height,
  padding,
  border,
  border_hover,
  radius,
  defaultValue,
}) => {
  const [selected, setSelected] = useState('請選擇');
  const [display, setDisplay] = useState(false);

  function handleClickul() {
    setDisplay(!display);
  }

  function handleClick(e, v, name) {
    setSelected(v[data_name]);
    setDisplay(!display);
    handleChange(e, order, name);
  }
  useEffect(() => {
    if (clear) {
      setSelected('請選擇');
      setClear(false);
    }
    if (defaultValue) {
      data.map((v) => {
        if (v[data_id] == defaultValue) {
          setSelected(`${v[data_name]}`);
        }
      });
    }
  }, [clear, defaultValue]);
  return (
    <div className={`w-full min-w-[${width}]`}>
      <div className={select.select} style={{ color: text_clr, minHeight: height ? height : '' }}>
        <div
          className={`${select.select_option} bg-[${main_clr}] ${border_hover ? `hover:border-[${border_hover}]` : ''} ${radius ? `rounded-[${radius}]` : ''}`}
          style={{ border: display ? `1px solid ${border_hover}` : border ? border : '', padding: padding ? padding : '' }}
          onClick={handleClickul}
        >
          <p>{selected}</p>
        </div>
        <div className={select.ul_container} style={{ height: display ? (data.length < 5 ? data.length * 44.5 + 20 : 5 * 44.5 + 10) : '0' }}>
          <ul className={select.select_ul} style={{ background: main_clr, transform: display ? 'translateY(0px)' : 'translateY(-100%)' }} name={data_id}>
            {data.map((v, i) => {
              return (
                <li
                  key={i}
                  className={`${v[data_name] == selected ? select.select_li_p : select.select_li} ${hover_clr ? `hover:bg-[${hover_clr}]` : `hover:bg-[#eee]`} ${
                    radius ? `rounded-[${radius}]` : ''
                  }`}
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
