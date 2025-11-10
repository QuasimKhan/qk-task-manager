export const getTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
    });
    return res.json();
};

export const createTask = async (data) => {
    const res = await fetch("http://localhost:5000/api/tasks/create-task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const login = async (data) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    return res.json();
};
