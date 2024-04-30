import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
    const admniPass = await hash('admin', 10)
    const userPass = await hash('user', 10)
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            name: 'admin',
            username: 'admin',
            role: 'ADMIN',
            password: admniPass
        },
    })

    const user = await prisma.user.upsert({
        where: { username: 'user' },
        update: {},
        create: {
            name: 'user',
            username: 'user',
            role: 'USER',
            password: userPass
        },
    })

    console.log({ admin, user })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
