export async function getUsersPagination(backend_domain: string, skip: number, take: number, accessToken: string, inactive: string) {
    return await fetch(`${backend_domain}/get-users-pagination?&skip=${skip}&take=${take}&inactive=${inactive}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
        }
    })
        .then(async (value) => {
            const data = await value.json()

            return { users: data, skip, take, count: 0 }
        })
        .catch((error) => {
            return {
                users: {
                    data: [],
                    count: 0
                },
                skip: 0,
                take: 0,
                count: 0,
            }
        })
}