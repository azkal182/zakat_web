"use server"
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import * as z from "zod";

type FormType = z.infer<typeof RegisterSchema>

const registerUser = async (values: FormType) => {
    const validateFields = RegisterSchema.safeParse(values)

    if (!validateFields.success) return { error: "Invalid fields" }

    const { name, username, role, password } = validateFields.data

    const passwordHash = await hash(password, 10)
    try {
        await db.user.create({
            data: {
                name,
                username,
                role,
                password: passwordHash
            }
        })
        revalidatePath('/users')
        return { success: "Register successfully!" }
    } catch (error) {
        return { error: "Something went wrong!" }
    }


}

const deleteUser = async (id: string) => {
    try {
        await db.user.delete({
            where: {
                id
            }
        })

        revalidatePath('/users')

        return { success: "User deleted!" }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return { error: `User with ID ${id} not found.` }
            } else {
                return { error: `Prisma error: ${error.message}` }
            }
        } else {
            // console.error('Unknown error:', error);
            throw error
        }
        // return { error: "Something went wrong!" }
    }
}

// default password zakat2024
const resetUserPassword = async (id: string) => {
    const defaultPassword = await hash('zakat2024', 10)
    try {
        const user = await db.user.update({
            where: {
                id
            },
            data: {
                password: defaultPassword
            }
        })
        console.log(user);

        return { success: "Password " }
    } catch (error) {
        return { error: "Something went wrong! " }
    }
}

export { registerUser, deleteUser, resetUserPassword }
