"use client"
import Link from "next/link";
import translations from "@/translations";
import {useLocale} from "@/context/locale";
import {links} from "@/helper/constants";
import '@/sass/home.scss'

export default function Home() {
    const {locale} = useLocale();

    return (
        <div className="main-grid__container">
            <div className="container">
                <div className="main-grid">
                    <div className="main-grid__item">
                        <div className="main-grid__label">
                            {translations[locale].titleTourAgent}
                        </div>
                        <Link href={`/${links.travelAgencies}`} className="item-btn">
                            <span>{translations[locale].find}</span>
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
                    <div className="main-grid__item">
                        <span className="main-grid__label">{translations[locale].title.confirmationTourCode}</span>
                        <Link href={`/${links.confirm}`} className="item-btn item-btn--primary">
                            <span>{translations[locale].confirm}</span>
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
                    <div className="main-grid__item">
                        <span className="main-grid__label">{translations[locale].youTravelAgent}</span>
                        <Link href={`/${links.search}`} className="item-btn item-btn--primary">
                            <span>{translations[locale].check}</span>
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
                        {/*<NoTourcode/>*/}
                    </div>
                    <div className="main-grid__item">
                        <span className="main-grid__label">{translations[locale].problemsTour}</span>
                        <Link
                            href={`/${links.help}`}
                            className="main-grid__link"
                        >
                            SOS
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
