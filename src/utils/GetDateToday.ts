function getDateToday() {

    const dateToday = new Date()
    const year = dateToday.getFullYear()
    const month = (dateToday.getMonth() + 1).toString().padStart(2, '0')
    const day = dateToday.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
}

export { getDateToday }
