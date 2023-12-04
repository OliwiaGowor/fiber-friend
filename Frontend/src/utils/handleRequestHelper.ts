
export const handleRequest = async (
    url: string,
    method: string,
    customErrorMessage: string = "Something went wrong. Please try again later.",
    token: any = null,
    data: any = null
) => {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: method,
            headers,
            body: data ? JSON.stringify(data) : null
        });

        if (!response.ok) {
            throw ({
                code: response.status,
                message: response.statusText,
                customMessage: customErrorMessage
            });

        } else {
            const resData = await response.json();
            return resData;
        }

    } catch (error) {
        throw ({
            code: 500,
            message: error,
            customMessage: customErrorMessage
        });
    }
}