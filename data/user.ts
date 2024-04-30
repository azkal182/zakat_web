import { db } from "@/lib/db"

const getAllUser = async () => {
    return db.user.findMany()
}


const getUserByUsername = async (username: string) => {
    return db.user.findUnique({
        where: {
            username
        }
    })
}

const getUserById = async (id: string) => {
    return db.user.findUnique({
        where: {
            id
        }
    })
}
export { getUserByUsername, getAllUser, getUserById }
