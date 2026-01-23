# Мини-Лавка

Онлайн-каталог магазина сухофруктов и орехов с доставкой.

## Технологии

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Query (server state)
- GSAP + Framer Motion (animations)

### Backend
- Python
- FastAPI
- SQLite
- SQLAlchemy

## Быстрый старт

### Frontend

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### Backend

```bash
# Перейти в папку backend
cd backend

# Создать виртуальное окружение
python -m venv venv

# Активировать (Windows)
venv\Scripts\activate

# Активировать (macOS/Linux)
source venv/bin/activate

# Установить зависимости
pip install -r requirements.txt

# Запустить сервер
uvicorn app.main:app --reload --port 8000
```

API будет доступен по адресу: http://localhost:8000

## Структура проекта

```
├── src/
│   ├── components/     # UI компоненты
│   │   ├── ui/         # Базовые компоненты
│   │   ├── layout/     # Компоненты разметки
│   │   ├── product/    # Компоненты товаров
│   │   ├── cart/       # Компоненты корзины
│   │   └── catalog/    # Компоненты каталога
│   ├── pages/          # Страницы
│   ├── store/          # Zustand сторы
│   ├── types/          # TypeScript типы
│   ├── utils/          # Утилиты
│   └── data/           # Моковые данные
├── backend/
│   └── app/
│       ├── api/        # API роуты
│       ├── db/         # База данных
│       ├── models/     # SQLAlchemy модели
│       └── schemas/    # Pydantic схемы
└── public/             # Статические файлы
```

## Функционал

- ✅ Каталог товаров с горизонтальной прокруткой
- ✅ Поиск по товарам
- ✅ Фильтрация по категориям
- ✅ Карточка товара с детальной информацией
- ✅ Корзина с изменением количества
- ✅ Избранное
- ✅ Оформление заказа
- ✅ Адаптивный дизайн (mobile-first)
- ✅ Плавные анимации (GSAP + Framer Motion)

## API Endpoints

- `GET /api/products` - Список товаров
- `GET /api/products/:id` - Товар по ID
- `GET /api/categories` - Список категорий
- `POST /api/orders` - Создание заказа
- `GET /api/orders/:id` - Статус заказа
