# GlamCars
**Подготовка:**
- Необходимо иметь установленный PostgreSQL.
- Необходимо иметь установленный NodeJS и менеджер пакетов npm.
- Необходимо иметь любой текстовый редактор (Пример: VSCode).

**Пошаговая инструкция (для Windows):**
1. Склонируйте или скачайте репозиторий в любое удобное для вас место на компьютере.
2. Откройте папку "DB". В ней находится файл "main.sql" - бэкап базы данных.
3. Установите бэкап в СУБД PostgreSQL любым удобным способом (например через pgAdmin 4).
4. В каталоге "server" откройте файл "postgresDB.js".
5. Заполните содержимое по шаблону:
```
const Pool = require('pg').Pool;
const pool = new Pool({
	user: <ваш пользователь>,
	password: <ваш пароль>,
	host: "localhost",
	port: <ваш порт>,
	database: "CarsDB"
});

module.exports = pool;
```
6. Откройте терминал (cmd, powershell), перейдите в каталог командой: ```cd <ваш путь то папки с проектом>\server```.
7. Скачайте все необходимые пакеты с помощью команды: ```npm install```.
8. Запустите серверное приложение командой: ```npm run dev``` или ```node start```.
9. В папке проекта в каталоге "pages" откройте через браузер любой файл .html (например "choose.html").
10. Если падают ошибки, то значит у вас проблемы с CORS. Откроейте браузер с отключеным CORS с помощью следующих шагов.
11. Нажмите комбинацию клавиш: ```Win + R``` и введите строку: ```chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security```.
12. В открывшемся браузере в адресную строку введите путь до нужного файла, например: ```<путь до папки проекта>\pages\choose.html```. (Важно: в этом браузере без защиты лучше не посещать сторонние ресурсы!).
13. Готово.
