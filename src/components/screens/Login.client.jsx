"use client"
import {useState} from "react";
import {v4 as uuidv4} from 'uuid'
import {getItem, setItem} from "@/services/storage.service";
import {useLocale} from "@/context/locale";
import translations from "@/translations";
import {links} from "@/helper/constants";
import {useRouter} from "next/navigation";
import {Bounce, toast} from 'react-toastify';

export default function LoginClient() {
  const router = useRouter()
  const {locale} = useLocale();
  const [phone, setPhone] = useState('')
  const [passport, setPassport] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [errorP, setPError] = useState(false)
  const [errorPh, setPhError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sign = async (e) => {
    e.preventDefault()
    const oneI = getItem('oneI');
    setIsLoading(true)
    if (!confirm) {
      toast.warn(`${translations[locale].toasts.provisionPersonalDataRequired}`, {
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
    }
    if (phone && passport && confirm) {
      const pushId = await generateId()
      await fetch(`/api/sign?passport=${passport}&pushId=${oneI ? oneI : pushId}&phone=${phone}`)
          .then(async (res) => {
            const result = await res.json();
            if (result && result?.return?.code && result?.return?.code === 200) {
              if (!oneI) {
                setItem('oneI', pushId);
              }
              setItem('oneP', passport);
              setItem('onePh', phone);
              setIsLoading(false)
              router.push(`${links.profile}`)
              location.reload();
            } else {
              setPError(true)
              setPhError(true)
              setIsLoading(false)
              toast.error(`${translations[locale].toasts.incorrectPhoneAndPassport}`, {
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
            }

          })
          .catch((e) => {
            toast.error(`${translations[locale].toasts.errorOccurred}`, {
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
            setIsLoading(false)
            console.log({e});
          });
    }
  }

  const generateId = async () => {
    return uuidv4().replace(/-/g, '').slice(0, 16);
  }

  const changePhone = (e) => {
    if (e.target.value === "") {
      setPError(false)
    }
    setPhone(e.target.value)
  }

  const changePassport = (e) => {
    if (e.target.value === "") {
      setPhError(false)
    }
    setPassport(e.target.value)
  }

  const changeConfirm = (e) => {
    setConfirm(e.target.checked)
  }

  return (
      <div className='page-blank login'>
        <h2 className='page-blank__title login-title'>{translations[locale].title.authorization}</h2>
        <form className='login-form' onSubmit={sign}>
          <div className="login-form-field" style={{alignItems: 'flex-start'}}>
            <input type="text" placeholder={translations[locale].placeholder.numberPhone}
                   className={errorP ? 'input input--error' : 'input'} value={phone} required
                   onChange={changePhone}/>
            <span></span>
          </div>
          <div className="login-form-field" style={{alignItems: 'flex-start'}}>
            <input type="text" placeholder={translations[locale].placeholder.numberPassport}
                   className={errorPh ? 'input input--error' : 'input'} value={passport} required
                   onChange={changePassport}/>
          </div>
          <label className="custom-checkbox login-form-field login-form-field--checkbox flex items-center"
                 style={{flexDirection: 'row'}}>
            <input type="checkbox" className="input" aria-checked="false" value={confirm} onChange={changeConfirm}/>
            <span className="custom-checkmark" role="checkbox" aria-hidden="true"></span>
            {translations[locale].iAgreePersonalData}
          </label>
          <button className='btn login-btn' type='submit'
                  disabled={!confirm || isLoading}>{!isLoading ? <span>{translations[locale].signIn}</span> : <span>{translations[locale].loader}</span>}</button>
        </form>
      </div>
  )
}