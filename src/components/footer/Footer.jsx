"use client"
import Link from "next/link";
import Image from "next/image";
import {useLocale} from "@/context/locale";
import translations from "@/translations";
import gerb from "@/assets/logos/gerb.png";
import '@/sass/header.scss'

export default function Footer() {
  const { locale } = useLocale();
  return (
      <footer className="footer__container">
        <div className="container">
          <div className="footer">
            <Link href="https://www.gov.kz/memleket/entities/tsm" target="_blank" className="header__link header__link--text">
              <Image
                  src={gerb}
                  priority
                  alt="Ministry of Tourism and Sports of the RK"
              />
              <span dangerouslySetInnerHTML={{ __html: translations[locale].ministryTourismAndSports }}></span>
            </Link>
          </div>
        </div>
      </footer>
  );
};