import { MouseEventHandler } from "react"

interface ICheckBoxButtonProps {
    isActive: boolean
    OnClick: MouseEventHandler<HTMLButtonElement>
}

export type { ICheckBoxButtonProps }
