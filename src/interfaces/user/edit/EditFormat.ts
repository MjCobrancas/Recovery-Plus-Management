interface IAdressesFormat {
    idAddress: number | null
    address: string
    address2: string
    postalCode: string
    country: string
    neighborhood: string
    city: string
    states: string
    status: boolean
}

interface IContactsFormat {
    idContact: number | null
    ddd: number
    phone: string
    status: boolean
    type: string
}

interface IEmailFormat {
    idEmail: number | null
    email: string
    status: boolean
}

export type { IAdressesFormat, IEmailFormat, IContactsFormat }