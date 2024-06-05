export function cutSliceDate(string: string) {
    if (!string) {
        return ""
    }

    return string.slice(0, 10)
}