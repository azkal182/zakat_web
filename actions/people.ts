"use server"

import { db } from "@/lib/db"

const getAllPeople = async () => {
    return db.people.findMany()
}

export { getAllPeople }
