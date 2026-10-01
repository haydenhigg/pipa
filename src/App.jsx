import { Title } from '@solidjs/meta';
import { Loading } from 'solid-js';
import { Router } from './router';
import Header from './components/Header';
import './App.css';

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Title>Solid App</Title>
          <Header />
          <Loading fallback={<main class="px-4 py-12 text-zinc-300">Loading…</main>}>
            {props.children}
          </Loading>
        </>
      )}
    </Router>
  );
}
