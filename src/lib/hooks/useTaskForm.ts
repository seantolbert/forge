import type { Task } from "$lib/components/home/types";
import type { TaskPayload } from "$lib/api/tasks";
import { writable, get } from "svelte/store";

export type TaskFormState = {
  title: string;
  description: string;
  frequency: string;
  due: string;
  linkedOrders: string;
  url: string;
  projectId: string;
  notify: boolean;
  createEvent: boolean;
};

export const taskFormDefaults: TaskFormState = {
  title: "",
  description: "",
  frequency: "one-off",
  due: "",
  linkedOrders: "",
  url: "",
  projectId: "",
  notify: false,
  createEvent: false
};

export const createTaskForm = () => {
  const state = writable<TaskFormState>({ ...taskFormDefaults });

  const toLocalDateTimeValue = (iso: string) => {
    const date = new Date(iso);
    const tzAdjusted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return tzAdjusted.toISOString().slice(0, 16);
  };

  const fromTask = (task: Task | null) => {
    if (!task) {
      reset();
      return;
    }
    state.set({
      ...taskFormDefaults,
      title: task.title ?? "",
      description: task.notes ?? "",
      frequency: task.frequency ?? "one-off",
      due: task.dueAt ? toLocalDateTimeValue(task.dueAt) : "",
      linkedOrders: task.linkedOrders ?? "",
      url: task.url ?? "",
      projectId: task.projectId ?? "",
      notify: task.notify ?? false,
      createEvent: task.createEvent ?? false
    });
  };

  const toPayload = (): TaskPayload => {
    const current = get(state);
    return {
      title: current.title.trim(),
      notes: current.description.trim() || null,
      url: current.url.trim() || null,
      frequency: current.frequency,
      due_at: current.due || null,
      notify: current.notify,
      create_event: current.createEvent,
      project_id: current.projectId || null,
      linked_orders: current.linkedOrders.trim() || null
    };
  };

  const reset = () => {
    state.set({ ...taskFormDefaults });
  };

  return {
    state,
    setState(next: Partial<TaskFormState>) {
      state.update((current) => ({ ...current, ...next }));
    },
    reset,
    toPayload,
    fromTask
  };
};

export type TaskForm = ReturnType<typeof createTaskForm>;
