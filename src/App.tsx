import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import FiguresPage from './pages/FiguresPage';
import DocumentsPage from './pages/DocumentsPage';
import ErasPage from './pages/ErasPage';
import EraDetailPage from './pages/EraDetailPage';
import EventDetailPage from './pages/EventDetailPage';
import FigureDetailPage from './pages/FigureDetailPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import QuotesPage from './pages/QuotesPage';
import QuoteDetailPage from './pages/QuoteDetailPage';
import SourcesPage from './pages/SourcesPage';
import SourceCategoryPage from './pages/sources/SourceCategoryPage';
import SourceDetailPage from './pages/sources/SourceDetailPage';
import ExternalLinksPage from './pages/sources/ExternalLinksPage';
import BookmarksPage from './pages/sources/BookmarksPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

function App() {
  return (
    <ThemeProvider>
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
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;