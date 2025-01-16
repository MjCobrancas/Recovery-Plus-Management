import { getQuantityUsersNotUpdate } from "@/api/user/getQuantityUsersNotUpdate";
import { getUsersPagination } from "@/api/user/getUsersPagination";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerUserCard } from "@/components/user/ContainerUserCard";
import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { IncompleteUserValuesData } from "@/interfaces/user/UserCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = cookies().get("user")

    if (!user) {
        return (
            redirect("/login")
        )
    }

    const userParse: ITokenUserInitialValues = JSON.parse(user.value)

    const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN
    const data: IncompleteUserValuesData = await getUsersPagination(BACKEND_DOMAIN!, 0, 24, userParse.accessToken, "true")
    const countQuantityUsersNotUpdate = await getQuantityUsersNotUpdate()

    return (
        <PaperBlock>
            <header className="flex justify-center items-end">
                <TextPrincipal text="Usuários" styles={``} />
                <div className="absolute top-20 right-10 max-md:top-[65px]">
                    <Ancora
                        title="Cadastrar"
                        toGo={"/user/register"}
                        styles={`border border-green-500 rounded-md bg-transparent
                        duration-200 px-2 py-2 text-green-500 hover:bg-green-500 dark:bg-transparent
                        dark:hover:bg-green-500
                        w-36 h-[43px] text-md`}
                    />

                    <Ancora
                        title="Cadastro rápido"
                        toGo={"/user/quick-register"}
                        styles={`border border-green-500 rounded-md bg-transparent
                    duration-200 px-2 py-2 mt-2 text-green-500 hover:bg-green-500 dark:bg-transparent
                    dark:hover:bg-green-500
                    w-36 h-[43px] text-[12px]`}
                    />

                    <Ancora
                        title="Ver usuários inativos"
                        toGo={"/user/inactive-users"}
                        styles={`border border-blue-500 rounded-md bg-transparent
                    duration-200 px-2 py-2 mt-2 text-blue-500 hover:bg-blue-500 dark:bg-transparent
                    dark:hover:bg-blue-500
                    w-36 h-[43px] text-[12px]`}
                    />

                </div>
            </header>

            <ContainerUserCard 
                all={data} 
                backend_domain={BACKEND_DOMAIN!} 
                token={userParse.accessToken} 
                countQuantityUsersNotUpdate={countQuantityUsersNotUpdate}
            />

        </PaperBlock >
    )

}