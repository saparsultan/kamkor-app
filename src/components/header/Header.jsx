"use client"
import Link from "next/link";
import Image from "next/image";
import {useLocale} from "@/context/locale";
import LocaleSwitcher from "@/components/locale-switcher/LocaleSwitcher";
import logo from "@/assets/logos/fondkamkor.png";
import gerb from "@/assets/logos/gerb.png";
import AuthBtn from "@/components/ui/AuthBtn";
import {useEffect, useState} from "react";
import {getItem} from "@/services/storage.service";
import translations from "@/translations";
import '@/sass/header.scss'

export default function Header() {
  const { locale } = useLocale();
  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    const oneI = getItem('oneI');
    const oneP = getItem('oneP');
    const onePh = getItem('onePh');
    if (oneI && oneP && onePh) {
      setIsAuth(true)
    }
  }, []);

  return (
      <header className="header__container">
        <div className="container">
          <div className="header">
            <div className="header-top">
              <div className="header-top__left">
                <Link href="/" className="header__link">
                  <Image
                      src={logo}
                      priority
                      alt="Kamkor logo"
                  />
                </Link>
                <Link href="https://www.gov.kz/memleket/entities/tsm" target="_blank" className="header__link header__link--text">
                  <Image
                      src={gerb}
                      priority
                      alt="Ministry of Tourism and Sports of the RK"
                  />
                  <span dangerouslySetInnerHTML={{ __html: translations[locale].ministryTourismAndSports }}></span>
                </Link>
              </div>
              <div className="header-top__right">
                <LocaleSwitcher/>
                <AuthBtn isAuth={isAuth} title={translations[locale].signIn}/>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};