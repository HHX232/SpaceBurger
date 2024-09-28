export const formatOrderDate = (dateString: string): string => {
   const date = new Date(dateString);
   const now = new Date();
 
   const formatTime = (date: Date) => {
     return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
   };
   if (now.toDateString() === date.toDateString()) {
     return `Сегодня, ${formatTime(date)}`;
   }
   const yesterday = new Date(now);
   yesterday.setDate(now.getDate() - 1);
 
   if (yesterday.toDateString() === date.toDateString()) {
     return `Вчера, ${formatTime(date)}`;
   }
 
   const differenceInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
 
   if (differenceInDays > 1 && differenceInDays <= 5) {
     return `${differenceInDays} дня назад, ${formatTime(date)}`;
   }
 
   return `${differenceInDays} дней назад, ${formatTime(date)}`;
 };
 
 export default formatOrderDate