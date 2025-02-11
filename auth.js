const roles = {
    doctor: ["add_users", "assign_tasks", "view_reports"],
    assistant: ["add_section_leaders", "assign_tasks"],
    batch_leader: ["assign_tasks"],
    section_leader: ["view_tasks"]
};

function getUserRole() {
    return localStorage.getItem("userRole") || "section_leader";
}

function hasPermission(permission) {
    return roles[getUserRole()]?.includes(permission);
}

function checkAccess() {
    const userRole = getUserRole();
    const currentPage = window.location.pathname.split("/").pop();

    if (!routes[userRole].includes(currentPage)) {
        alert("🚫 ليس لديك صلاحية لهذه الصفحة!");
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", checkAccess);
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            // إرسال البيانات إلى API للمصادقة
            const response = await fetch("https://example.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userRole", data.role);
                localStorage.setItem("username", username);
                window.location.href = "../index.html"; // التوجيه إلى لوحة التحكم
            } else {
                throw new Error(data.message || "بيانات غير صحيحة!");
            }
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
});
