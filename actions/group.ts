import { db } from "@/lib/db"

const getAllGroup = async () => {
    return db.group.findMany()
}

export { getAllGroup }
