// basic {{var}} replacement, template('hi {{name}}', {name:'ali'})
export function template(
    str: string,
    data: Record<string, string | number | boolean>
): string {
    return str.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
        const val = data[key]
        return val !== undefined ? String(val) : ''
    })
}
