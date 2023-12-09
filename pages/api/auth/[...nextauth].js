import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '@/lib/mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'user' },
        password: { label: 'Password', type: 'password', placeholder:'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = {id: 20, username: 'admin', password: 'admin' };

        if (user) {
          // Any object returned will be saved in the `user` property of the JWT
          return user;
        } else {
          // If you return null, an error will be displayed advising the user to check their details.
          return Promise.reject(new Error('Invalid credentials'));

          // You can also Reject this callback with an Error; the user will be sent to the error page with the error message as a query parameter
          // return Promise.reject(new Error('Invalid credentials'));
        }
      },
    }),
  ],
 
  adapter: MongoDBAdapter(clientPromise),
});
