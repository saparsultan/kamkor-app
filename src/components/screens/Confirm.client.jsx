"use client"
import {useEffect, useState} from "react";
import {getItem} from "@/services/storage.service";
import {useLocale} from "@/context/locale";
import translations from "@/translations";
import {links} from "@/helper/constants";
import {useRouter} from "next/navigation";
import {Bounce, toast} from 'react-toastify';
import Back from "@/components/ui/Back";

export default function ConfirmClient() {
    const router = useRouter()
    const {locale} = useLocale();
    const [passport, setPassport] = useState('')
    const [phone, setPhone] = useState('')
    const [errorP, setPError] = useState(false)
    const [errorPh, setPhError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const user = getItem('user');
        const oneI = getItem('oneI');
        const oneP = getItem('oneP');
        const onePh = getItem('onePh');

        if(user === "travel-agent") {
            if (!oneP || !onePh) {
                return router.push(`${links.login}`)
            }
        }
        else {
            if (!oneI || !oneP || !onePh) {
                return router.push(`${links.login}`)
            }
        }

    }, [])

    const sign = async (e) => {
        e.preventDefault()
        const oneP = getItem('oneP');
        const onePh = getItem('onePh');
        setIsLoading(true)
        if (passport && phone) {
            await fetch(`/api/confirm-tourcode?agentlogin=${onePh}&agentpass=${oneP}&tour=${passport}&phone=${phone}`)
                .then(async (res) => {
                    const result = await res.json();
                    if (result && result?.data) {
                        setIsLoading(false)
                        toast.success(`${translations[locale].toasts.confirmSuccess}`, {
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
                    else {
                        setPError(true)
                        setPhError(true)
                        setIsLoading(false)
                        toast.error(`${translations[locale].toasts.errorInput}`, {
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

    const changePassport = (e) => {
        if (e.target.value === "") {
            setPhError(false)
        }
        setPassport(e.target.value)
    }

    const changePhone = (e) => {
        if (e.target.value === "") {
            setPError(false)
        }
        setPhone(e.target.value)
    }

    return (
        <div className='page-blank login'>
            <div className='page-blank__back-btn'>
                <Back/>
            </div>
            <h2 className='page-blank__title login-title'>{translations[locale].title.confirmationTourCode}</h2>
            <form className='login-form' onSubmit={sign}>
                <div className="login-form-field" style={{alignItems: 'flex-start'}}>
                    <input type="text" placeholder={translations[locale].placeholder.numberPassport}
                           className={errorPh ? 'input input--error' : 'input'} value={passport} required
                           onChange={changePassport}/>
                    <span></span>
                </div>
                <div className="login-form-field" style={{alignItems: 'flex-start'}}>
                    <input type="text" placeholder={translations[locale].placeholder.numberPhone}
                           className={errorP ? 'input input--error' : 'input'} value={phone} required
                           onChange={changePhone}/>
                </div>
                <button className='btn login-btn' type='submit'
                        disabled={!confirm || isLoading}>{!isLoading ? <span>{translations[locale].confirm}</span> :
                    <span>{translations[locale].loader}</span>}</button>
            </form>
        </div>
    )
}