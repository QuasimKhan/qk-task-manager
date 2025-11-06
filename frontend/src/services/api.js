export const getTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
    });
    return res.json();
};
