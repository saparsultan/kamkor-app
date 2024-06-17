"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Loading from "@/components/ui/Loading";
import HeadPage from "@/components/ui/HeadPage";
import translations from "@/translations";
import {useLocale} from "@/context/locale";

export default function SearchClient(props) {
  const {locale} = useLocale();
  const [tourCode, setTourCode] = useState("");
  const [tourCodeInfo, setTourCodeInfo] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeName, setCodeName] = useState("");

  useEffect(() => {
    if (searchData && searchData !== "") {
      setLoading(true);
      setCodeName(searchData)
      fetch(`/api/tourcode?code=${searchData}`)
          .then(async (response) => {
            const result = await response.json();
            setTourCodeInfo(result);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.log({e});
          });
    }
  }, [searchData]);

  const onClickTourCode = () => {
    setSearchData(tourCode);
  };
  return (
      <div className="page-blank">
        <HeadPage title={translations[locale].checkTourCode}/>
        <div className="page-blank__search">
          <div className="page-blank__field">
            <div className="page-blank__field-wrap">
              <input
                  type="text"
                  className="page-blank__input"
                  placeholder={translations[locale].placeholder?.tourCode}
                  value={tourCode}
                  onChange={(e) => setTourCode(e.target.value)}
              />
              <div className="item-btn item-btn--search" onClick={onClickTourCode}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="#0065ad" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 22L20 20" stroke="#0065ad" strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          {tourCodeInfo !== null &&
              tourCodeInfo &&
              tourCodeInfo?.data &&
              !loading && (
                  <div className="main-grid__item" style={{margin: "20px 0"}}>
                  <span className="main-grid__label">
                    {translations[locale].problemsTour}
                  </span>
                    <Link
                        href={`https://api.whatsapp.com/send?phone=+77018880395&text=Здравствуйте!🆘%0AПрошу оказать содействие в возврате в Казахстан.%0A%0AМои данные:%0AНомер тура в реестре: ${
                            searchData
                        },%0AНачало тура: ${
                            tourCodeInfo?.data?.date_from
                        },%0AКонец тура: ${
                            tourCodeInfo?.data?.date_to
                        },%0AСтрана: ${
                            tourCodeInfo?.data?.country
                        },%0AКод авиакомпании-перевозчика (первой): ${
                            tourCodeInfo?.data?.airlines
                        },%0AКод аэропорта вылета (Казахстан): ${
                            tourCodeInfo?.data?.airport_from
                        },%0AКод аэропорта прилета (первый): ${
                            tourCodeInfo?.data?.airport
                        },%0AОрганизация-турагент: ${
                            tourCodeInfo?.data?.touragent?.name
                        },%0A%0AПаспорт туриста:%0A${
                            tourCodeInfo?.data?.passport
                        }
                `}
                        target="_blank"
                        className="main-grid__link"
                    >
                      {translations[locale].sosRequest}
                    </Link>
                  </div>
              )}
        </div>
        {tourCodeInfo !== null &&
        tourCodeInfo &&
        tourCodeInfo?.data && tourCodeInfo?.data !== 2 &&
        !loading ? (
            <>
              <div className="page-blank__content blank-content">
                <div className="blank-content__name">
                  Тур № {codeName}
                </div>
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
                  <li className="blank-content__item">
                    <span>{translations[locale].title.bin}</span>
                    <span>{tourCodeInfo?.data?.touragent?.bin}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.name}</span>
                    <span>{tourCodeInfo?.data?.touragent?.name}</span>
                  </li>
                </div>

                <div className="blank-content__caption">
                  Турист
                </div>
                <div className="blank-content__list">
                  <li className="blank-content__item">
                    <span>{translations[locale].title.passport}</span>
                    <span>{tourCodeInfo?.data?.passport}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.issuedBy}</span>
                    <span>{tourCodeInfo?.data?.issued_by}</span>
                  </li>
                  <li className="blank-content__item">
                    <span>{translations[locale].title.passportIssued}</span>
                    <span>{tourCodeInfo?.data?.issued_date}</span>
                  </li>
                </div>
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