import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      authorize: async (credentials) => {
        const user = {
          id: 'id12345',
          name: 'Alpha DIOP',
          email: 'admin@dashcn.com',
          password:
            '$2a$12$a7EP3ju4PxeYuPZL5aZoNOQEWBlnvOpEsyYBCLjIxqEcKXzksuYNC', // "password123" hashé
        };
        if (!credentials.email || !credentials?.password) {
          throw new Error('Veuillez entrer un email et un mot de passe');
        }
        if (credentials.email !== user.email) {
          throw new Error('Utilisateur non trouvé');
        }
        const passwordMatch = bcrypt.compareSync(
          String(credentials.password),
          user.password,
        );
        if (!passwordMatch) {
          throw new Error('Mot de passe incorrect');
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
});
