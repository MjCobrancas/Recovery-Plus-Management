import { Ancora } from "@/components/Ancora";
import { CardConfigMonitoria } from "@/components/CardConfigMonitoria";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";

export default function ManagementData() {

    return (
        <PaperBlock>
            <TextPrincipal text="Gerencie seus Dados" styles={`max-md:text-2[rem]`} />

            <div
                className={`grid p-5 gap-y-4 md:min-[920px]:grid-cols-5 sm:min-[500px]:grid-cols-1 place-items-center`}
            >
                <CardConfigMonitoria
                    title="Credores"
                    subTitle="Crie ou atualize seus credores"
                    styles={`dark:opacity-90 dark:hover:opacity-80`}
                >
                    <Ancora
                        title="Credores"
                        toGo="/register/creditors"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-blue-400 hover:bg-blue-600 hover:border-blue-600 dark:bg-transparent dark:hover:bg-blue-600`}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Notas"
                    subTitle="Determinar o período de tempo da próxima monitoria a partir da nota"
                    styles={`bg-indigo-500 border-indigo-600 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <Ancora
                        title="Notas"
                        toGo="/register/notes"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-indigo-400 hover:bg-indigo-600 hover:border-indigo-600 dark:bg-transparent dark:hover:bg-indigo-600
        `}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Agendas"
                    subTitle="Configure a criação das agendas"
                    styles={`bg-emerald-400 border-emerald-600 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <Ancora
                        title="Agendas"
                        toGo="/register/agendas"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-500 dark:bg-transparent dark:hover:bg-emerald-500
      `}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Ocorrências"
                    subTitle="Configure suas ocorrências"
                    styles={`bg-amber-500 border-amber-600 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <Ancora
                        title="Ocorrências"
                        toGo="/register/ocorrences"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-amber-400 hover:bg-amber-600 hover:border-amber-600 dark:bg-transparent dark:hover:bg-amber-600
        `}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Perguntas de Monitoria"
                    subTitle="Configure suas perguntas"
                    styles={`bg-rose-500 border-rose-600 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <Ancora
                        title="Perguntas"
                        toGo="/register/questions"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-rose-400 hover:bg-rose-600 hover:border-rose-600 dark:bg-transparent dark:hover:bg-rose-600
        `}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Tarefas"
                    subTitle="Configure a criação e atribuição de tarefas"
                    styles={`bg-blue-700 border-blue-900 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <Ancora
                        title="Tarefas"
                        toGo="/register/tasks"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-blue-500 hover:bg-blue-800 hover:border-blue-600 dark:bg-transparent dark:hover:bg-blue-800
        `}
                    />
                </CardConfigMonitoria>
                
            </div>
        </PaperBlock>

    )
}