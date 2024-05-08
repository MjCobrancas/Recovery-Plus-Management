import { IFormAdresses, IFormAdressesProps } from "@/interfaces/user/register/FormAdresses";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { CardForm } from "./CardForm";
import { ButtonNextOrBack } from "@/components/ButtonNextOrBack";

export function FormAdresses({ updatePage, setAdressesFormValue, adressesForm }: IFormAdressesProps) {
    const [adresses, setAdresses] = useState<IFormAdresses[]>(adressesForm.length > 0 ? adressesForm : [])

    function handleUpdateNextPage() {
        if ( adresses.length > 0 ) {
            for (let i = 0; i < adresses.length; i++) {
                if (!adresses[i].saved) {
                    return
                }
            }
        } else {
            return
        }

        setAdressesFormValue(adresses)

        updatePage(2)
    }

    function addAddress() {
        const data: IFormAdresses[] = []

        data.push({
            id: Math.random(),
            address: "",
            address2: "",
            city: "",
            country: "",
            neighborhood: "",
            postalCode: "",
            states: "",
            saved: false
        })

        setAdresses((state) => state.concat(data))
    }

    function resetSaveAddress(index: number) {
        let data = adresses
        data[index].saved = false
        setAdresses([])
        setAdresses((state) => state.concat(data))
    }

    function saveAddress(index: number, objectData: IFormAdresses) {
        let data = adresses

        data[index] = objectData
        setAdresses([])
        setAdresses((state) => state.concat(data))
    }

    function removeAddress(index: number) {
        setAdresses((state) => state.filter((_item, indexArray: number) => indexArray != index))
    }

    return (
        <>
            <div>
                <button
                    type="button"
                    className={`mt-4 ml-4 bg-green-600 p-1 px-2 rounded-md hover:bg-green-700 text-white duration-150`}
                    onClick={() => addAddress()}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="inline ml-2">Adicionar endereço</span>
                </button>
            </div>
            <div className={`flex flex-col-reverse`}>
                {adresses.length > 0 ? adresses.map((item: IFormAdresses, index: number) => {
                    return (
                        <>
                            <CardForm 
                                key={index} 
                                item={item} 
                                removeAddress={removeAddress} 
                                saveAddress={saveAddress} 
                                resetSaveAddress={resetSaveAddress}
                                index={index} 
                            />
                        </>
                    )
                }) : (
                    <div className="text-center">
                        <h1>Não há endereços ainda, é necessário preencher o endereço do usuário para ir para a próxima etapa.</h1>
                    </div>
                )}
            </div>
            <aside className={`flex justify-between`}>
                <ButtonNextOrBack
                    OnClick={() => updatePage(0)}
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