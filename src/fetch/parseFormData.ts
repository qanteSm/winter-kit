// parse form data from request, handles multipart
export async function parseFormData(request: Request): Promise<Record<string, string | File>> {
    const contentType = request.headers.get('content-type') ?? ''
    const result: Record<string, string | File> = {}

    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData()
        for (const [key, value] of formData.entries()) {
            result[key] = value
        }
    }

    return result
}

// get specific fields from form
export async function getFormFields<K extends string>(
    request: Request,
    fields: K[]
): Promise<Record<K, string | undefined>> {
    const data = await parseFormData(request)
    const result = {} as Record<K, string | undefined>

    for (const field of fields) {
        const val = data[field]
        result[field] = typeof val === 'string' ? val : undefined
    }

    return result
}
