


const convertPhpToJsDateFormat = (phpFormat) => {
    const formatMap = {
        d: 'DD',
        D: 'ddd',
        j: 'D',
        l: 'dddd',
        N: 'E',
        S: 'o',
        w: 'e',
        z: 'DDD',
        W: 'W',
        F: 'MMMM',
        m: 'MM',
        M: 'MMM',
        n: 'M',
        t: '', // JavaScript does not provide a direct equivalent for the number of days in a month
        L: '', // JavaScript does not provide a direct equivalent for leap year information
        o: 'YYYY',
        Y: 'YYYY',
        y: 'YY',
        a: 'a',
        A: 'A',
        B: '', // JavaScript does not provide a direct equivalent for Swatch Internet time
        g: 'h',
        G: 'H',
        h: 'hh',
        H: 'HH',
        i: 'mm',
        s: 'ss',
        u: 'SSS',
        e: 'zz', // Timezone identifier (e.g., UTC, GMT, Atlantic/Azores)
        I: '', // JavaScript does not provide a direct equivalent for daylight saving time information
        O: 'ZZ',
        P: 'Z',
        T: '', // JavaScript does not provide a direct equivalent for timezone abbreviation
        Z: '', // JavaScript does not provide a direct equivalent for timezone offset in seconds
        c: '', // ISO 8601 date (e.g., 2022-01-01T12:34:56+00:00)
        r: '', // RFC 2822 formatted date (e.g., Sat, 01 Jan 2022 12:34:56 +0000)
        U: 'X' // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
    };

    let jsFormat = '';
    let inEscape = false;

    for (let i = 0; i < phpFormat.length; i++) {
        const char = phpFormat[i];

        if (char === '\\') {
            // Handle escaped characters
            inEscape = true;
            continue;
        }

        if (inEscape) {
            // Add escaped character as-is to the JavaScript format
            jsFormat += char;
            inEscape = false;
            continue;
        }

        // Convert PHP format character to JavaScript format character
        const jsChar = formatMap[char] || char;
        jsFormat += jsChar;
    }


    return jsFormat;
}

export { convertPhpToJsDateFormat } 