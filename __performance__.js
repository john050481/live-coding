/**
  Выполнять для каждой функции ОТДЕЛЬНО!!! Не надо запускать друг за другом для нескольких функций.
*/
export function performance(title, func, count = 1_000_000, subtitle) {
  const start = Date.now();
  for (let i=1; i<=count; i++) func();

  const formattedTitle = (`\x1b[33m${title}\x1b[0m`).padEnd(30, ' ');
  const formattedSubtitle = subtitle ? (`\x1b[35m(${subtitle})\x1b[0m`).padEnd(30, ' ') : '';

  const formattedTimeText = `\x1b[32m${' ms'}\x1b[0m`;
  const formattedTimeValue = `\x1b[31m${Date.now() - start}\x1b[0m`;
  const formattedTime = (`${formattedTimeValue}${formattedTimeText}`).padEnd(30, ' ');

  console.log(`${formattedTitle} ${formattedTime} ${formattedSubtitle}`);
};
