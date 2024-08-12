import { getUsersPagination } from "@/api/user/getUsersPagination";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerInactiveUserCard } from "@/components/user/inactive-users/ContainerInactiveUserCard";
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
    const data: IncompleteUserValuesData = await getUsersPagination(BACKEND_DOMAIN!, 0, 24, userParse.accessToken, "false")


    return (
        <PaperBlock>
            <header className={`flex justify-center items-end`}>
                <TextPrincipal text="Usuários Inativos" styles={``} />
                <div className="absolute top-20 right-10 max-md:top-[65px]">
                    <Ancora
                        title="Ver usuários ativos"
                        toGo={"/user"}
                        styles={`border border-blue-500 rounded-md bg-transparent
                        duration-200 px-1 py-2 text-blue-500 hover:bg-blue-500 dark:bg-transparent
                        dark:hover:bg-blue-500
                        w-36 h-[43px] text-sm`}
                    />
                </div>
            </header>

            <ContainerInactiveUserCard all={data} backend_domain={BACKEND_DOMAIN!} token={userParse.accessToken} />
        </PaperBlock>
    )
}