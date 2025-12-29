import { supabase } from "$lib/supabaseClient";
import type { Task } from "$lib/components/home/types";

export type TaskPayload = {
  title: string;
  notes?: string | null;
  url?: string | null;
  frequency?: string;
  due_at?: string | null;
  notify?: boolean;
  create_event?: boolean;
  project_id?: string | null;
  linked_orders?: string | null;
  status?: Task["status"];
};

export const createTask = async (payload: TaskPayload) => {
  return supabase
    .from("tasks")
    .insert({ status: payload.status ?? "todo", ...payload })
    .select()
    .single();
};

export const updateTask = async (id: string, payload: TaskPayload) => {
  return supabase
    .from("tasks")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
};
