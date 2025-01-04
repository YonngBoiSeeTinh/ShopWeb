import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import  store  from './Redux/store'; // Import store

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Cấu hình lại số lần thử lại khi xảy ra lỗi
      refetchOnWindowFocus: false, // Để ngăn fetch lại khi focus vào cửa sổ
    },
  },
});

root.render(
  <Provider store={store}> {/* Bọc toàn bộ ứng dụng trong Provider và truyền store */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);

reportWebVitals();
