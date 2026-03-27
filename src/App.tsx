import { Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/routing/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { PatternsPage } from "./pages/PatternsPage";
import { PatternDetailPage } from "./pages/PatternDetailPage";
import { LearningPathPage } from "./pages/LearningPathPage";
import { ComparePage } from "./pages/ComparePage";
import { QuizPage } from "./pages/QuizPage";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";

function App() {
  return (
    <div className='min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]'>
      <ScrollToTop />
      <SiteHeader />

      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/patterns' element={<PatternsPage />} />
          <Route path='/patterns/:slug' element={<PatternDetailPage />} />
          <Route
            path='/compare/:leftSlug/:rightSlug'
            element={<ComparePage />}
          />
          <Route path='/learning-path' element={<LearningPathPage />} />
          <Route path='/quiz' element={<QuizPage />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
