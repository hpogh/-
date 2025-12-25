import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0Z7NxPcD82kfnyKkW5_HY3M_C0Pu0Ca0",
  authDomain: "wedtest-af71f.firebaseapp.com",
  projectId: "wedtest-af71f",
  storageBucket: "wedtest-af71f.firebasestorage.app",
  messagingSenderId: "272938561280",
  appId: "1:272938561280:web:7effbd6b8ed8562f828de5",
  measurementId: "G-74E7SBN5VD"
};


// Инициализация Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// Функция для входа пользователя
async function loginUser() {
    // Получение email и пароля из формы
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Простая валидация формы
    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Введите логин и пароль!",
          });
        return;
    }

    try {
        // Получение данных из коллекции "Authorization"
        const snapshot = await get(ref(database, 'Authorization'));
        const users = snapshot.val();

        // Фильтрация потенциальных пустых элементов
        const filteredUsers = Object.values(users).filter(u => u);

        // Поиск пользователя с соответствующим email и паролем (без учета регистра)
        const user = filteredUsers.find(u => u.Login.toLowerCase() === email.toLowerCase() && u.Password === password);

        if (user) {
            // Сохранение данных пользователя в localStorage
            //localStorage.setItem('userID', user.ID_PersonalAccount);
            //localStorage.setItem('userEmail', email);

            // Проверка, является ли пользователь администратором
            const isAdmin = user.ID_Post === "1";
            // Проверка, является ли пользователь тренером
            const isCoach = user.ID_Post === "3";

            if (isAdmin) {
                // Перенаправление на страницу администратора
                window.location.href = 'index.html';
            } else if (isCoach) {
                // Перенаправление на страницу тренера
                window.location.href = 'coach.html';
            } else {
                // Перенаправление на страницу спортсмена
                window.location.href = 'personalaccount.html';
            }
        } else {
            // Пользователь не найден или неверный email/пароль
            console.error('Пользователь не найден или неверный логин/пароль.');
            Swal.fire({
                icon: "error",
                title: "Ошибка...",
                text: "Неправильный логин или пароль!",
              });
        }
    } catch (error) {
        // Обработка ошибок при получении данных пользователя
        console.error('Ошибка при получении данных пользователя:', error);
    }
}