export function HeaderRegister({ page }: { page: number }) {
    const steps = ["Usuário", "Endereço", "Contato", "Email"]

    return (
        <>
            {steps.map((step, index: number) => {
                return (
                    <article
                        key={index}
                        className={`text-center w-full rounded-md duration-300 font-bold dark:text-[--text-white] p-1 mb-2
                            ${
                            index == page
                                ? "bg-[--light-blue] text-[--text-white]"
                                : "bg-[--bg-button-user] dark:bg-[--bg-button-user-dark]"
                            }
                        `}
                        >
                            <h2>{step}</h2>
                    </article>
                )
            })}
        </>
    )
}