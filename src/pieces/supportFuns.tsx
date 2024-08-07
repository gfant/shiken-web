export const parseResponse = (response: string): string => {
    const regex = /"([^"]*)"/;
    const match = response.match(regex);

    if (!match || match.length < 2) {
        throw new Error('invalid post response');
    }
    return match[1];
};

export const parseJSONResponse = (response: string): string => {
    let left = 0
    let right = response.length
    while (right > 0 && response[right - 1] !== '}') right -= 1;
    while (left < response.length && response[left] !== '{') left += 1
    response = response.substring(left, right);
    const content = response.replace(/\\\\/g, "\\").replace(/\\"/g, '"').replace(/\r\n/g, " ").replace(/\t"/g, '"');
    return content
}

export const verifyCode = (code: string): boolean => {
    if (!code.startsWith("package")) {
        return false
    }
    if (!code.includes("func Problem")){
        return false
    }
    return true
}