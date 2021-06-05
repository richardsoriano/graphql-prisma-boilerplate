import bcrypt from 'bcryptjs'
import prisma from '../../src/prisma'
import jwt from 'jsonwebtoken'


const userOne = {
    input: {
        name: 'BenJen',
        email: 'benjen@abc.com',
        password: bcrypt.hashSync('dragon123')
    },
    user: undefined,
    jwt: undefined
}
const userTwo = {
    input: {
        name: 'Samwell',
        email: 'sam@abc.com',
        password: bcrypt.hashSync('dragon123')
    },
    user: undefined,
    jwt: undefined
}

const seedDatabase = async ()=>{
    await prisma.mutation.deleteManyUsers()

    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.PRISMA_AUTH_SECRET)  
    
    // Create user two
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    }) 
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.PRISMA_AUTH_SECRET)  
   
}
export { seedDatabase as default, userOne,  userTwo }