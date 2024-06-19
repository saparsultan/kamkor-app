"use client"
import React, {useEffect, useState} from 'react';
import {links} from "@/helper/constants";
import HeadPage from "@/components/ui/HeadPage";
import translations from "@/translations";
import {useLocale} from "@/context/locale";
import {getItem, setItem} from "@/services/storage.service";
import {useRouter} from "next/navigation";
import {Bounce, toast} from 'react-toastify';

export default function MainEditClient() {
  const router = useRouter()
  const {locale} = useLocale();
  const [phoneEdit, setPhoneEdit] = useState('')
  const [passportEdit, setPassportEdit] = useState('')

  useEffect(() => {
    const oneI = getItem('oneI');
    const oneP = getItem('oneP');
    const onePh = getItem('onePh');

    if(!oneI || !oneP || !onePh) {
      return router.push(`/${links.login}`)
    }
  }, [])

  useEffect(() => {
    const onePh = getItem('onePh');
    if (onePh) {
      setPhoneEdit(onePh)
    }
  }, [])

  useEffect(() => {
    const oneP = getItem('oneP');
    if (oneP) {
      setPassportEdit(oneP)
    }
  }, [])

  const changePhone = (e) => {
    setPhoneEdit(e.target.value)
  }

  const changePassport = (e) => {
    setPassportEdit(e.target.value)
  }

  const sign = async (e) => {
    e.preventDefault()
    const oneI = getItem('oneI');
    if (phoneEdit && passportEdit) {
      await fetch(`/api/sign?passport=${passportEdit}&pushId=${oneI}&phone=${phoneEdit}`)
          .then(async (res) => {
            const result = await res.json();
            if (result && result?.return?.code) {
              await setItem('oneP', passportEdit)
              await setItem('onePh', phoneEdit)
              await toast.success(`${translations[locale].toasts.dataUpdated}!`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
              setTimeout(() => router.push(`/${links.main}`), 2000);
            }

          })
          .catch((e) => {
            toast.success(`${translations[locale].toasts.dataError}!`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            console.log({e});
          });
    }
  }

  return (
      <div className='page-blank profile'>
        <HeadPage title={translations[locale].personalData}/>
        <form className='login-form' onSubmit={sign}>
          <div className="login-form-field" style={{alignItems: 'flex-start'}}>
            <div className="label">
              {translations[locale].labels.numberPhone}
            </div>
            <input type="text" placeholder={translations[locale].placeholder.numberPhone} className="input"
                   value={phoneEdit}
                   onChange={changePhone} required/>
          </div>
          <div className="login-form-field" style={{alignItems: 'flex-start'}}>
            <div className="label">
              {translations[locale].labels.numberPassport}
            </div>
            <input type="text" placeholder={translations[locale].placeholder.numberPassport} className="input"
                   value={passportEdit}
                   onChange={changePassport} required/>
          </div>
          <button className='btn login-btn' type='submit'>{translations[locale].save}</button>
        </form>
      </div>
  )
}