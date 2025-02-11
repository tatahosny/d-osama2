const API_URL = "https://example.com/api"; // استبدل بعنوان الباك إند الفعلي

async function fetchData(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return response.json();
}

async function addUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
}

// مثال لجلب قائمة المهام
async function loadTasks() {
    const tasks = await fetchData("tasks");
    document.getElementById("tasksList").innerHTML = tasks.map(task => `<li>${task.name}</li>`).join("");
}
