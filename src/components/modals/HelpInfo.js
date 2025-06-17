import {useEffect, useRef} from 'react';
import {Tooltip} from 'react-tooltip'
import parse from 'html-react-parser';
import {useHelpInfoModal} from "@/store";
import {useLocale} from "@/context/locale";

export default function HelpInfo() {
  const {locale} = useLocale()
  const {data, toggleModal} = useHelpInfoModal()
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
      <div className='modal__overlay'>
        <div className="modal-wrap">
          <div className="modal" ref={modalRef} style={{backgroundColor: '#f1f8fb'}}>
            <Tooltip id="my-tooltip" style={{maxWidth: '100%', width: '100%'}}/>
            <div className="modal-content">
              <h3 className="modal__title">
                {
                  locale === 'ru' ? data.text : data.textKk
                }
              </h3>
              <div>
                {locale === 'ru' ? parse(data?.content) : parse(data?.contentKk)}
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
      </div>
  )
}