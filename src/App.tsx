import { Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/routing/ScrollToTop";
import { Layout } from "./layout/Layout";
import { HomePage } from "./pages/HomePage";
import { PatternsPage } from "./pages/PatternsPage";
import { PatternDetailPage } from "./pages/PatternDetailPage";
import { LearningPathPage } from "./pages/LearningPathPage";
import { ComparePage } from "./pages/ComparePage";
import { QuizPage } from "./pages/QuizPage";

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/patterns' element={<PatternsPage />} />
        <Route path='/patterns/:slug' element={<PatternDetailPage />} />
        <Route path='/compare/:leftSlug/:rightSlug' element={<ComparePage />} />
        <Route path='/learning-path' element={<LearningPathPage />} />
        <Route path='/quiz' element={<QuizPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
