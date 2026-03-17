import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className='mx-auto max-w-5xl px-4 py-16'>
      <div className='max-w-3xl space-y-6'>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
          Practical software architecture
        </p>

        <h1 className='text-5xl font-bold tracking-tight text-slate-950'>
          Design Patterns
        </h1>

        <p className='text-xl leading-8 text-slate-700'>
          A practical, categorized reference for learning the software design
          patterns developers actually use in real systems.
        </p>

        <div className='flex gap-3'>
          <Link
            to='/patterns'
            className='rounded-lg bg-slate-900 px-5 py-3 text-white'
          >
            Browse patterns
          </Link>
        </div>
      </div>
    </div>
  );
}
