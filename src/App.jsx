import { Router } from './router'
import { Title } from '@solidjs/meta'
import Header from './components/Header'
import { Loading } from 'solid-js'

import './App.css'

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Title>Solid App</Title>
          <Header />
          <Loading fallback={<main class="px-32 py-16 text-zinc-300">Loading…</main>}>
            {props.children}
          </Loading>
        </>
      )}
    </Router>
  )
}
