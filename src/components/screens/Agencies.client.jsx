"use client"
import React, {useEffect, useState} from 'react';
import HeadPage from "@/components/ui/HeadPage";
import translations from "@/translations";
import {useLocale} from "@/context/locale";
import {useCurrentInfoModal, useEmptyModal, useInfoModal} from "@/store";

const AgenciesClient = () => {
  const [data, setData] = useState([])
  const {setData: setCurrentData} = useCurrentInfoModal()
  const {toggleModal} = useInfoModal()
  const { locale } = useLocale();
  const {toggleModal: toggleEmptyModal} = useEmptyModal()
  const [value, setValue] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)
  const [filterData, setFilterData] = useState([])

  const onFilterData = () => {
    if (value && value !== '') {
      setToggleFilter(true)
      const updatedList = data.filter((item) =>
          item?.tourfirmname.toLowerCase().includes(value.toLowerCase()),
      );
      setFilterData(updatedList)
    }
  }

  const onChangeValue = (e) => {
    const target = e.target.value
    setValue(target)
    if(target === '') {
      setToggleFilter(false)
    }
  }

  const onShowInfo = (item) => {
    toggleModal()
    setCurrentData(item)
  }

  useEffect(() => {
    fetch(
        `/api/agencies`
    ).then(async (res) => {
      const data = await res.json()
      setData(data?.['variants'])
    }).catch(e => console.error(e))

  }, []);

  return (
      <div className="page-blank">
        <HeadPage title={translations[locale].selectTourAgent}/>
        <div className="page-blank__search">
          <div className="page-blank__field">
            <input
                type="text"
                className="page-blank__input"
                placeholder={translations[locale].placeholder?.tourAgent}
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

            {/*<div className="page-blank__btn" onClick={onReset}>*/}
            {/*  <svg*/}
            {/*      width="24"*/}
            {/*      height="24"*/}
            {/*      viewBox="0 0 24 24"*/}
            {/*      fill="none"*/}
            {/*      xmlns="http://www.w3.org/2000/svg"*/}
            {/*  >*/}
            {/*    <path*/}
            {/*        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"*/}
            {/*        stroke="#292D32"*/}
            {/*        strokeWidth="1.5"*/}
            {/*        strokeLinecap="round"*/}
            {/*        strokeLinejoin="round"*/}
            {/*    />*/}
            {/*    <path*/}
            {/*        d="M9.16998 14.83L14.83 9.17004"*/}
            {/*        stroke="#292D32"*/}
            {/*        strokeWidth="1.5"*/}
            {/*        strokeLinecap="round"*/}
            {/*        strokeLinejoin="round"*/}
            {/*    />*/}
            {/*    <path*/}
            {/*        d="M14.83 14.83L9.16998 9.17004"*/}
            {/*        stroke="#292D32"*/}
            {/*        strokeWidth="1.5"*/}
            {/*        strokeLinecap="round"*/}
            {/*        strokeLinejoin="round"*/}
            {/*    />*/}
            {/*  </svg>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className="page-blank__list-wrap">
          <ul className="page-blank__list">
            {!toggleFilter && data && data.length > 0 && (
                data.map((item, i) => {
                  return (
                      <li className="page-blank__item" key={`${item?.id} + ${i}`} onClick={() => onShowInfo(item)}>
                        {item?.tourfirmname}
                      </li>
                  );
                })
            )
            }
            {
              toggleFilter && filterData && filterData.length > 0 ? filterData.map((item, i) => {
                return (
                    <li className="page-blank__item" key={`${item?.id} + ${i}`} onClick={() => onShowInfo(item)}>
                      {item?.tourfirmname}
                    </li>
                );
              }) : toggleFilter && <div className="page-blank__empty">{translations[locale].noResultsRequest}</div>
            }
          </ul>
        </div>
        <div
            className="item-btn item-btn--primary"
            onClick={toggleEmptyModal}
        >
          <span>{translations[locale].noMyAgent}</span>
          <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M14.4297 5.92999L20.4997 12L14.4297 18.07"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.5 12H20.33"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
  )
}

export default AgenciesClient;