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
            const response = await fetch("https://example.com/api/stats"); // ضع رابط API الصحيح
            if (!response.ok) throw new Error("❌ فشل تحميل البيانات");

            const data = await response.json();
            document.getElementById("taskCount").textContent = data.tasks || 0;
            document.getElementById("userCount").textContent = data.users || 0;
            document.getElementById("topUser").textContent = data.topUser || "غير متوفر";
        } catch (error) {
            alert("⚠️ حدث خطأ أثناء تحميل الإحصائيات، حاول مرة أخرى لاحقًا.");
            console.error("⚠️ خطأ في تحميل الإحصائيات:", error);
        }
    }
    if (document.getElementById("taskCount")) {
        loadDashboardStats();
    }

    document.addEventListener("DOMContentLoaded", function () {
        let modal = document.getElementById("myModal"); // تحديد النافذة
        let openModalBtn = document.getElementById("openModalBtn"); // زر فتح النافذة
        let closeModalBtn = document.querySelector(".close"); // زر الإغلاق
    
        // ✅ عند النقر على زر الفتح
        openModalBtn.addEventListener("click", function () {
            modal.style.display = "flex";
        });
    
        // ✅ عند النقر على زر الإغلاق
        closeModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    
        // ✅ عند النقر خارج النافذة يتم إغلاقها
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
    


    /** ✅ إدارة المهام **/
    const tasksContainer = document.getElementById("tasks-container");
    const userTasksContainer = document.getElementById("userTasksContainer");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function displayTasks() {
        if (!tasksContainer) return;

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

        tasks.push({ id: Date.now(), name: taskName, description: taskDescription });
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

    const addTaskBtn = document.getElementById("addTaskBtn");
    if (addTaskBtn) {
        addTaskBtn.addEventListener("click", addTask);
    }

    displayTasks();

    /** ✅ إدارة المستخدمين **/
    const usersContainer = document.getElementById("users-container");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    function displayUsers() {
        if (!usersContainer) return;

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

        if (users.some(user => user.email === userEmail)) {
            alert("⚠️ هذا المستخدم موجود بالفعل!");
            return;
        }

        users.push({ name: userName, email: userEmail, role: userRole });
        displayUsers();

        document.getElementById("userModal").style.display = "none";
    }

    function deleteUser(email) {
        const userIndex = users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            displayUsers();
        }
    }

    const addUserBtn = document.getElementById("addUserBtn");
    if (addUserBtn) {
        addUserBtn.addEventListener("click", addUser);
    }

    displayUsers();
});
