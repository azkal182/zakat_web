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
export { getUserByUsername, getAllUser }
