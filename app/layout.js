import '@styles/globals.css';

import Provider from '@components/Provider';
import Nav from '@components/Nav';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI prompts'
}

const Rootlayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            {/* Reusing all over the page in app */}
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default Rootlayout
