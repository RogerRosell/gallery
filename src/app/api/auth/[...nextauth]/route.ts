import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

// import Github from "next-auth/providers/github";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = (credentials?.username === "pony" && credentials?.password === "pony") 
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

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };