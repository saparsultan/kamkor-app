"use client"
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid'
import {getItem, setItem} from "@/services/storage.service";
import {useLocale} from "@/context/locale";
import translations from "@/translations";
import {links} from "@/helper/constants";
import {useRouter} from "next/navigation";
import {Bounce, toast} from 'react-toastify';
import Back from "@/components/ui/Back";
import {useAuth} from "@/store";
import KamkorService from "@/services/kamkor.service";

export default function LoginAgentClient() {
  const router = useRouter()
  const {locale} = useLocale();
  const {isAuth, toggleAuth} = useAuth()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [errorP, setPError] = useState(false)
  const [errorPh, setPhError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const oneP = getItem('oneP');
    const onePh = getItem('onePh');
    const user = getItem('user');

    if(user === "travel-agent" && oneP && onePh) {
      return router.push(`/`)
    }
  }, [])

  const sign = async (e) => {
    e.preventDefault()
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
    if (login && password && confirm) {
      KamkorService.authTravelAgent(login, password)
          .then(async (result) => {
            if (result && result?.info) {
              setItem('oneP', password);
              setItem('onePh', login);
              setItem('user', "travel-agent");
              setIsLoading(false);
              router.push(`/${links.profile}`)
              setTimeout(() => window.location.reload(), 1000);
            }
            else {
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

  const changeLogin = (e) => {
    if (e.target.value === "") {
      setPError(false)
    }
    setLogin(e.target.value)
  }

  const changePassport = (e) => {
    if (e.target.value === "") {
      setPhError(false)
    }
    setPassword(e.target.value)
  }

  const changeConfirm = (e) => {
    setConfirm(e.target.checked)
  }

  return (
      <div className='page-blank login'>
        <div className='page-blank__back-btn'>
          <Back/>
        </div>
        <h2 className='page-blank__title login-title'>{translations[locale].title.authTravelAgent}</h2>
        <form className='login-form' onSubmit={sign}>
          <div className="login-form-field" style={{alignItems: 'flex-start'}}>
            <input type="text" placeholder={translations[locale].placeholder.login}
                   className={errorP ? 'input input--error' : 'input'} value={login} required
                   onChange={changeLogin}/>
            <span></span>
          </div>
          <div className="login-form-field" style={{alignItems: 'flex-start'}}>
            <input type="password" placeholder={translations[locale].placeholder.password}
                   className={errorPh ? 'input input--error' : 'input'} value={password} required
                   onChange={changePassport}/>
          </div>
          <label className="custom-checkbox login-form-field login-form-field--checkbox flex items-center"
                 style={{flexDirection: 'row'}}>
            <input type="checkbox" className="input" aria-checked="false" value={confirm} onChange={changeConfirm}/>
            <span className="custom-checkmark" role="checkbox" aria-hidden="true"></span>
            <span className="custom-checkmark-text">{translations[locale].iAgreePersonalData}</span>
          </label>
          <button className='btn login-btn' type='submit'
                  disabled={!confirm || isLoading}>{!isLoading ? <span>{translations[locale].signIn}</span> :
              <span>{translations[locale].loader}</span>}</button>
        </form>
      </div>
  )
}