interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: '1iuby23bhou45i3535bhit3bhu4i345juv23iund',
                user: {
                    name: 'Arthur',
                    email: 'arthurdb1999@gmail.com'
                }
            })
        }, 2000)
    })
}