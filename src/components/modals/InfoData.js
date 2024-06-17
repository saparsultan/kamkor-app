import {useEffect, useRef} from "react";
import Image from "next/image";
import {useCurrentInfoModal, useInfoModal} from "@/store";
import translations from "@/translations";
import {useLocale} from "@/context/locale";
// import Map from "@/components/Map";

export default function InfoData() {
  const {locale} = useLocale();
  const {toggleModal} = useInfoModal();
  const {data} = useCurrentInfoModal();
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleModal]);

  const onCloseModal = () => {
    toggleModal();
  };

  return (<div className="modal__overlay">
    <div className="modal-wrap">
      <div
          ref={modalRef}
          className="modal"
      >
        <div className="modal-content">
          <div className="modal__top">
            <h3 className="modal__title">
              {translations[locale].title.travelAgencyInfo}
            </h3>
            <div className="modal__row" style={{alignItems: 'center'}}>
              <div className="modal__info-name">
                {data?.tourfirmname}
              </div>
              <div className="modal__preview">
                <Image src={`https://www.fondkamkor.kz/Voucher/agents/${data?.rowid}/${data?.logo}`} width={100}
                       height={100} alt={data?.tourfirmname}/>
              </div>
            </div>
            <div className="modal__row">
              {data?.town !== '' && <div className="modal__info-item">
                <div className="modal__info-label">
                  {translations[locale].title.city}
                </div>
                <div className="modal__info-text">
                  {data?.town}
                </div>
              </div>}
              {data?.url !== '' && <div className="modal__info-item">
                <div className="modal__info-label">
                  {translations[locale].title.webSite}
                </div>
                <div className="modal__info-text">
                  {data?.url}
                </div>
              </div>}
            </div>
            {data?.orgname !== '' && <div className="modal__info-item">
              <div className="modal__info-label">
                {translations[locale].title.organization}
              </div>
              <div className="modal__info-text">
                {data?.orgname}
              </div>
            </div>}
            {data?.chieffname !== '' && <div className="modal__info-item">
              <div className="modal__info-label">
                {translations[locale].title.travelAgencyDirector}
              </div>
              <div className="modal__info-text">
                {data?.chieffname}
              </div>
            </div>}
          </div>
          <div className="modal__bottom">
            <h3 className="modal__title">
              {translations[locale].title.contactInfo}
            </h3>
            {data?.phone !== '' && <div className="modal__info-item">
              <div className="modal__info-label">
                Телефон
              </div>
              <div className="modal__info-text">
                {data?.phone}
              </div>
            </div>}
            {data?.email !== '' && <div className="modal__info-item">
              <div className="modal__info-label">
                Email
              </div>
              <div className="modal__info-text">
                {data?.email}
              </div>
            </div>}
            {data?.address !== '' && <div className="modal__info-item">
              <div className="modal__info-label">
                {translations[locale].title.address}
              </div>
              <div className="modal__info-text">
                {data?.address}
              </div>
            </div>}
            {/*<div className="modal__map">*/}
            {/*  <Map lat={+data?.lat} lng={+data?.lng}/>*/}
            {/*</div>*/}

          </div>
        </div>
      </div>
      <div className="modal-close" onClick={onCloseModal}>
        <svg
            width="32"
            height="32"
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
  </div>);
}
