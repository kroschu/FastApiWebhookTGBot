document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const service = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const popupMessage = `${name}, вы записаны на ${service.toLowerCase()} ${date} в ${time}.`;
    document.getElementById('popupMessage').textContent = popupMessage;

    document.getElementById('popup').style.display = 'flex';
});

document.getElementById('closePopup').addEventListener('click', async function () {
    const name = document.getElementById('name').value;
    const service = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const userId = parseInt(document.getElementById('user_id').value, 10);  // Преобразуем в число
    const stylist = document.getElementById('stylist').value
    const gender = document.getElementById('gender').value
    // Создаем объект с данными
    const appointmentData = {
        name: name,
        gender: gender,
        service: service,
        appointment_date: date,
        appointment_time: time,
        stylist: stylist,
        user_id: userId  // Передаем user_id
    };

    // Преобразуем объект в JSON строку
    const jsonData = JSON.stringify(appointmentData);

    // Отправляем POST запрос на /forma
    try {
        const response = await fetch('/appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });
        const result = await response.json();
        console.log('Response from /forma:', result);

        // Закрываем Telegram WebApp через 100 мс
        setTimeout(() => {
            window.Telegram.WebApp.close();
        }, 100);
    } catch (error) {
        console.error('Error sending POST request:', error);
    }
});

// Анимация появления элементов при загрузке страницы
function animateElements() {
    const elements = document.querySelectorAll('h1, .form-group, .btn');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Стили для анимации
var styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    h1, .form-group, .btn {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`, styleSheet.cssRules.length);

// Плавное появление страницы при загрузке
window.addEventListener('load', function () {
    document.body.style.opacity = '1';
    animateElements();
});

styleSheet.insertRule(`
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
`, styleSheet.cssRules.length);

// Добавляем текущую дату в поле даты
document.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
});