"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {links} from "@/helper/constants";
import HeadPage from "@/components/ui/HeadPage";
import translations from "@/translations";
import {useLocale} from "@/context/locale";
import {getItem} from "@/services/storage.service";
import {useRouter} from "next/navigation";
import {Bounce, toast} from "react-toastify";

export default function MainClient() {
  const {locale} = useLocale();
  const router = useRouter()
  const [travelAgentData, setTravelAgentData] = useState({});
  const [userType, setUserType] = useState("tourist");
  const [onePhValue, setOnePhValue] = useState('');
  const [onePValue, setOnePValue] = useState('');

  useEffect(() => {
    const user = getItem('user');
    const oneI = getItem('oneI');
    const oneP = getItem('oneP');
    const onePh = getItem('onePh');
    setUserType(user)

    if(user === "travel-agent") {
      if (!oneP || !onePh) {
        return router.push(`${links.login}`)
      }
      else {
        sign(oneP, onePh).then()
      }
    }
    else {
      if (!oneI || !oneP || !onePh) {
        return router.push(`${links.login}`)
      }
    }

  }, [])

  useEffect(() => {
    const onePh = getItem('onePh');
    if(onePh) {
      setOnePhValue(onePh)
    }
  }, [])

  useEffect(() => {
    const oneP = getItem('oneP');
    if(oneP) {
      setOnePValue(oneP)
    }
  }, [])

  const sign = async (oneP, onePh) => {
    await fetch(`/api/travel-agent?agentlogin=${onePh}&agentpass=${oneP}`)
        .then(async (res) => {
          const result = await res.json();
          console.log("result", result);
          if (result && result?.info && result?.account) {
            setTravelAgentData(result)
            console.log("result", result);
          }

        })
        .catch((e) => {
          toast.error(`${translations[locale].toasts.errorOccurred}`, {
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
          console.log({e});
        });
  }

  return (
      <div className='page-blank profile'>
        <HeadPage title={translations[locale].personalData}/>
        <div className="main-wrapper">
          <div className="main-list">
            <div className="main-item">
              <div className="main-item__label">{translations[locale].labels.userType}</div>
              <div className="main-item__text">{userType === 'travel-agent' ? translations[locale].labels.travelAgent : translations[locale].labels.tourist}</div>
            </div>
            {
              userType === "travel-agent" ?
                  <>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.login}</div>
                      <div className="main-item__text">{onePhValue}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.legalTypeOrg}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.orgtype ? travelAgentData?.info?.orgtype : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.legalNameOrg}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.orgname ? travelAgentData?.info?.orgname : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.brandNameCompany}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.tourfirmname ? travelAgentData?.info?.tourfirmname : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.webSite}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.site ? travelAgentData?.info?.site : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.fullNameDirector}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.chieffname ? travelAgentData?.info?.chieffname : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.emailTravelAgent}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.email ? travelAgentData?.info?.email : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.phoneDirector}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.cellphone ? travelAgentData?.info?.cellphone : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.phoneCompany}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.phone ? travelAgentData?.info?.phone : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.country}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.country ? travelAgentData?.info?.country : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.addressLegal}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.address ? travelAgentData?.info?.address : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.addressPhysical}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.address2 ? travelAgentData?.info?.address2 : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.description}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.description ? travelAgentData?.info?.description : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.notes}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.remarks ? travelAgentData?.info?.remarks : '-'}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.descriptionTwo}</div>
                      <div
                          className="main-item__text">{travelAgentData?.info?.about ? travelAgentData?.info?.about : '-'}</div>
                    </div>
                  </> :
                  <>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.numberPhone}</div>
                      <div className="main-item__text">{onePhValue}</div>
                    </div>
                    <div className="main-item">
                      <div className="main-item__label">{translations[locale].labels.numberPassport}</div>
                      <div className="main-item__text">{onePValue}</div>
                    </div>
                  </>
            }
          </div>
          {
              userType === 'tourist' &&           <Link href={`${links.main}/${links.edit}`} className="btn btn--primary main-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z"
                      fill="#fff"/>
                  <path
                      d="M19.0206 3.48162C17.0806 1.54162 15.1806 1.49162 13.1906 3.48162L11.9806 4.69162C11.8806 4.79162 11.8406 4.95162 11.8806 5.09162C12.6406 7.74162 14.7606 9.86162 17.4106 10.6216C17.4506 10.6316 17.4906 10.6416 17.5306 10.6416C17.6406 10.6416 17.7406 10.6016 17.8206 10.5216L19.0206 9.31162C20.0106 8.33162 20.4906 7.38162 20.4906 6.42162C20.5006 5.43162 20.0206 4.47162 19.0206 3.48162Z"
                      fill="#fff"/>
                  <path
                      d="M15.6103 11.5308C15.3203 11.3908 15.0403 11.2508 14.7703 11.0908C14.5503 10.9608 14.3403 10.8208 14.1303 10.6708C13.9603 10.5608 13.7603 10.4008 13.5703 10.2408C13.5503 10.2308 13.4803 10.1708 13.4003 10.0908C13.0703 9.81078 12.7003 9.45078 12.3703 9.05078C12.3403 9.03078 12.2903 8.96078 12.2203 8.87078C12.1203 8.75078 11.9503 8.55078 11.8003 8.32078C11.6803 8.17078 11.5403 7.95078 11.4103 7.73078C11.2503 7.46078 11.1103 7.19078 10.9703 6.91078C10.9491 6.86539 10.9286 6.82022 10.9088 6.77532C10.7612 6.442 10.3265 6.34455 10.0688 6.60231L4.34032 12.3308C4.21032 12.4608 4.09032 12.7108 4.06032 12.8808L3.52032 16.7108C3.42032 17.3908 3.61032 18.0308 4.03032 18.4608C4.39032 18.8108 4.89032 19.0008 5.43032 19.0008C5.55032 19.0008 5.67032 18.9908 5.79032 18.9708L9.63032 18.4308C9.81032 18.4008 10.0603 18.2808 10.1803 18.1508L15.9016 12.4295C16.1612 12.1699 16.0633 11.7245 15.7257 11.5804C15.6877 11.5642 15.6492 11.5476 15.6103 11.5308Z"
                      fill="#fff"/>
                </svg>
                <span>
              {translations[locale].edit}
            </span>
              </Link>
          }
        </div>
      </div>
  )
}