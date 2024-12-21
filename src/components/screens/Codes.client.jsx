"use client"
import React, {useEffect, useState} from 'react';
import HeadPage from "@/components/ui/HeadPage";
import translations from "@/translations";
import {useLocale} from "@/context/locale";
import {useEmptyModal, useInfoModal} from "@/store";
import {getItem} from "@/services/storage.service";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";
import {Loader2, UserCheck} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import PhoneInput from "@/components/our/PhoneInput";
import {Bounce, toast} from "react-toastify";
import Loading from "@/components/ui/Loading";
import KamkorService from "@/services/kamkor.service";

const CodesClient = () => {
    // const {data, setData} = useTravelAgencies()
    const {toggleModal} = useInfoModal()
    const {locale} = useLocale();
    const {toggleModal: toggleEmptyModal} = useEmptyModal()
    const [data, setData] = useState(null)
    const [firms, setFirms] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingSign, setIsLoadingSign] = useState(false);

    const [isSend, setIsSend] = useState(false);

    useEffect(() => {
        setIsSend(true);
        setIsLoading(true);
        const oneI = getItem('oneI');
        const oneP = getItem('oneP');
        const onePh = getItem('onePh');
        if (oneP && onePh) {
            KamkorService.getCodes(onePh, oneP)
                .then(async (result) => {
                    console.log("result result result", result)
                    if (result && result?.data && result?.data.length > 0) {
                        console.log("result.data", result.data)
                        setData(result.data);
                        setFirms(result.firms);
                        setIsSend(false);
                        setIsLoading(false);
                    } else {
                        setIsSend(false);
                        setIsLoading(false);
                    }
                })
                .catch((e) => {
                    setIsSend(false);
                    setIsLoading(false);
                    console.log({e});
                });
        }
    }, [isLoadingSign]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ru-RU').format(date);
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'paid':
                return <span style={{color: 'green'}}>Нормальный</span>
            case 'bad':
                return <span style={{color: 'orange'}}>Отозван туроператором</span>
            case 'new':
                return <span style={{color: 'red'}}>Ошибочный</span>
            default:
                return <span style={{color: 'grey'}}>Не определено</span>
        }
    }

    const confirmCode = (code) => {
        console.log("code", code)
    }

    const handlePhoneChange = (onlyNumbers) => {
        console.log("onlyNumbers", onlyNumbers)
        setPhoneNumber(onlyNumbers); // Сохраняем только цифры без форматирующих символов
    };

    const sign = async (e) => {
        e.preventDefault()
        console.log("tour", code)
        const oneP = getItem('oneP');
        const onePh = getItem('onePh');
        setIsLoading(true);
        setIsSend(true);
        setIsLoadingSign(true);
        if (code && phoneNumber) {
            KamkorService.confirmTourCode(onePh, oneP, code, phoneNumber)
                .then(async (result) => {
                    console.log("result", result)
                    if (result && result?.data) {
                        setIsSend(false);
                        setIsLoading(false)
                        setIsLoadingSign(false);
                        setIsOpen(false); // Закрываем диалог
                        await toast.success(`${translations[locale].toasts.confirmSuccess}`, {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                    } else {
                        setIsSend(false);
                        setIsLoading(false)
                        setIsLoadingSign(false);
                        setIsOpen(false); // Закрываем диалог
                        await toast.error(`Ошибка со стороны сервера, попробуйте позднее`, {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                    }

                })
                .catch(async (e) => {
                    setIsSend(false);
                    setIsLoadingSign(false);
                    setIsOpen(false); // Закрываем диалог
                    await toast.error(`${translations[locale].toasts.errorOccurred}`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    setIsLoading(false)
                    console.log({e});
                });
        }
    }

    const getFirms = (id) => {
        return firms.filter(item => item?.rowid === id)[0]?.orgname
    }

    const onChangeDialog = () => {
        setIsOpen(!isOpen);
        setIsSend(false);
        setIsLoadingSign(false);
    }

    return (
        <div className="page-blank">
            <HeadPage title="Список туркодов" isDesc={true}
                      description={data && data.length > 0 ? `${data.length} туркодов, ${data.length} клиентов` : null}/>
            {
                isSend && <div className="loader my-5">
                    <Loading/>
                </div>
            }
            <div className="info-list" style={isSend ? {'pointerEvents': 'none', opacity: '0.4'} : {}}>
                {data && data.length > 0 && data.map(item => {
                    const paramsHash = item?.params_hash;
                    const client = item?.clients[0];
                    const query = item?.query;
                    return (
                        <div className="info-item" key={query.id}>
                            <div className="info-item__block">
                                <div className="info-item__label">Статус:</div>
                                <div className="info-item__text">{getStatusText(query.status)}</div>
                            </div>
                            <div className="info-item__block">
                                <div className="info-item__label">Код:</div>
                                <div className="info-item__text">{paramsHash?.q_number}</div>
                            </div>
                            <div className="info-item__block">
                                <div className="info-item__label">Название:</div>
                                <div
                                    className="info-item__text">{paramsHash.q_country + ', ' + paramsHash.q_airport}</div>
                            </div>
                            <div className="info-item__block" style={{padding: '2px 0'}}>
                                <div className="info-item__label">Даты:</div>
                                <div className="info-item__dates">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round"
                                             className="lucide lucide-plane-takeoff">
                                            <path d="M2 22h20"/>
                                            <path
                                                d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"/>
                                        </svg>
                                        <span>{formatDate(paramsHash.q_date_from)}</span>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round"
                                             className="lucide lucide-plane-landing">
                                            <path d="M2 22h20"/>
                                            <path
                                                d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"/>
                                        </svg>
                                        <span>{formatDate(paramsHash.q_date_to)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="info-item__block">
                                <div className="info-item__label">Туроператор:</div>
                                <div className="info-item__text">{getFirms(query.firmid)}</div>
                            </div>
                            <div className="info-item__block">
                                <div className="info-item__label">Номер паспорта:</div>
                                <div className="info-item__text">{client?.params_hash.c_doc_number}</div>
                            </div>
                            <div className="info-item__block">
                                <div className="info-item__label">Подтверждения туркода:</div>
                                {paramsHash.q_agent_assign && paramsHash.q_agent_assign === '1' ?
                                    <div className="info-item__text success">Подтвержден</div> :
                                    <Dialog open={isOpen} onOpenChange={onChangeDialog}>
                                        <DialogTrigger asChild>
                                            <div
                                                className="btn--primary flex items-center justify-center gap-1.5 text-xs py-1.5 px-3 rounded-full cursor-pointer"
                                                onClick={() => setCode(paramsHash.q_number)}>
                                                <UserCheck size='16'/>
                                                Подтвердить
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Подтвердить туркод</DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription>
                                                Это изменяет туркод в базе, добавляя параметр подписи агентом
                                            </DialogDescription>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-row-1 gap-2">
                                                    <Label htmlFor="name">
                                                        № туркода
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        value={code}
                                                        onChange={() => setCode(paramsHash.q_number)}
                                                        className="col-span-3"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="grid grid-row-1 gap-2">
                                                    <Label htmlFor="username">
                                                        Номер телефона
                                                    </Label>
                                                    <PhoneInput type="tel" id='phone' onChange={handlePhoneChange}/>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="button" onClick={sign} disabled={isLoadingSign}>
                                                    {
                                                        isLoadingSign ? <><Loader2
                                                                className="animate-spin"/><span>Пожалуйста подождите</span></> :
                                                            <span>Подтвердить</span>
                                                    }
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    // <div className="btn--primary flex items-center justify-center gap-1.5 text-xs py-1.5 px-3 rounded-full" onClick={() => confirmCode(paramsHash.q_number)}>
                                    //     <UserCheck size='16'/>
                                    //     Подтвердить
                                    // </div>
                                }
                            </div>
                            <Link href={`/codes/${paramsHash.q_number}`} className="info-item__link"
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
                })}
                {
                    isLoading && Array(3).fill('').map((_, i) => {
                        return (
                            <div className="flex flex-col space-y-3" key={i}>
                                <Skeleton className="h-[125px] w-full rounded-xl bg-white"/>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full bg-white"/>
                                    <Skeleton className="h-4 w-full bg-white"/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                (!data && data?.length < 1) && !isLoading &&
                <div className="flex items-center justify-center gap-2 bg-white h-96 text-sm rounded-xl text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-hard-drive">
                        <line x1="22" x2="2" y1="12" y2="12"/>
                        <path
                            d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                        <line x1="6" x2="6.01" y1="16" y2="16"/>
                        <line x1="10" x2="10.01" y1="16" y2="16"/>
                    </svg>
                    <span>Нет данных</span>
                </div>
            }


            {/*        <div className="page-blank__search">
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

            <div className="page-blank__btn" onClick={onReset}>
              <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9.16998 14.83L14.83 9.17004"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14.83 14.83L9.16998 9.17004"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>*/}
            {/*        <div className="page-blank__list-wrap">
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
        </div>*/}
        </div>
    )
}

export default CodesClient;