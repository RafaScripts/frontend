//@ts-nocheck
import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import Backend from '@/app/api/controllers';


const nextAuthOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'}
      },

        async authorize(credentials: any, req: any) {
            const response:any = await Backend.signin(credentials.email, credentials.password);

            if(response.success){
                const { user, token } = response.data;
                const data:any =  { name: user.name, email: user.email, picture: null, sub: user.id, user, token };

                return data;
            }else{
                return null;
            }
        }
    })
  ],
  pages: {
    signIn: '/signin'
  },
  secret: 'secret',
  callbacks: {
    async jwt({ token, user }: any) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }: any){
      session = token.user as any
      return session
    }
  }
}

const handler = NextAuth(nextAuthOptions);

export {handler as GET, handler as POST, nextAuthOptions};
