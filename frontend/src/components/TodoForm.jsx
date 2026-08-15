import { useState } from "react";

function TodoForm({ onTaskCreated }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");

    async function handleSubmit(event) {

        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        const newTask = {
            title: title.trim(),
            description: description.trim(),
            completed: false,
            priority,
            dueDate: dueDate || null,
        };

        await onTaskCreated(newTask);

        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
        setDueDate("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >

            <h2 className="mb-4 text-lg font-semibold">
                Add a task
            </h2>

            <div className="space-y-4">

                <input
                    type="text"
                    placeholder="What do you need to do?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <div className="grid gap-4 sm:grid-cols-2">

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-3"
                    >
                        <option value="LOW">Low priority</option>
                        <option value="MEDIUM">Medium priority</option>
                        <option value="HIGH">High priority</option>
                    </select>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-3"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white hover:bg-gray-800"
                >
                    Add Task
                </button>

            </div>

        </form>
    );
}

export default TodoForm;