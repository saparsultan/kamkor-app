"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import HeadPage from "@/components/ui/HeadPage";
import translations from "@/translations";
import {getItem} from "@/services/storage.service";
import {useLocale} from "@/context/locale";
import {links} from "@/helper/constants";
import Link from "next/link";
import Loading from "@/components/ui/Loading";
import KamkorService from "@/services/kamkor.service";

const ToursClient = () => {
    const router = useRouter()
    const {locale} = useLocale();
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([])
    const [value, setValue] = useState('')
    const [toggleFilter, setToggleFilter] = useState(false);

    const [isLoading, setIsLoading] = useState(false)

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
            setIsLoading(true);

            KamkorService.getTouristToursList(oneP, oneI, onePh)
                .then( (res) => {
                    // const result =  res.json();
                    console.log("res", res)
                    const sortedTours = res?.return.sort((a, b) => {
                        const dateA = new Date(a.date_from);
                        const dateB = new Date(b.date_from);
                        return dateB.getTime() - dateA.getTime();
                    });
                    setIsLoading(false);
                    setData(sortedTours);
                })
                .catch((e) => {
                    setIsLoading(false);
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
            setIsLoading(true);
            setToggleFilter(true)
            const updatedList = data.filter((item) =>
                item?.tourcode.toLowerCase().includes(value.toLowerCase()),
            );
            setFilterData(updatedList);
            setIsLoading(false);
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
            <div className="info-list">
                {
                    !isLoading ? !toggleFilter && data && data.length > 0 && data.map((item, i) => {
                        return (
                            <div className="info-item" key={`${item?.tourcode} + ${i}`}>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.numberTourCode}:</div>
                                    <div className="info-item__text">{item?.tourcode}</div>
                                </div>
                                {/*<div className="info-item__block">*/}
                                {/*    <div className="info-item__label">{translations[locale].labels.numberPassport}:</div>*/}
                                {/*    <div className="info-item__text">{item?.passport}</div>*/}
                                {/*</div>*/}
                                {
                                    item.touragent && <div className="info-item__block">
                                        <div className="info-item__label">{translations[locale].labels.travelAgent}:</div>
                                        <div className="info-item__text">{item?.touragent}</div>
                                    </div>
                                }
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.departureDate}:</div>
                                    <div className="info-item__text">{item?.date_from}</div>
                                </div>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.arrivalDate}:</div>
                                    <div className="info-item__text">{item?.date_to}</div>
                                </div>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.tourOperator}:</div>
                                    <div className="info-item__text">{item?.touroperator}</div>
                                </div>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.IATAAirportCode}:</div>
                                    <div className="info-item__text">{item?.airport}</div>
                                </div>
                                <Link href={`/codes/${item?.tourcode}`} className="info-item__link"
                                      style={{textDecoration: 'none'}}>
                                    <span>Подробнее</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                         fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                         className="lucide lucide-arrow-up-right">
                                        <path d="M7 7h10v10"/>
                                        <path d="M7 17 17 7"/>
                                    </svg>
                                </Link>
                            </div>
                        )
                    }) : <div className="loader" style={{marginTop: "20px"}}>
                        <Loading/>
                    </div>
                }
                {
                    toggleFilter && filterData && filterData.length > 0 && filterData.map((item, i) => {
                        return (
                            <div className="info-item" key={`${item?.tourcode} + ${i}`}>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.numberTourCode}:
                                    </div>
                                    <div className="info-item__text">{item?.tourcode}</div>
                                </div>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.binTourAgent}:</div>
                                    <div className="info-item__text">{item?.touragent_bin}</div>
                                </div>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.departureDate}:</div>
                                    <div className="info-item__text">{item?.date_from}</div>
                                </div>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.arrivalDate}:</div>
                                    <div className="info-item__text">{item?.date_to}</div>
                                </div>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.tourOperator}:</div>
                                    <div className="info-item__text">{item?.touroperator}</div>
                                </div>
                                <div className="info-item__block">
                                    <div className="info-item__label">{translations[locale].labels.IATAAirportCode}:
                                    </div>
                                    <div className="info-item__text">{item?.airport}</div>
                                </div>
                                <Link href={`/codes/${item?.tourcode}`} className="info-item__link"
                                      style={{textDecoration: 'none'}}>
                                    <span>Подробнее</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                         fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="lucide lucide-arrow-up-right">
                                        <path d="M7 7h10v10"/>
                                        <path d="M7 17 17 7"/>
                                    </svg>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            <div className="page-blank__list-wrap page-blank__list-table">
                {
                toggleFilter && filterData.length < 1 &&
                    <div className="page-blank__empty"
                         style={{height: 'auto'}}>{translations[locale].noResultsRequest}</div>
                }
            </div>
        </div>
    )
}

export default ToursClient;