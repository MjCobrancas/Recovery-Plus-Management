import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { CardContactForm } from "./CardContactForm";
import { IFormContacts, IFormContactsProps } from "@/interfaces/user/register/FormContacts";
import { ButtonNextOrBack } from "@/components/ButtonNextOrBack";

export function FormContacts({ updatePage, setContactsFormValue, contactsForm }: IFormContactsProps) {
    const [contacts, setContacts] = useState<IFormContacts[]>(contactsForm.length > 0 ? contactsForm : [])

    function handleUpdateNextPage() {
        if (contacts.length > 0) {
            for (let i = 0; i < contacts.length; i++) {
                if (!contacts[i].saved) {
                    return
                }
            }
        }

        updatePage(3)
        setContactsFormValue(contacts)
    }

    function addContact() {
        const objectContact = {
            ddd: "",
            phone: "",
            type: "",
            saved: false
        }

        setContacts((state) => state.concat(objectContact))
    }

    function removeContact(index: number) {
        setContacts((state) => state.filter((_item, indexContact: number) => index != indexContact))
    }

    function resetContact(index: number) {
        const data = contacts
        data[index].saved = false

        setContacts([])
        setContacts(data)
    }

    function saveContact(index: number, objectData: IFormContacts) {
        let data = contacts

        data[index] = objectData
        setContacts([])
        setContacts((state) => state.concat(data))
    }
    
    return (
        <>
            <div>
                <button
                    type="button"
                    className={`mt-4 ml-4 bg-green-600 p-1 px-2 rounded-md hover:bg-green-700 text-white duration-150`}
                    onClick={() => addContact()}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="inline ml-2">Adicionar contato</span>
                </button>
            </div>
            <div className="flex flex-col-reverse">
                {contacts.length > 0 ? contacts.map((item, index) => {
                    return (
                        <CardContactForm 
                            key={index} 
                            item={item} 
                            index={index} 
                            removeContact={removeContact} 
                            resetContact={resetContact}
                            saveContact={saveContact}
                        />
                    )
                }) : (
                    <div className={`text-center`}>
                        <h1>Não há contatos ainda, você precisa cadastrar um contato do usuário para avançar de etapa</h1>
                    </div>
                )}
            </div>
            <aside className={`flex justify-between`}>
                <ButtonNextOrBack
                    OnClick={() => updatePage(1)}
                    title="Voltar"
                    styles={`rounded-br-none rounded-bl-lg`}
                />
                <ButtonNextOrBack
                    OnClick={() => handleUpdateNextPage()}
                    title="Avançar"
                    styles={`rounded-bl-none rounded-br-lg`}
                />
            </aside>
        </>
    )

}