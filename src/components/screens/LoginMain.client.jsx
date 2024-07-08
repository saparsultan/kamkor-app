"use client"
import Link from "next/link";
import {useLocale} from "@/context/locale";
import translations from "@/translations";
import {useRouter} from "next/navigation";
import {links} from "@/helper/constants";

export default function LoginMainClient() {
  const router = useRouter()
  const {locale} = useLocale();


  return (
      <div className='page-blank login'>
        <h2 className='page-blank__title login-title'>{translations[locale].title.authorization}</h2>
        <div className="login-tab">
            <Link href={`${links.login}/${links.tourist}`} className="login-tab__link">Турист</Link>
        <Link href={`${links.login}/${links.travelAgent}`} className="login-tab__link">Турагент</Link>
        </div>
      </div>
  )
}