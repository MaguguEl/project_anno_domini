import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import TimelinePage from './pages/events/TimelinePage';
import FiguresPage from './pages/figures/FiguresPage';
import DocumentsPage from './pages/documents/DocumentsPage';
import ErasPage from './pages/eras/ErasPage';
import EraDetailPage from './pages/eras/EraDetailPage';
import EventDetailPage from './pages/events/EventDetailPage';
import FigureDetailPage from './pages/figures/FigureDetailPage';
import DocumentDetailPage from './pages/documents/DocumentDetailPage';
import QuotesPage from './pages/quotes/QuotesPage';
import QuoteDetailPage from './pages/quotes/QuoteDetailPage';
import SourcesPage from './pages/sources/SourcesPage';
import SourceCategoryPage from './pages/sources/SourceCategoryPage';
import SourceDetailPage from './pages/sources/SourceDetailPage';
import ExternalLinksPage from './pages/sources/ExternalLinksPage';
import BookmarksPage from './pages/sources/BookmarksPage';
import AboutPage from './pages/misc/AboutPage';
import PrivacyPage from './pages/misc/PrivacyPage';
import TermsPage from './pages/misc/TermsPage';
import NotFoundPage from './pages/misc/NotFoundPage';

function App() {
  return (
    <DataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/figures" element={<FiguresPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/eras" element={<ErasPage />} />
            <Route path="/eras/:id" element={<EraDetailPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/figures/:id" element={<FigureDetailPage />} />
            <Route path="/documents/:id" element={<DocumentDetailPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/quotes/:id" element={<QuoteDetailPage />} />
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/sources/:category" element={<SourceCategoryPage />} />
            <Route path="/sources/view/:id" element={<SourceDetailPage />} />
            <Route path="/sources/topic/:topic" element={<SourceCategoryPage />} />
            <Route path="/sources/external" element={<ExternalLinksPage />} />
            <Route path="/sources/bookmarks" element={<BookmarksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;