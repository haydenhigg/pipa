

// A layout route: pairing projects.tsx with the projects/ directory nests every
// page inside it under this component.
export default function ProjectsLayout(props) {
  return (
    <main class="px-4 py-12">
      <h1 class="my-4 text-4xl font-bold text-zinc-100">Projects</h1>
      {props.children}
    </main>
  );
}
