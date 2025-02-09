function pow(x, n) {
    let result = x;
    for (let i = 1; i < n; i++) {
        result *= x;
    }
    return result;
}

pow(3, 2);
pow(3, 3);
pow(1, 100); 