"use client"
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logos/fondkamkor.png";
import '@/sass/header.scss'
import {useLocale} from "@/context/locale";
import translations from "@/translations";
import LocaleSwitcher from "@/components/locale-switcher/LocaleSwitcher";

export default function Header() {
  const { locale } = useLocale();
  return (
      <header className="header__container">
        <div className="container">
          <div className="header">
            <div className="header-top">
              <Link href="/" className="header__link">
                <Image
                    src={logo}
                    priority
                    alt="Министерство туризма и спорта РК"
                />
              </Link>
              <div>
                {translations[locale].welcome}
              </div>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </header>
  );
};