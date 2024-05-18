import {useLocale} from "@/context/locale";
import {languages, shortLanguages} from "@/helper/constants";

export default function LocaleSwitcher() {
  const { locale, changeLocale } = useLocale()

  return (
      <div className="lang">
        <div className={`lang__select ${locale === languages.kk && 'active'}`} onClick={() => changeLocale(languages.kk)}>
          {shortLanguages.kk}
        </div>
        <div className={`lang__select ${locale === languages.ru && 'active'}`} onClick={() => changeLocale(languages.ru)}>
          {shortLanguages.ru}
        </div>
      </div>
  );
}