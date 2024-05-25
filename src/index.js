import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

window.addEventListener('load', function () {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  } else {
    root.render(
      <BrowserRouter>
        <main
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p className='text'>Use must to use only phone</p>
        </main>
      </BrowserRouter>,
    );
  }
});
