import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../services/api";

function Home() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {

        try {

            const data = await getTasks();

            setTasks(data);

        } catch (error) {

            console.error("Failed to load tasks:", error);

        } finally {

            setLoading(false);

        }
    }

    async function handleTaskCreated(task) {

        try {

            const createdTask = await createTask(task);

            setTasks((currentTasks) => [
                ...currentTasks,
                createdTask,
            ]);

        } catch (error) {

            console.error("Failed to create task:", error);

        }
    }

    async function handleToggle(task) {

        try {

            const updatedTask = {
                ...task,
                completed: !task.completed,
            };

            const savedTask = await updateTask(
                task.id,
                updatedTask
            );

            setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask.id === savedTask.id
                        ? savedTask
                        : currentTask
                )
            );

        } catch (error) {

            console.error("Failed to update task:", error);

        }
    }

    async function handleDelete(id) {

        try {

            await deleteTask(id);

            setTasks((currentTasks) =>
                currentTasks.filter(
                    (task) => task.id !== id
                )
            );

        } catch (error) {

            console.error("Failed to delete task:", error);

        }
    }

    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

    const remainingCount =
        tasks.length - completedCount;

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="mx-auto max-w-6xl px-6 py-10">

                <div className="mb-8">

                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        My Tasks
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Stay organized and get things done.
                    </p>

                </div>

                <div className="mb-8 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm text-gray-500">
                            Total
                        </p>

                        <p className="mt-1 text-3xl font-bold">
                            {tasks.length}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm text-gray-500">
                            Remaining
                        </p>

                        <p className="mt-1 text-3xl font-bold">
                            {remainingCount}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm text-gray-500">
                            Completed
                        </p>

                        <p className="mt-1 text-3xl font-bold">
                            {completedCount}
                        </p>
                    </div>

                </div>

                <div className="grid gap-8 lg:grid-cols-[350px_1fr]">

                    <TodoForm
                        onTaskCreated={handleTaskCreated}
                    />

                    <section>

                        {loading ? (
                            <div className="rounded-xl bg-white p-10 text-center">
                                Loading tasks...
                            </div>
                        ) : (
                            <TodoList
                                tasks={tasks}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                            />
                        )}

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Home;