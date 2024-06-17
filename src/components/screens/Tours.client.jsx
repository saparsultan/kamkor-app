"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import HeadPage from "@/components/ui/HeadPage";
import translations from "@/translations";
import {getItem} from "@/services/storage.service";
import {useLocale} from "@/context/locale";
import {links} from "@/helper/constants";

const ToursClient = () => {
  const router = useRouter()
  const {locale} = useLocale();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([])
  const [value, setValue] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  useEffect(() => {
    const oneI = getItem('oneI');
    const oneP = getItem('oneP');
    const onePh = getItem('onePh');

    if (!oneI && !oneP && !onePh) {
      return router.push(`${links.login}`)
    }
  }, [])

  useEffect(() => {
    const oneI = getItem('oneI');
    const oneP = getItem('oneP');
    const onePh = getItem('onePh');
    if (oneI && oneP && onePh) {
      fetch(`/api/tours?passport=${oneP}&pushId=${oneI}&phone=${onePh}`)
          .then(async (res) => {
            const result = await res.json();
            setData(result?.return)
          })
          .catch((e) => {
            console.log({e});
          });
    }
  }, []);

  const onChangeValue = (e) => {
    const target = e.target.value
    setValue(target)
    if (target === '') {
      setToggleFilter(false)
    }
  }

  const onFilterData = () => {
    if (value && value !== '') {
      setToggleFilter(true)
      const updatedList = data.filter((item) =>
          item?.tourcode.toLowerCase().includes(value.toLowerCase()),
      );
      setFilterData(updatedList)
    }
  }

  return (
      <div className="page-blank">
        <HeadPage title={translations[locale].listTours}/>
        <div className="page-blank__search">
          <div className="page-blank__field">
            <input
                type="text"
                className="page-blank__input"
                placeholder={translations[locale].placeholder.searchTourCodeNumber}
                value={value}
                onChange={onChangeValue}
            />

            <div className="page-blank__btn" onClick={onFilterData}>
              <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M22 22L20 20"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="page-blank__list-wrap page-blank__list-table">

          <div className="tours-table-wrap">
            <table className='tours-table'>
              <thead>
              <tr>
                <th>{translations[locale].labels.binTourAgent}</th>
                <th>{translations[locale].labels.departureDate}</th>
                <th>{translations[locale].labels.arrivalDate}</th>
                <th>{translations[locale].labels.tourOperator}</th>
                <th>{translations[locale].labels.IATAAirportCode}</th>
                <th>{translations[locale].labels.numberTourCode}</th>
              </tr>
              </thead>
              <tbody>
              {!toggleFilter && data && data.length > 0 && (
                  data.map((item, i) => {
                    return (
                        <tr key={`${item?.tourcode} + ${i}`}>
                          <td>
                            {item?.touragent_bin}
                          </td>
                          <td>
                            {item?.date_from}
                          </td>
                          <td>
                            {item?.date_to}
                          </td>
                          <td>
                            {item?.touroperator}
                          </td>
                          <td>
                            {item?.airport}
                          </td>
                          <td>
                            {item?.tourcode}
                          </td>
                        </tr>
                    );
                  })
              )
              }
              {
                  toggleFilter && filterData && filterData.length > 0 && filterData.map((item, i) => {
                    return (
                        <tr key={`${item?.tourcode} + ${i}`}>
                          <td>
                            {item?.touragent_bin}
                          </td>
                          <td>
                            {item?.date_from}
                          </td>
                          <td>
                            {item?.date_to}
                          </td>
                          <td>
                            {item?.touroperator}
                          </td>
                          <td>
                            {item?.airport}
                          </td>
                          <td>
                            {item?.tourcode}
                          </td>
                        </tr>
                    );
                  })
              }
              </tbody>
            </table>
          </div>
          {
              toggleFilter && filterData.length < 1 &&
              <div className="page-blank__empty" style={{height: 'auto'}}>{translations[locale].noResultsRequest}</div>
          }
        </div>
      </div>
  )
}

export default ToursClient;