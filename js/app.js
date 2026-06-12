// الإمساك بعناصر الواجهة (DOM Elements)
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const tasksList = document.getElementById('tasks-list');
const errorMsg = document.getElementById('error-msg');

// عناصر العدادات والإحصائيات
const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const progressPercentEl = document.getElementById('progress-percent');
const toast = document.getElementById('toast');

// مصفوفة لتخزين المهام برمجياً
let tasks = [];

// دالة لتحديث العدادات الحسابية فوراً
function updateDashboard() {
    const total = tasks.length;
        const completed = tasks.filter(task => task.isCompleted).length;
            
                // حساب النسبة المئوية بدقة (رقم صحيح)
                    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

                        // تحديث الواجهة بالأرقام الجديدة
                            totalTasksEl.textContent = total;
                                completedTasksEl.textContent = completed;
                                    progressPercentEl.textContent = `${percent}%`;
                                    }

                                    // دالة لإظهار إشعار التوست الذكي
                                    function showToast(message) {
                                        toast.textContent = message;
                                            toast.classList.add('show');
                                                setTimeout(() => {
                                                        toast.classList.remove('show');
                                                            }, 2500);
                                                            }

                                                            // دالة لإعادة رندرة (بناء) قائمة المهام على الشاشة
                                                            function renderTasks() {
                                                                tasksList.innerHTML = ''; // تفريغ القائمة أولاً

                                                                    tasks.forEach((task, index) => {
                                                                            const li = document.createElement('li');
                                                                                    li.className = `task-item ${task.isCompleted ? 'completed' : ''}`;

                                                                                            li.innerHTML = `
                                                                                                        <span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
                                                                                                                    <div class="task-actions">
                                                                                                                                    <button class="action-btn check-btn" onclick="toggleTask(${index})">
                                                                                                                                                        ${task.isCompleted ? 'تراجع' : 'تمت'}
                                                                                                                                                                        </button>
                                                                                                                                                                                        <button class="action-btn delete-btn" onclick="deleteTask(${index})">حذف</button>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                            `;

                                                                                                                                                                                                                    tasksList.appendChild(li);
                                                                                                                                                                                                                        });

                                                                                                                                                                                                                            updateDashboard();
                                                                                                                                                                                                                            }

                                                                                                                                                                                                                            // دالة إضافة مهمة جديدة
                                                                                                                                                                                                                            function addTask() {
                                                                                                                                                                                                                                const taskText = taskInput.value.trim();

                                                                                                                                                                                                                                    // التحقق من أن الحقل ليس فارغاً
                                                                                                                                                                                                                                        if (taskText === '') {
                                                                                                                                                                                                                                                errorMsg.style.display = 'block';
                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                errorMsg.style.display = 'none'; // إخفاء رسالة الخطأ

                                                                                                                                                                                                                                                                    // إضافة المهمة للمصفوفة
                                                                                                                                                                                                                                                                        tasks.push({
                                                                                                                                                                                                                                                                                text: taskText,
                                                                                                                                                                                                                                                                                        isCompleted: false
                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                taskInput.value = ''; // تفريغ الحقل
                                                                                                                                                                                                                                                                                                    renderTasks();
                                                                                                                                                                                                                                                                                                        showToast('🚀 تم إضافة المهمة البرمجية بنجاح!');
                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                        // دالة تغيير حالة المهمة (مكتملة / غير مكتملة)
                                                                                                                                                                                                                                                                                                        function toggleTask(index) {
                                                                                                                                                                                                                                                                                                            tasks[index].isCompleted = !tasks[index].isCompleted;
                                                                                                                                                                                                                                                                                                                renderTasks();
                                                                                                                                                                                                                                                                                                                    showToast('✨ تم تحديث حالة المهمة!');
                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                    // دالة حذف المهمة
                                                                                                                                                                                                                                                                                                                    function deleteTask(index) {
                                                                                                                                                                                                                                                                                                                        tasks.splice(index, 1); // إزالة المهمة من المصفوفة
                                                                                                                                                                                                                                                                                                                            renderTasks();
                                                                                                                                                                                                                                                                                                                                showToast('🗑️ تم حذف المهمة بنجاح.');
                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                // تشغيل دالة الإضافة عند الضغط على زرار الإضافة
                                                                                                                                                                                                                                                                                                                                addBtn.addEventListener('click', addTask);

                                                                                                                                                                                                                                                                                                                                // تشغيل دالة الإضافة عند الضغط على زر Enter في الكيبورد
                                                                                                                                                                                                                                                                                                                                taskInput.addEventListener('keypress', function(e) {
                                                                                                                                                                                                                                                                                                                                    if (e.key === 'Enter') {
                                                                                                                                                                                                                                                                                                                                            addTask();
                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                });