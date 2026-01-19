function romanToInt(s) {
    const val = {
        I: 1, V: 5, X: 10, L: 50,
        C: 100, D: 500, M: 1000
    };

    let total = 0;

    for (let i = 0; i < s.length; i++) {
        const cur = val[s[i]];
        const next = i + 1 < s.length ? val[s[i + 1]] : 0;

        if (cur < next) total -= cur;
        else total += cur;
    }

    return total;
}

console.log(romanToInt("MCMXCIV"));  