import { Suspense } from "react";
import ProjectsIndex from "./ProjectsIndex";

export default function ProjectsPage() {
  return (
    <Suspense>
      <ProjectsIndex />
    </Suspense>
  );
}
