import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@sdu.edu.az" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Validate against Environment Variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          // Any object returned will be saved in `user` property of the JWT
          return { id: "1", name: "Admin", email: adminEmail };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    // You can later add a custom login page like '/admin/login' here
    // signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
