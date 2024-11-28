import { Ancora } from "@/components/Ancora";
import { CardConfigMonitoria } from "@/components/CardConfigMonitoria";
import { PaperBlock } from "@/components/PaperBlock";
import { ButtonManagement } from "@/components/register/ButtonManagement";
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
                    styles={`bg-indigo-700 border-indigo-900 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <ButtonManagement
                        title="Credores"
                        toGo="/register/unique-creditor"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-indigo-500 hover:bg-indigo-800 hover:border-indigo-600 dark:bg-transparent dark:hover:bg-indigo-800`}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Equipes"
                    subTitle="Crie ou atualize suas equipes"
                    styles={`bg-blue-700 border-blue-900 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <Ancora
                        title="Equipes"
                        toGo="/register/creditors"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-blue-400 hover:bg-blue-600 hover:border-blue-600 dark:bg-transparent dark:hover:bg-blue-600`}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Agendas"
                    subTitle="Determinar o período de tempo da próxima monitoria a partir da agenda"
                    styles={`bg-sky-500 border-sky-600 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <ButtonManagement
                        title="Configurar Agenda"
                        toGo="/register/notes"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-sky-400 hover:bg-sky-600 hover:border-sky-600 dark:bg-transparent dark:hover:bg-sky-600`}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Configurar Ocorrências"
                    subTitle="Configure as ocorrências para o credor"
                    styles={`bg-emerald-400 border-emerald-600 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <ButtonManagement
                        title="Configurar Ocorrências"
                        toGo="/register/agendas"
                        styles={`text-center cursor-pointer rounded-md py-2 px-1 text-md duration-300 text-white bg-transparent border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-500 dark:bg-transparent dark:hover:bg-emerald-500`}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Criar Ocorrências"
                    subTitle="Crie ou atualize as suas ocorrências"
                    styles={`bg-amber-500 border-amber-600 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <Ancora
                        title="Criar Ocorrências"
                        toGo="/register/ocorrences"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-amber-400 hover:bg-amber-600 hover:border-amber-600 dark:bg-transparent dark:hover:bg-amber-600`}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Perguntas para Monitoria"
                    subTitle="Crie ou atualize as suas perguntas"
                    styles={`bg-fuchsia-600 border-fuchsia-700 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <ButtonManagement
                        title="Criar Perguntas"
                        toGo="/register/questions"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-fuchsia-500 hover:bg-fuchsia-700 hover:border-fuchsia-700 dark:bg-transparent dark:hover:bg-fuchsia-700`}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Tarefas"
                    subTitle="Configure a criação e atribuição de tarefas"
                    styles={`bg-rose-600 border-rose-800 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <ButtonManagement
                        title="Tarefas"
                        toGo="/register/tasks"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-rose-500 hover:bg-rose-800 hover:border-rose-600 dark:bg-transparent dark:hover:bg-rose-800`}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Prepare a Monitoria"
                    subTitle="Atribuir questões a um credor"
                    styles={`bg-orange-600 border-orange-700 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <ButtonManagement
                        title="Prepare a Monitoria"
                        toGo="/monitoring/config-monitoring"
                        styles={`text-center cursor-pointer rounded-md py-2 px-2 text-md duration-300 text-white bg-transparent border border-orange-500 hover:bg-orange-800 hover:border-orange-600 dark:bg-transparent dark:hover:bg-orange-800`}
                    />
                </CardConfigMonitoria>

                <CardConfigMonitoria
                    title="Head Count"
                    subTitle="Configure as quantidades de operadores em determinados credores"
                    styles={`bg-red-600 border-red-700 border-2 dark:opacity-90 dark:hover:opacity-80`}
                >
                    <Ancora
                        title="Configurar Head count"
                        toGo="/register/head-count"
                        styles={`text-center cursor-pointer rounded-md py-2 px-1 text-md duration-300 text-white bg-transparent border border-red-500 hover:bg-red-700 hover:border-red-500 dark:bg-transparent dark:hover:bg-red-700`}
                    />
                </CardConfigMonitoria>

            </div>
        </PaperBlock>

    )
}