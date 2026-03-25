import { Link, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/routing/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { PatternsPage } from "./pages/PatternsPage";
import { PatternDetailPage } from "./pages/PatternDetailPage";

function App() {
  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      <ScrollToTop />
      <header className='border-b border-slate-200 bg-white'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4'>
          <Link to='/' className='text-lg font-bold'>
            Pattern Atlas
          </Link>

          <nav className='flex gap-6 text-sm font-medium text-slate-700'>
            <Link to='/'>Home</Link>
            <Link to='/patterns'>Patterns</Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/patterns' element={<PatternsPage />} />
          <Route path='/patterns/:slug' element={<PatternDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
