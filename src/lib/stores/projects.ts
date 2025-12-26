import { writable } from "svelte/store";
import type { Project } from "$lib/components/home/types";
import { supabase } from "$lib/supabaseClient";

export const projectsStore = writable<Project[]>([]);

export const loadProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load projects", error);
    return { error };
  }
  projectsStore.set(data);
  return { data };
};

export const createProject = async (name: string, summary?: string, dueAt?: string) => {
  if (!name.trim()) return { error: new Error("Name required") };
  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: name.trim(),
      summary: summary?.trim() || null,
      due_at: dueAt || null,
      status: "active"
    })
    .select()
    .single();
  if (error) {
    console.error("Failed to create project", error);
    return { error };
  }
  projectsStore.update((list) => [data, ...list]);
  return { data };
};
