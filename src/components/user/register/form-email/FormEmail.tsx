import { IFormEmail, IFormEmailProps } from "@/interfaces/user/register/FormEmail";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { CardEmailForm } from "./CardEmailForm";
import { ButtonNextOrBack } from "@/components/ButtonNextOrBack";

export function FormEmail({ updatePage, setEmailsFormValue, emailsForm }: IFormEmailProps) {
    const [emails, setEmails] = useState<IFormEmail[]>(emailsForm.length > 0 ? emailsForm : [])

    const [disableButton, setDisableButton] = useState(false)

    async function handleUpdateNextPage() {
        setDisableButton(true)
        if (emails.length > 0) {
            for (let i = 0; i < emails.length; i++) {
                if (!emails[i].saved) {
                    return
                }
            }
        } else {
            return
        }

        await setEmailsFormValue(emails, true)

        setDisableButton(false)

    }

    function addUserEmail() {
        const objectEmail: IFormEmail = {
            userEmail: "",
            saved: false
        }

        setEmails((state) => state.concat(objectEmail))
    }

    function removeUserEmail(index: number) {
        setEmails((state) => state.filter((_item, indexEmail: number) => index != indexEmail))
    }

    function resetEmail(index: number) {
        const data = emails
        data[index].saved = false

        setEmails([])
        setEmails(data)
    }

    function saveEmail(index: number, objectData: IFormEmail) {
        let data = emails

        data[index] = objectData
        setEmails([])
        setEmails((state) => state.concat(data))

        setEmailsFormValue(emails, false)
    }

    return (
        <>
            <div>
                <button
                    type="button"
                    className={`mt-4 ml-4 bg-green-600 p-1 px-2 rounded-md hover:bg-green-700 text-white duration-150`}
                    onClick={() => addUserEmail()}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="inline ml-2">Adicionar email</span>
                </button>
            </div>

            <div className="flex flex-col-reverse">
                {emails.length > 0 ? emails.map((item: IFormEmail, index: number) => {
                    return (
                        <CardEmailForm 
                            key={index} 
                            index={index} 
                            item={item} 
                            removeUserEmail={removeUserEmail} 
                            resetEmail={resetEmail}
                            saveEmail={saveEmail}
                        />
                    )
                }) : (
                    <div className="text-center">
                        <h1>Não há emails cadastrados, você precisa cadastrar um email do usuário para finalizar o processo de cadastro.</h1>
                    </div>
                )}
            </div>
            <aside className={`flex justify-between`}>
                <ButtonNextOrBack
                    OnClick={() => updatePage(2)}
                    title="Voltar"
                    type="button"
                    styles={`rounded-br-none rounded-bl-lg`}
                    disabled={disableButton}
                />
                <ButtonNextOrBack
                    OnClick={() => handleUpdateNextPage()}
                    title="Salvar"
                    type="button"
                    styles={`rounded-bl-none rounded-br-lg`}
                    disabled={disableButton}
                />
            </aside>
        </>
    )

}