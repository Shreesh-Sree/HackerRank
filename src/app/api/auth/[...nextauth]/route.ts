import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const { handlers } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" && 
          credentials?.password === "sjgi_hrcc_2026"
        ) {
          return { id: "1", name: "Admin", email: "admin@sjgi.edu" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "glitch-surreal-void-token-2026",
});

export const { GET, POST } = handlers;
