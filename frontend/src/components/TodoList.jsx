import TodoItem from "./TodoItem";

function TodoList({ tasks, onToggle, onDelete }) {

    if (tasks.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
                <p className="text-gray-500">
                    No tasks yet. Add your first task!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TodoItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TodoList;