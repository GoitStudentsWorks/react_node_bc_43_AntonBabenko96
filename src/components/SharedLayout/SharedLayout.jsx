import { Route, Routes } from 'react-router';
import Header from 'components/Header/Header';
import NoticesSearch from 'components/NoticesSearch/NoticesSearch';
import UserPage from 'pages/UserPage/UserPage';
import HomePage from 'pages/HomePage/HomePage';


export default function SharedLayout() {
  return (
    <>
      <Header />
      <NoticesSearch/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
}