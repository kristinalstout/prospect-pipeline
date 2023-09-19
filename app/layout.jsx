import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Prospect Pipeline",
  description: "Cultivate relationships",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <link rel="icon" type="image/png" sizes="40x40" href="/images/newlogo.png"></link>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;