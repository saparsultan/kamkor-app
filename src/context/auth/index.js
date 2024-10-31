"use client"
import {useEffect} from 'react';
import {getItem, removeItem} from "@/services/storage.service";

export const AuthProvider = ({children}) => {
    useEffect(() => {
        const user = getItem('user');
        const oneI = getItem('oneI');
        const oneP = getItem('oneP');
        const onePh = getItem('onePh');

        if (oneP && onePh) {
            if (user === "travel-agent") {
                fetch(`/api/travel-agent?agentlogin=${onePh}&agentpass=${oneP}`)
                    .then(async (res) => {
                        const result = await res.json();
                        if (!result?.info) {
                            removeItem('user');
                            removeItem('oneP');
                            removeItem('onePh');
                            window.location.reload();
                        }

                    })
                    .catch((e) => {
                        removeItem('user');
                        removeItem('oneP');
                        removeItem('onePh');
                        window.location.reload();
                        console.error("Error auth travel agent", e);
                    });
            }
            if (user === "tourist") {
                fetch(`/api/sign?passport=${oneP}&pushId=${oneI}&phone=${onePh}`)
                    .then(async (res) => {
                        const result = await res.json();
                        if (result && result?.return?.code === 404) {
                            removeItem('user');
                            removeItem('oneP');
                            removeItem('onePh');
                            window.location.reload();
                        }
                    })
                    .catch((e) => {
                        removeItem('user');
                        removeItem('oneP');
                        removeItem('onePh');
                        window.location.reload();
                        console.error("Error auth tourist", e);
                    });
            }
        }

    }, [])

    return (
        <>
            {children}
        </>
    );
};