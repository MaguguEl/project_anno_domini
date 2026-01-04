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
import SourcePage from './pages/documents/SourcePage';
import SourceDetailPage from './pages/documents/SourceDetailPage';
import BookmarksPage from './pages/sources/BookmarksPage';
import AboutPage from './pages/misc/AboutPage';
import PrivacyPage from './pages/misc/PrivacyPage';
import TermsPage from './pages/misc/TermsPage';
import NotFoundPage from './pages/misc/NotFoundPage';
import HistoryFeedPage from './pages/misc/HistoryFeedPage';

function App() {
  return (
    <DataProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<HistoryFeedPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/figures" element={<FiguresPage />} />
            
            {/* Documents & Sources Page */}
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/sources" element={<DocumentsPage />} />
            
            {/* Eras */}
            <Route path="/eras" element={<ErasPage />} />
            <Route path="/eras/:id" element={<EraDetailPage />} />
            
            {/* Detail Pages */}
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/figures/:id" element={<FigureDetailPage />} />
            <Route path="/documents/:id" element={<DocumentDetailPage />} />
            
            {/* Quotes */}
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/quotes/:id" element={<QuoteDetailPage />} />
            
            {/* Source Categories and Details */}
            <Route path="/sources/:category" element={<SourcePage />} />
            <Route path="/sources/view/:id" element={<SourceDetailPage />} />
            <Route path="/sources/topic/:topic" element={<SourcePage />} />
            
            {/* Source Features - these still route to DocumentsPage but with sources tab active */}
            <Route path="/sources/bookmarks" element={<BookmarksPage />} />
            <Route path="/sources/search" element={<DocumentsPage />} />
            <Route path="/sources/recent" element={<DocumentsPage />} />
            <Route path="/sources/topics" element={<DocumentsPage />} />
            
            {/* Misc Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;