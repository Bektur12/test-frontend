export const INITIAL_ROUTES = {
  INITIAL: {
    PATH: "/",
  },
  NOT_FOUND: {
    PATH: "*",
  },
};

export const BASE_URL = "http://localhost:3001";

export const VALIDATE_TEXT = "Заполните поле";

export const RULES = [
  { required: true, message: VALIDATE_TEXT },
  {
    pattern: /^\d{9}$/,
    message: "Please enter a valid phone number in the format +996XXXXXXXXX",
  },
];

export const FILTER_OPTION = [
  "Активна",
  "Бронь",
  "Куплено",
  "Рассрочка",
  "Бартер",
];
