import "./globals.css";
import ReactQueryWrapper from "./ReactQueryWrapper";
import { StateContextProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <StateContextProvider>
          <ReactQueryWrapper>{children}</ReactQueryWrapper>
        </StateContextProvider>
      </body>
    </html>
  );
}
