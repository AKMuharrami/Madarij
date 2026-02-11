import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider, useData } from './contexts/DataContext';
import { UserRole } from './types';

// Layouts
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

// Pages
import Intro from './pages/Intro';
import Playlists from './pages/Playlists';
import PlaylistDetail from './pages/PlaylistDetail';
import VideoPlayerPage from './pages/VideoPlayerPage';
import Forum from './pages/Forum';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Account from './pages/Account';
import Dashboard from './pages/admin/Dashboard';

// Updated children type to React.ReactNode to accept children arrays (e.g. from formatting whitespace)
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useData();
    if (currentUser?.role !== UserRole.ADMIN) {
        return <Navigate to="/account" replace />;
    }
    return <>{children}</>;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Intro Screen */}
            <Route path="/" element={<Intro />} />

            {/* Student Platform */}
            <Route element={<Layout />}>
                <Route path="playlists" element={<Playlists />} />
                <Route path="playlists/:id" element={<PlaylistDetail />} />
                <Route path="player/:playlistId/:videoId" element={<VideoPlayerPage />} />
                <Route path="forum" element={<Forum />} />
                <Route path="books" element={<Books />} />
                <Route path="books/:id" element={<BookDetail />} />
                <Route path="account" element={<Account />} />
            </Route>

            {/* Admin Platform */}
            <Route path="admin" element={
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            }>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<div className="text-center p-10 text-gray-500">صفحة إدارة المستخدمين (قيد التطوير)</div>} />
                <Route path="content" element={<div className="text-center p-10 text-gray-500">صفحة إدارة المحتوى (قيد التطوير)</div>} />
            </Route>
        </Routes>
    );
}

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </DataProvider>
  );
};

export default App;