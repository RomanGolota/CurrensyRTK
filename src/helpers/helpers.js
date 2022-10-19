export const getUserName = (email) => {
    const findedIndex = email.split('').indexOf('@')
    const userName = email.slice(0, findedIndex)
    return userName
}

