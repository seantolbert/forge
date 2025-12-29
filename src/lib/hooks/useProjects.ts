import { projectsStore, loadProjects } from "$lib/stores/projects";

export const useProjects = () => {
  let errorMsg = "";

  const load = async () => {
    const { error } = await loadProjects();
    if (error) {
      errorMsg = "Unable to load projects.";
    } else {
      errorMsg = "";
    }
  };

  return {
    projectsStore,
    load,
    get error() {
      return errorMsg;
    }
  };
};
