export function performance(title, func, count = 1_000_000) {
  const start = Date.now();
  for (let i=1; i<=count; i++) func();
  console.log(title, ', time (MS) = ', Date.now() - start);
};
