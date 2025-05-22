import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    // In a real app, this would be hashed
    password: 'password123',
    role: 'USER',
  },
  {
    id: '2',
    name: 'Demo Publisher',
    email: 'publisher@example.com',
    // In a real app, this would be hashed
    password: 'password123',
    role: 'USER',
  },
  {
    id: 'admin-user-123',
    name: 'Admin User',
    email: 'admin@example.com',
    // In a real app, this would be hashed
    password: 'admin123',
    role: 'ADMIN',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // This is just for demo purposes
        // In a real app, you would connect to your database or API
        const user = mockUsers.find(user => user.email === credentials.email);

        if (!user || user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
