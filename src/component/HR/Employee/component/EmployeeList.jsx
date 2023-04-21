import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';

const EmployeeList = ({ setEid }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [name, setName] = useState('');
  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  useEffect(() => {
    (async () => {
      let data = await axios.get(`${API_URL}/getEmployee?name=${name}`);
      setEmployee(data.data);
    })();
  }, [name]);

  function handleTest(v) {
    setEid(v.employee_id)
  }
  return (
    <div className="w-80 h-[50rem] h-max-[48.75rem] bg-white rounded-[5px] m-y-2 text-neutral-800 px-3 pt-12 left-0">
      <div className="relative w-fit m-auto">
        <div className="px-2 py-1 h-8 pointer-events-none absolute flex items-center">
          <IconContext.Provider value={{ size: '1.4rem' }}>
            <AiOutlineSearch />
          </IconContext.Provider>
        </div>
        <input type="text" className="w-48 h-8 rounded-md ps-10 bg-white border" onFocus={handleFocus} onBlur={handleBlur} onChange={(e) => handleChange(e)} />
      </div>
      <div className="h-min-[12rem] h-[40rem] rounded-[5px] overflow-auto mt-6 py-1">
        {employee.map((v, i) => {
          return (
            <div className="border-double border-4 border-sky-500 rounded-full py-2 my-2" key={i} onClick={() => handleTest(v)}>
              {v.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeList;
