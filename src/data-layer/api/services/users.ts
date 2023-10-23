export class Users {
    static async signIn(email: string, password: string) {
        const response = await fetch(`${process.env.REACT_APP_API_BASE}/signin`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data?.user;
    }
}