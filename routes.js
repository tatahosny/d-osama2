const routes = {
    doctor: ["index.html", "tasks.html", "users.html", "performance.html", "settings.html"],
    assistant: ["tasks.html", "users.html"],
    batch_leader: ["tasks.html"],
    section_leader: ["index.html"]
};

function checkAccess() {
    const userRole = localStorage.getItem("userRole");
    
    if (!userRole && window.location.pathname !== "/pages/login.html") {
        window.location.href = "/pages/login.html"; // تحويل المستخدم إلى صفحة تسجيل الدخول
    }
}

checkAccess();