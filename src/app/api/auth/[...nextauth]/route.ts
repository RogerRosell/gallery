import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from 'dotenv';

dotenv.config();
// import Github from "next-auth/providers/github";
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "pony",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        const user = (credentials?.username === username && credentials?.password === password) 
        ?
        { id: "1", name: "AuthOk!" }
        : 
        null
  
        if (user) {
          return user
        } else {
          return null
          }
      }
    })
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };