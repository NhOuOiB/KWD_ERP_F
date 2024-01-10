import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../utils/config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddSalary = () => {
  const [salary, setSalary] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const date = location.state.date;

  async function handleSubmit() {
    let data = salary[1].map((v) => {
      let payTotal = v.salary + v.overtime_meal + v.overtime + v.bonus;
      let payDeduction = v.sick_leave + v.personal_leave + v.labor_insurance + v.health_insurance + v.total_family_dependants + v.six_percent + v.bento + v.tax;
      let payActually = payTotal + payDeduction;

      return { ...v, total: payTotal, deduction: payDeduction, actually: payActually };
    });

    let result = await axios.post(`${API_URL}/addSalary`, data);
    if (result.data.message == '該月份已經有紀錄了') {
      toast.warn(result.data.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    } else {
      toast.success(result.data.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      navigate('/HR/salary');
    }
  }

  useEffect(() => {
    (async () => {
      let res = await axios.get(`${API_URL}/getSalary?time=${date}`);
      if (!res.data[0].record) {
        let data = res.data[1].map((v) => {
          let hour = Math.floor((v.salary / 30 / 8) * 10) / 10;
          let payForSick = -Math.round((hour * v.sick) / 2);
          let payForPersonal = -Math.round(hour * v.personal);
          let payForLabor = 0;
          let payForHealth = 0;
          let annualIncome = v.salary * 12;
          let six = v.six * 0.01;
          let payForSix = 0;
          if (annualIncome > 560000) {
            payForSix = -(annualIncome * six * 0.12);
          } else if (annualIncome > 1260000) {
            payForSix = -(annualIncome * six * 0.2);
          } else if (annualIncome > 2520000) {
            payForSix = -(annualIncome * six * 0.3);
          } else if (annualIncome > 4720000) {
            payForSix = -(annualIncome * six * 0.4);
          } else {
            payForSix = -(annualIncome * six * 0.05);
          }

          if (v.salary <= 26400) {
            payForLabor = -Math.round(26400 * 0.12 * 0.2);
            payForHealth = -Math.round(26400 * 0.0517 * 0.3);
          } else if (v.salary <= 27600) {
            payForLabor = -Math.round(27600 * 0.12 * 0.2);
            payForHealth = -Math.round(27600 * 0.0517 * 0.3);
          } else if (v.salary <= 28800) {
            payForLabor = -Math.round(28800 * 0.12 * 0.2);
            payForHealth = -Math.round(28800 * 0.0517 * 0.3);
          } else if (v.salary <= 30300) {
            payForLabor = -Math.round(30300 * 0.12 * 0.2);
            payForHealth = -Math.round(30300 * 0.0517 * 0.3);
          } else if (v.salary <= 31800) {
            payForLabor = -Math.round(31800 * 0.12 * 0.2);
            payForHealth = -Math.round(31800 * 0.0517 * 0.3);
          } else if (v.salary <= 33300) {
            payForLabor = -Math.round(33300 * 0.12 * 0.2);
            payForHealth = -Math.round(33300 * 0.0517 * 0.3);
          } else if (v.salary <= 34800) {
            payForLabor = -Math.round(34800 * 0.12 * 0.2);
            payForHealth = -Math.round(34800 * 0.0517 * 0.3);
          } else if (v.salary <= 36300) {
            payForLabor = -Math.round(36300 * 0.12 * 0.2);
            payForHealth = -Math.round(36300 * 0.0517 * 0.3);
          } else if (v.salary <= 38200) {
            payForLabor = -Math.round(38200 * 0.12 * 0.2);
            payForHealth = -Math.round(38200 * 0.0517 * 0.3);
          } else if (v.salary <= 40100) {
            payForLabor = -Math.round(40100 * 0.12 * 0.2);
            payForHealth = -Math.round(40100 * 0.0517 * 0.3);
          } else if (v.salary <= 42000) {
            payForLabor = -Math.round(42000 * 0.12 * 0.2);
            payForHealth = -Math.round(42000 * 0.0517 * 0.3);
          } else if (v.salary <= 43900) {
            payForLabor = -Math.round(43900 * 0.12 * 0.2);
            payForHealth = -Math.round(43900 * 0.0517 * 0.3);
          } else {
            payForLabor = -Math.round(45800 * 0.12 * 0.2);
            payForHealth = -Math.round(45800 * 0.0517 * 0.3);
          }
          let payForFamily = v.family > 4 ? 4 * payForHealth : Number(v.family) * payForHealth;

          return {
            ...v,
            health_insurance: payForHealth,
            labor_insurance: payForLabor,
            sick_leave: payForSick,
            personal_leave: payForPersonal,
            total_family_dependants: payForFamily,
            six_percent: payForSix,
            time: date,
          };
        });
        setSalary([res.data[0], data]);
      } else {
        setSalary(res.data);
      }
    })();
  }, [date]);

  return (
    <>
      <div className="w-fit h-full flex flex-col justify-center items-center m-auto">
        <div className="w-full flex justify-start items-start ml-10">
          <Link to={'/HR/salary'} className="bg-white w-16 h-10 flex justify-center items-center rounded text-[#444]">
            返回
          </Link>
        </div>
        <div className="w-full flex justify-between items-end px-5">
          <p>公司名 : 岳林工業有限公司</p>
          <div>
            <p>人員數 : {salary[1]?.length}</p>
            <p>支付日期 : {date}</p>
          </div>
        </div>
        <table className="table-auto shadow shadow-gray-600">
          <thead>
            <tr>
              <th className="w-40 h-14 border" rowSpan={2}>
                職員代碼
              </th>
              <th className="w-40 h-14 border" rowSpan={2}>
                職員姓名
              </th>
              <th className="w-40 h-14 border">月薪</th>
              <th className="w-40 h-14 border">獎金</th>
              <th className="w-40 h-14 border">病假</th>
              <th className="w-40 h-14 border">事假</th>
              <th className="w-40 h-14 border">個人負擔勞保</th>
              <th className="w-40 h-14 border">個人負擔健保</th>
              <th className="w-40 h-14 border">眷屬加保</th>
              <th className="w-40 h-14 border" rowSpan={3}>
                實支付額
              </th>
            </tr>
            <tr>
              <th className="w-40 h-14 border">誤餐補助</th>
              <th className="w-40 h-14 border">加班補助</th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border">個人提繳6%</th>
              <th className="w-40 h-14 border">代訂便當</th>
              <th className="w-40 h-14 border">代扣稅額</th>
            </tr>
            <tr>
              <th className="w-40 h-14 border">報到日期</th>
              <th className="w-40 h-14 border">部門名稱</th>
              <th className="w-40 h-14 border">支付總額</th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border">扣除總額</th>
              <th className="w-40 h-14 border"></th>
              <th className="w-40 h-14 border"></th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {salary[1]?.map((v, i) => {
              let hour = Math.floor((v.salary / 30 / 8) * 10) / 10;
              let payForSick = -Math.round((hour * v.sick) / 2);
              let payForPersonal = -Math.round(hour * v.personal);
              let payForLabor = 0;
              let payForHealth = 0;
              let annualIncome = v.salary * 12;
              let six = v.six * 0.01;
              let payForSix = 0;

              if (annualIncome > 560000) {
                payForSix = -(annualIncome * six * 0.12);
              } else if (annualIncome > 1260000) {
                payForSix = -(annualIncome * six * 0.2);
              } else if (annualIncome > 2520000) {
                payForSix = -(annualIncome * six * 0.3);
              } else if (annualIncome > 4720000) {
                payForSix = -(annualIncome * six * 0.4);
              } else {
                payForSix = -(annualIncome * six * 0.05);
              }

              if (v.salary <= 26400) {
                payForLabor = -Math.round(26400 * 0.12 * 0.2);
                payForHealth = -Math.round(26400 * 0.0517 * 0.3);
              } else if (v.salary <= 27600) {
                payForLabor = -Math.round(27600 * 0.12 * 0.2);
                payForHealth = -Math.round(27600 * 0.0517 * 0.3);
              } else if (v.salary <= 28800) {
                payForLabor = -Math.round(28800 * 0.12 * 0.2);
                payForHealth = -Math.round(28800 * 0.0517 * 0.3);
              } else if (v.salary <= 30300) {
                payForLabor = -Math.round(30300 * 0.12 * 0.2);
                payForHealth = -Math.round(30300 * 0.0517 * 0.3);
              } else if (v.salary <= 31800) {
                payForLabor = -Math.round(31800 * 0.12 * 0.2);
                payForHealth = -Math.round(31800 * 0.0517 * 0.3);
              } else if (v.salary <= 33300) {
                payForLabor = -Math.round(33300 * 0.12 * 0.2);
                payForHealth = -Math.round(33300 * 0.0517 * 0.3);
              } else if (v.salary <= 34800) {
                payForLabor = -Math.round(34800 * 0.12 * 0.2);
                payForHealth = -Math.round(34800 * 0.0517 * 0.3);
              } else if (v.salary <= 36300) {
                payForLabor = -Math.round(36300 * 0.12 * 0.2);
                payForHealth = -Math.round(36300 * 0.0517 * 0.3);
              } else if (v.salary <= 38200) {
                payForLabor = -Math.round(38200 * 0.12 * 0.2);
                payForHealth = -Math.round(38200 * 0.0517 * 0.3);
              } else if (v.salary <= 40100) {
                payForLabor = -Math.round(40100 * 0.12 * 0.2);
                payForHealth = -Math.round(40100 * 0.0517 * 0.3);
              } else if (v.salary <= 42000) {
                payForLabor = -Math.round(42000 * 0.12 * 0.2);
                payForHealth = -Math.round(42000 * 0.0517 * 0.3);
              } else if (v.salary <= 43900) {
                payForLabor = -Math.round(43900 * 0.12 * 0.2);
                payForHealth = -Math.round(43900 * 0.0517 * 0.3);
              } else {
                payForLabor = -Math.round(45800 * 0.12 * 0.2);
                payForHealth = -Math.round(45800 * 0.0517 * 0.3);
              }

              let payForFamily = v.family > 4 ? 4 * payForHealth : Number(v.family) * payForHealth;
              let payTotal = v.salary + v.overtime_meal + v.overtime + v.bonus;
              let payDeduction = payForSick + payForPersonal + payForLabor + payForHealth + payForFamily + payForSix + v.bento + v.tax;
              let payActually = payTotal + payDeduction;

              function thousands(value) {
                if (value) {
                  value += '';
                  var arr = value.split('.');
                  var re = /(\d{1,3})(?=(\d{3})+$)/g;

                  return arr[0].replace(re, '$1,') + (arr.length == 2 ? '.' + arr[1] : '');
                } else {
                  return '';
                }
              }

              function handleUnfixedPrice(e, eid, key) {
                if (key == 'overtime') {
                  setSalary((prev) => [
                    prev[0],
                    prev[1].map((v) => {
                      if (v.employee_id === eid) {
                        let beforeTwo = Math.floor(hour * 2 * 1.34 * 10) / 10;
                        let afterTwo = Math.floor(hour * (e.target.value - 2) * 1.67 * 10) / 10;
                        let total = 0;
                        if (e.target.value > 2) {
                          total = Math.round(Number(beforeTwo) + Number(afterTwo));
                        } else {
                          total = Math.round(Number(hour * e.target.value * 1.34));
                        }
                        return { ...v, [key]: total };
                      }
                      return v;
                    }),
                  ]);
                } else {
                  setSalary((prev) => [
                    prev[0],
                    prev[1].map((v) => {
                      if (v.employee_id === eid) {
                        return {
                          ...v,
                          [key]: Number(e.target.value),
                        };
                      }
                      return v;
                    }),
                  ]);
                }
              }
              return (
                <React.Fragment key={i}>
                  <tr>
                    <th className="w-40 h-12 border" rowSpan={2}>
                      {v.employee_id}
                    </th>
                    <th className="w-40 h-12 border" rowSpan={2}>
                      {v.name}
                    </th>
                    <th className="w-40 h-12 border">{thousands(v.salary)}</th>
                    <th className="w-40 h-12 border">
                      {salary[0].record ? (
                        thousands(v.bonus)
                      ) : (
                        <input
                          type="number"
                          className="w-full bg-white text-[#242424] text-center"
                          onChange={(e) => {
                            handleUnfixedPrice(e, v.employee_id, 'bonus');
                          }}
                        />
                      )}
                    </th>
                    <th className="w-40 h-12 border">
                      {salary[0].record ? (
                        thousands(v.sick_leave)
                      ) : (
                        <div className="h-full flex justify-between items-center">
                          <p className="border-r h-full flex justify-center items-center w-14">{v.sick ? v.sick + 'h' : ''}</p>
                          <p className="pr-2">{v.salary && v.sick && thousands(payForSick)}</p>
                        </div>
                      )}
                    </th>
                    <th className="w-40 h-12 border">
                      {salary[0].record ? (
                        thousands(v.personal_leave)
                      ) : (
                        <div className="h-full flex justify-between items-center">
                          <p className="border-r h-full flex justify-center items-center w-14">{v.personal ? v.personal + 'h' : ''}</p>
                          <p className="pr-2">{v.salary && v.personal && thousands(payForPersonal)}</p>
                        </div>
                      )}
                    </th>
                    <th className="w-40 h-12 border">{salary[0]?.record ? thousands(v.labor_insurance) : thousands(payForLabor)}</th>
                    <th className="w-40 h-12 border">{salary[0]?.record ? thousands(v.health_insurance) : thousands(payForHealth)}</th>
                    <th className="w-40 h-12 border">{salary[0]?.record ? thousands(v.family_dependants) : thousands(payForFamily)}</th>
                    <th className="w-40 h-12 border border-b-black" rowSpan={3}>
                      {salary[0]?.record ? (thousands(v.actually) === '' ? 0 : thousands(v.actually)) : thousands(payActually) === '' ? 0 : thousands(payActually)}
                    </th>
                  </tr>
                  <tr>
                    <th className="w-40 h-12 border">
                      {salary[0].record ? (
                        thousands(v.overtime_meal)
                      ) : (
                        <input
                          type="number"
                          className="w-full bg-white text-[#242424] text-center"
                          onChange={(e) => {
                            handleUnfixedPrice(e, v.employee_id, 'overtime_meal');
                          }}
                        />
                      )}
                    </th>
                    <th className="w-40 h-12 border">
                      {salary[0].record ? (
                        thousands(v.overtime)
                      ) : (
                        <div className="w-full h-full flex justify-between items-center">
                          <input
                            className="border-r h-full flex justify-center items-center w-14  bg-white text-center"
                            onChange={(e) => {
                              handleUnfixedPrice(e, v.employee_id, 'overtime');
                            }}
                            type="text"
                            maxLength={3}
                          />
                          <p className="pe-2">{thousands(v.overtime)}</p>
                        </div>
                      )}
                    </th>
                    <th className="w-40 h-12 border"></th>
                    <th className="w-40 h-12 border"></th>
                    <th className="w-40 h-12 border">{salary[0].record ? thousands(v.six_percent) : thousands(payForSix)}</th>
                    <th className="w-40 h-12 border">
                      {salary[0].record ? (
                        thousands(v.bento)
                      ) : (
                        <input
                          type="number"
                          className="w-full bg-white text-[#242424] text-center"
                          onChange={(e) => {
                            handleUnfixedPrice(e, v.employee_id, 'bento');
                          }}
                        />
                      )}
                    </th>
                    <th className="w-40 h-12 border">
                      {salary[0].record ? (
                        thousands(v.tax)
                      ) : (
                        <input
                          type="number"
                          className="w-full bg-white text-[#242424] text-center"
                          onChange={(e) => {
                            handleUnfixedPrice(e, v.employee_id, 'tax');
                          }}
                        />
                      )}
                    </th>
                  </tr>
                  <tr>
                    <th className="w-40 h-10 border border-b-black">{v.registration_date}</th>
                    <th className="w-40 h-10 border border-b-black">{v.department_name}</th>
                    <th className="w-40 h-10 border border-b-black">
                      {salary[0]?.record ? (thousands(v.total) === '' ? 0 : thousands(v.total)) : thousands(payTotal) === '' ? 0 : thousands(payTotal)}
                    </th>
                    <th className="w-40 h-10 border border-b-black"></th>
                    <th className="w-40 h-10 border border-b-black"></th>
                    <th className="w-40 h-10 border border-b-black"></th>
                    <th className="w-40 h-10 border border-b-black">
                      {salary[0]?.record ? (thousands(v.deduction) === '' ? 0 : thousands(v.deduction)) : thousands(payDeduction) === '' ? 0 : thousands(payDeduction)}
                    </th>
                    <th className="w-40 h-10 border border-b-black"></th>
                    <th className="w-40 h-10 border border-b-black"></th>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {!salary[0]?.record && (
          <div className="bg-[#444] hover:bg-[#555] rounded py-4 px-6 my-20 cursor-pointer" onClick={handleSubmit}>
            送出
          </div>
        )}
      </div>
    </>
  );
};

export default AddSalary;
