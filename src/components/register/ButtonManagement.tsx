'use client'

import { IButtonManagement } from "@/interfaces/register/IButtonManagement"
import { verifyUserPermission } from "@/utils/VerifyUserPermission"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

export function ButtonManagement({ title, toGo, styles }: IButtonManagement) {

    const router = useRouter()

    async function verifyUserPermissions() {
        const userRole = await verifyUserPermission()

        if (!userRole) {
            toast.error("Você não possui a permissão necessária para acessar este módulo!", {
                duration: 5000
            })

            return
        }

        router.push(toGo)
    }

    return (
        <>
            <button
                onClick={() => verifyUserPermissions()}
            >
                <div
                    className={styles}
                >
                    {title}
                </div>
            </button>

            <Toaster 
                reverseOrder={true}
                position="bottom-right"
            />
        </>
    )
}