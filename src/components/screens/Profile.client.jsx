"use client"
import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import Link from "next/link";
import {links} from "@/helper/constants";
import {getItem} from "@/services/storage.service";
import {useLocale} from "@/context/locale";
import translations from "@/translations";

export default function ProfileClient() {
  const {locale} = useLocale()
  const router = useRouter()
  useEffect(() => {
    const oneI = getItem('oneI');
    const oneP = getItem('oneP');
    const onePh = getItem('onePh');

    if (!oneI && !oneP && !onePh) {
      return router.push(`${links.login}`)
    }
  }, [])

  return (
      <div className='page-blank profile'>
        <h2 className='page-blank__title profile-title'>{translations[locale].myCabinet}</h2>
        <div className="profile-list grid">
          <Link href={`${links.main}`} className="profile-item">
            <div className="profile-item__text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18.14 21.62C17.26 21.88 16.22 22 15 22H8.99998C7.77998 22 6.73999 21.88 5.85999 21.62C6.07999 19.02 8.74998 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62Z"
                    stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
                    stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M15.58 10.58C15.58 12.56 13.98 14.17 12 14.17C10.02 14.17 8.42004 12.56 8.42004 10.58C8.42004 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58Z"
                    stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>
                {translations[locale].personalData}
              </span>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
                    stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href={`${links.mytTours}`} className="profile-item">
            <div className="profile-item__text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z"
                    stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M12.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H12.9C14.4 10.5 15 9.86 15 8.27V4.23C15 2.64 14.4 2 12.9 2Z"
                    stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>
                {translations[locale].title.listTours}
              </span>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
                    stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href={`${links.search}`} className="profile-item">
            <div className="profile-item__text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z"
                    stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4L10 20" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray="5 5"/>
              </svg>
              <span>
                {translations[locale].title.searchTourByID}
              </span>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
                    stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
  )
}