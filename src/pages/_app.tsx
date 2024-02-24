import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Poppins, Montserrat } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { SparksBG } from "@/components/SparkBg";
import { NavbarDemo } from "@/components/Nav";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "800"],
  variable: "--font-poppins",
});
const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-montserrat",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className={`${poppinsFont.variable} ${montserratFont.variable} `}>
      <SessionProvider session={session}>
        {/* Spark BackGround */}
        <SparksBG />
        <div className="bg relative z-10">
          <NavbarDemo />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
