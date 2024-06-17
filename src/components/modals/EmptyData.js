import {useEffect, useRef} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useEmptyModal} from "@/store";
import {useLocale} from "@/context/locale";
import translations from "@/translations";
import emptyImage from '@/assets/images/no-code.png'

export default function EmptyData() {
  const {locale} = useLocale();
  const {toggleModal} = useEmptyModal();
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

  return (
      <div className='modal__overlay' style={{backgroundColor: 'rgba(0, 0, 0, .64)'}}>
        <div className="modal-wrap">
          <div className="modal" ref={modalRef} style={{paddingBottom: '20px'}}>
            <div className="modal-content">
              <p style={{fontSize: "14px", lineHeight: '137%'}}>
                {translations[locale].emptyDesc}
              </p>
              <div className="modal__desc">
                {translations[locale].contactConsultation}
              </div>
              <Image src={emptyImage} priority={true} alt={translations[locale].noTourAgent} className="modal__img"/>
              <Link href='https://api.whatsapp.com/send/?phone=77018880395&text&type=phone_number&app_absent=0'
                    target="_blank"
                    className="item-btn item-btn--primary"
              >
                <span>{translations[locale].contactKamkor}</span>
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
              </Link>
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
      </div>
  )
}