//@ts-nocheck
import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import Backend from '@/app/api/controllers';
import ApiCalls from '@/app/api/api_instance';


const nextAuthOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'}
      },

        async authorize(credentials: any, req: any) {
            const response:any = await ApiCalls.signIn(credentials.email, credentials.password);

            if(response.success){
                const { user, session } = response.data;
                const data:any =  { name: 'admin', email: user.email, picture: null, sub: user.id, user, token: session.access_token };

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
