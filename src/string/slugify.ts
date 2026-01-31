// converts to url slug, handles tr/de/fr chars
export function slugify(str: string, separator = '-'): string {
    const charMap: Record<string, string> = {
        'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
        'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c',
        'ä': 'a', 'ë': 'e', 'ï': 'i', 'ß': 'ss',
        'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
        'ñ': 'n',
    }

    return str
        .toLowerCase()
        .split('')
        .map(char => charMap[char] ?? char)
        .join('')
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, separator)
        .replace(new RegExp(`${separator}+`, 'g'), separator)
        .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '')
}
