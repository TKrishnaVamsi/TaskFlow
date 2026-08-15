function TodoItem({ task, onToggle, onDelete }) {

    return (
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task)}
                className="h-5 w-5 cursor-pointer"
            />

            <div className="min-w-0 flex-1">

                <h3
                    className={`font-medium ${
                        task.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                    }`}
                >
                    {task.title}
                </h3>

                {task.description && (
                    <p className="mt-1 text-sm text-gray-500">
                        {task.description}
                    </p>
                )}

                <div className="mt-2 flex gap-3 text-xs">

                    <span
                        className={`rounded-full px-2 py-1 ${
                            task.priority === "HIGH"
                                ? "bg-red-100 text-red-700"
                                : task.priority === "MEDIUM"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
                        {task.priority}
                    </span>

                    {task.dueDate && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">
                            Due: {task.dueDate}
                        </span>
                    )}

                </div>

            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
            >
                Delete
            </button>

        </div>
    );
}

export default TodoItem;