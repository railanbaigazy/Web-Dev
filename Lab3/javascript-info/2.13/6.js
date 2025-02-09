let n = 10;

for (let i = 2; i <= n; i++) {
    for (let j = 2; j < Math.sqrt(i); j++) {
        if (i % j == 0) break;
    }
  alert( i );
}