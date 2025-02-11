document.addEventListener("DOMContentLoaded", () => {
    /** 🌓 الوضع الليلي **/
    const darkModeToggle = document.getElementById("toggleDarkMode");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        });

        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
    }

    /** 📊 تحميل إحصائيات الصفحة **/
    async function loadDashboardStats() {
        try {
            const response = await fetch("https://example.com/api/stats");
            if (!response.ok) throw new Error("❌ فشل تحميل البيانات");

            const data = await response.json();
            document.getElementById("taskCount").textContent = data.tasks;
            document.getElementById("userCount").textContent = data.users;
            document.getElementById("topUser").textContent = data.topUser;
        } catch (error) {
            console.error("⚠️ خطأ في تحميل الإحصائيات:", error);
        }
    }
    loadDashboardStats();

    /** ✅ إدارة النوافذ المنبثقة **/
    function setupModal(modalId, openBtnId, closeBtnClass) {
        const modal = document.getElementById(modalId);
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = modal.querySelector(closeBtnClass);

        if (!modal || !openBtn || !closeBtn) return;

        openBtn.addEventListener("click", () => modal.style.display = "flex");
        closeBtn.addEventListener("click", () => modal.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modal) modal.style.display = "none";
        });
    }
    
    setupModal("taskModal", "openTaskModal", ".close");
    setupModal("userModal", "openUserModal", ".close");

    /** ✅ إدارة المهام **/
    const tasksContainer = document.getElementById("tasks-container");
    const userTasksContainer = document.getElementById("userTasksContainer");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function displayTasks() {
        tasksContainer.innerHTML = tasks.length === 0 
            ? `<p>🚀 لا توجد مهام حاليًا، أضف واحدة جديدة!</p>`
            : tasks.map(task => `
                <div class="task-card" id="task-${task.id}">
                    <h4>${task.name}</h4>
                    <p>${task.description}</p>
                    <button class="get-task-btn" onclick="claimTask(${task.id})">📌 الحصول على المهمة</button>
                    <button class="delete-task-btn" onclick="deleteTask(${task.id})">🗑 حذف</button>
                </div>
            `).join("");

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask() {
        const taskName = document.getElementById("taskName").value.trim();
        const taskDescription = document.getElementById("taskDescription").value.trim();

        if (!taskName || !taskDescription) {
            alert("⚠️ يرجى ملء جميع الحقول!");
            return;
        }

        const newTask = { id: Date.now(), name: taskName, description: taskDescription };
        tasks.push(newTask);
        displayTasks();
        document.getElementById("taskModal").style.display = "none";
        document.getElementById("taskName").value = "";
        document.getElementById("taskDescription").value = "";
    }

    function claimTask(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;

        const claimedTask = tasks.splice(taskIndex, 1)[0];
        const userTaskCard = document.createElement("div");
        userTaskCard.classList.add("user-task-card");
        userTaskCard.innerHTML = `<h4>${claimedTask.name}</h4><p>${claimedTask.description}</p>`;
        userTasksContainer.appendChild(userTaskCard);

        displayTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        displayTasks();
    }

    document.getElementById("addTaskBtn").addEventListener("click", addTask);
    displayTasks();

    /** ✅ إدارة المستخدمين **/
    const usersContainer = document.getElementById("users-container");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    function displayUsers() {
        usersContainer.innerHTML = users.length === 0 
            ? `<p>🔹 لا يوجد مستخدمون حتى الآن.</p>`
            : users.map(user => `
                <div class="user-card">
                    <h4>${user.name} (${user.role})</h4>
                    <p>${user.email}</p>
                    <button class="delete-user-btn" onclick="deleteUser('${user.email}')">🗑 حذف</button>
                </div>
            `).join("");

        localStorage.setItem("users", JSON.stringify(users));
    }

    function addUser() {
        const userName = document.getElementById("userName").value.trim();
        const userEmail = document.getElementById("userEmail").value.trim();
        const userId = document.getElementById("userId").value.trim();
        const userPassword = document.getElementById("userPassword").value.trim();
        const userRole = document.getElementById("userRole").value;

        if (!userName || !userEmail || !userId || !userPassword) {
            alert("⚠️ يرجى ملء جميع الحقول!");
            return;
        }

        users.push({ name: userName, email: userEmail, role: userRole });
        displayUsers();
        document.getElementById("userModal").style.display = "none";
    }

    function deleteUser(email) {
        users = users.filter(user => user.email !== email);
        displayUsers();
    }

    document.getElementById("addUserBtn").addEventListener("click", addUser);
    displayUsers();
});
