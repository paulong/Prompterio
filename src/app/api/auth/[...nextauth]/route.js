import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const authOptions = {
  // 1. ADAPTER: Conecta NextAuth con MongoDB para persistir usuarios
  adapter: MongoDBAdapter(clientPromise),

  // 2. PROVIDERS: Configuración de Google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, // 👈 AÑADE ESTA LÍNEA
    }),
  ],

  // 3. SESSION: Usamos JWT para manejar el estado del usuario eficientemente
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Se ejecuta al crear el token (al iniciar sesión)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // Se ejecuta cada vez que el cliente pide la sesión (useSession)
    async session({ session, token }) {
      try {
        await dbConnect();

        // Buscamos al usuario por ID para obtener el estado Pro real
        const dbUser = await User.findById(token.id).select("isPro email name");

        if (dbUser) {
          session.user.id = dbUser._id;
          session.user.isPro = dbUser.isPro || false; // Inyectamos el flag
        } else {
          session.user.isPro = false;
        }
      } catch (error) {
        console.error("Error en session callback:", error);
        session.user.isPro = false;
      }
      return session;
    },

    // NUEVO CALLBACK DE REDIRECT: Controla a dónde va el usuario tras el login
    async redirect({ url, baseUrl }) {
      // Después de loguearse, siempre lo mandamos a verificar su estado
      // Esto evita que entren al app sin haber pagado
      return `${baseUrl}/verify-status`;
    },
  },

  // Páginas personalizadas
  pages: {
    signIn: "/auth",
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };