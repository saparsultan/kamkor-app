"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Loading from "@/components/ui/Loading";
import HeadPage from "@/components/ui/HeadPage";
import translations from "@/translations";
import {useLocale} from "@/context/locale";
import {useParams, useRouter} from "next/navigation";

export default function CodePageClient(props) {
  const {locale} = useLocale();
  const {code} = useParams()
  const [tourCode, setTourCode] = useState("");
  const [tourCodeInfo, setTourCodeInfo] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(false);

    console.log("router", code)

  useEffect(() => {
      setLoading(true);
      fetch(`/api/tourcode?code=${code}`)
          .then(async (response) => {
            const result = await response.json();
            setTourCodeInfo(result);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.log({e});
          });
  }, [code]);

  const onClickTourCode = () => {
    setSearchData(tourCode);
  };
  return (
      <div className="page-blank">
        <HeadPage title={`Тур № ${code}`}/>
        {tourCodeInfo !== null &&
        tourCodeInfo &&
        tourCodeInfo?.data && tourCodeInfo?.data !== 2 &&
        !loading ? (
            <>
              <div className="page-blank__content blank-content">
                <div className="blank-content__caption">{translations[locale].title.tourDetails}</div>
                <ul className="blank-content__list">
                  <li className="blank-content__item">
                    <span>{translations[locale].title.tourStart}</span>
                    <span>{tourCodeInfo?.data?.date_from}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.tourEnd}</span>
                    <span>{tourCodeInfo?.data?.date_to}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.counterDays}</span>
                    <span>{tourCodeInfo?.data?.days_counter}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.fullName}</span>
                    <span>{tourCodeInfo?.data?.fullname}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.note}</span>
                    <span>{tourCodeInfo?.data?.description}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.country}</span>
                    <span>{tourCodeInfo?.data?.country}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.carrierAirlineCodeFirst}</span>
                    <span>{tourCodeInfo?.data?.airlines}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.departureAirportCode}</span>
                    <span>
                      {tourCodeInfo?.data?.airport_from}
                    </span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.arrivalAirportCodeFirst}</span>
                    <span>{tourCodeInfo?.data?.airport}</span>
                  </li>
                </ul>

                <div className="blank-content__caption">
                  Турператор
                </div>
                <div className="blank-content__list">
                  <li className="blank-content__item">
                    <span>{translations[locale].title.name}</span>
                    <span>{tourCodeInfo?.data?.touroperator?.name}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.bin}</span>
                    <span>{tourCodeInfo?.data?.touroperator?.bin}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.address}</span>
                    <span>{tourCodeInfo?.data?.touroperator?.address}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.city}</span>
                    <span>{tourCodeInfo?.data?.touroperator?.city}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.license}</span>
                    <span>{tourCodeInfo?.data?.touroperator?.licence}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.webSite}</span>
                    <span>{tourCodeInfo?.data?.touroperator?.web}</span>
                  </li>
                </div>

                <div className="blank-content__caption">
                  Турагент
                </div>
                <div className="blank-content__list">
                  {/*<li className="blank-content__item">*/}
                  {/*  <span>{translations[locale].title.bin}</span>*/}
                  {/*  <span>{tourCodeInfo?.data?.touragent?.bin}</span>*/}
                  {/*</li>*/}
                  <li className="blank-content__item">
                    <span>{translations[locale].title.name}</span>
                    <span>{tourCodeInfo?.data?.touragent?.name}</span>
                  </li>
                </div>

                {/*<div className="blank-content__caption">*/}
                {/*  Турист*/}
                {/*</div>*/}
                {/*<div className="blank-content__list">*/}
                {/*  /!*<li className="blank-content__item">*!/*/}
                {/*  /!*  <span>{translations[locale].title.passport}</span>*!/*/}
                {/*  /!*  <span>{tourCodeInfo?.data?.passport}</span>*!/*/}
                {/*  /!*</li>*!/*/}
                {/*  <li className="blank-content__item">*/}
                {/*    <span>{translations[locale].title.issuedBy}</span>*/}
                {/*    <span>{tourCodeInfo?.data?.issued_by}</span>*/}
                {/*  </li>*/}
                {/*  <li className="blank-content__item">*/}
                {/*    <span>{translations[locale].title.passportIssued}</span>*/}
                {/*    <span>{tourCodeInfo?.data?.issued_date}</span>*/}
                {/*  </li>*/}
                {/*</div>*/}
              </div>
            </>
        ) : (
            !loading && tourCodeInfo?.data && (
                <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "30px",
                      background: "#fff",
                      borderRadius: "12px",
                    }}
                >
                  {translations[locale].noResults}
                </div>
            )
        )}
        {loading && (
            <div className="loader" style={{marginTop: "20px"}}>
              <Loading/>
            </div>
        )}
      </div>
  )
}