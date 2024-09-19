import { CityType } from "../types";

const cities: CityType[] = [
  { id: 1, name: "تهران" },
  { id: 2, name: "اصفهان" },
  { id: 3, name: "شیراز" },
  { id: 4, name: "مشهد" },
  { id: 5, name: "تبریز" },
  { id: 6, name: "رشت" },
  { id: 7, name: "اهواز" },
  { id: 8, name: "کرمان" },
  { id: 9, name: "یزد" },
  { id: 10, name: "قم" },
  { id: 11, name: "کرمانشاه" }
];

const persianFilms = [
  {
    id: 1,
    name: "لوپتو",
    releasedCities: [1, 2, 3, 4],
    image: "https://kamva-minio-storage.darkube.app/sepid/projects/Loopeto.jpg",
    director: { first_name: "عباس", last_name: "عسکری" },
    description: "داستان روباتی به نام لوپتو که در کارخانه اسباب‌بازی‌سازی زندگی می‌کند و ماجراجویی‌هایش با دوستانش."
  },
  {
    id: 2,
    name: "فیلشاه",
    releasedCities: [1, 5, 6, 7],
    image: "https://kamva-minio-storage.darkube.app/sepid/projects/Filshah.jpg",
    director: { first_name: "هادی", last_name: "محمدیان" },
    description: "ماجرای فیل جوانی به نام شادفیل که قصد دارد به کاروان فیل‌ها در جنگل بپیوندد و با چالش‌های مختلفی روبرو می‌شود."
  },
  {
    id: 3,
    name: "بنیامین",
    releasedCities: [1, 4, 2, 3],
    image: "https://kamva-minio-storage.darkube.app/sepid/projects/benjamin.png",
    director: { first_name: "محسن", last_name: "عنایتی" },
    description: "داستان پسر نوجوانی به نام بنیامین که در تلاش است تا پدرش را از اعتیاد نجات دهد و با مشکلات زندگی مبارزه کند."
  },
  {
    id: 4,
    name: "پهلوانان",
    releasedCities: [1, 8, 9, 10],
    image: "https://kamva-minio-storage.darkube.app/sepid/projects/Pahlevanan.jpeg",
    director: { first_name: "سید مسعود", last_name: "صفوی" },
    description: "مجموعه انیمیشنی درباره پهلوانان افسانه‌ای ایران که با دیوها و نیروهای اهریمنی مبارزه می‌کنند."
  },
  {
    id: 5,
    name: "شکرستان",
    releasedCities: [1, 2, 3, 5],
    image: "https://kamva-minio-storage.darkube.app/sepid/projects/Shekarestan.jpg",
    director: { first_name: "سعید", last_name: "ضامنی" },
    description: "مجموعه انیمیشن طنز که در شهری خیالی به نام شکرستان می‌گذرد و ماجراهای جالب و آموزنده‌ای را روایت می‌کند."
  },
  {
    id: 6,
    name: "بچه زرنگ",
    releasedCities: [1, 4, 6, 11],
    image: "https://kamva-minio-storage.darkube.app/sepid/projects/Bache-Zerang.jpg",
    director: { first_name: "بهرام", last_name: "عظیمی" },
    description: "داستان پسر باهوشی به نام علی که با استفاده از هوش و خلاقیتش، مشکلات خانواده و دوستانش را حل می‌کند."
  }
];

export { cities, persianFilms };