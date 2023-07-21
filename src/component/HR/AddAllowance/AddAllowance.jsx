import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../utils/config';

const AddAllowance = () => {
  let [allowance, setAllowance] = useState([]);
  useEffect(() => {
    (async () => {
      let res = await axios.get(`${API_URL}/getAllowance`);
      setAllowance(res.data);
    })();
  }, []);
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        <table className="table-auto shadow shadow-gray-600">
          <thead>
            <tr>
              <th className="py-5 px-5">津貼項目編號</th>
              <th className="py-5 px-10">津貼項目名稱</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {allowance.map((v, i) => {
              return (
                <tr key={i} className="border border-gray-200">
                  <td className="py-2">{v.salary_item_id}</td>
                  <td className="px-20">{v.salary_item_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddAllowance;
