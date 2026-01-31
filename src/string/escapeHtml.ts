const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
}

// escapes html chars, good for xss prevention
export function escapeHtml(str: string): string {
    return str.replace(/[&<>"']/g, char => htmlEntities[char] ?? char)
}

// reverse of above
export function unescapeHtml(str: string): string {
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
}
