import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../utils/config';

const AddDeduction = () => {
  let [deduction, setDeduction] = useState([]);
  useEffect(() => {
    (async () => {
      let res = await axios.get(`${API_URL}/getDeduction`);
      setDeduction(res.data);
    })();
  }, []);
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        <table className="table-auto shadow shadow-gray-600">
          <thead>
            <tr>
              <th className="py-5 px-5">扣除項目編號</th>
              <th className="py-5 px-10">扣除項目名稱</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {deduction.map((v, i) => {
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

export default AddDeduction;
