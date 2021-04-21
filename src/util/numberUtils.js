export const formatSize = (size, digits = 2) => {
    if (!size) {
        return "0 Bytes";
    }
    let unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    let index = 0
    let srcSize = parseFloat(size)
    index = Math.floor(Math.log(srcSize) / Math.log(1024))
    let formatted = srcSize / Math.pow(1024, index)
    formatted = formatted.toFixed(digits)
    return formatted + " " + unitArr[index]
}

export const formatPercentage = (val, digits = 2) => {
    return val ? `${(val * 100).toFixed(digits)}%` : '-'
}