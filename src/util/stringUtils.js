export const randomUUIDStr = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

export const toPath = (...parts) => {
    if (!parts || parts.length === 0) {
        return null
    }

    let path = parts.map(p => {
        let r = p
        if(r.endsWith("/")) {
            r = r.substring(0, r.length - 1)
        }
        if(r.startsWith("/")) {
            r = r.substring(1, r.length)
        }
        return r
    }).join("/")

    if (parts[0].startsWith("/")) {
        return "/" + path
    } else {
        return path
    }
}