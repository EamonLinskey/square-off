const GITHUB_CLIENT_ID = "e9b18091102d7058d0c3"

const googleLogin =()=> {
    window.open("https://square-off-backend.herokuapp.com/auth/google/", "_self")
}

export function Login() {
    return (
        <div className = "login account-panel">
            <h1 className = "banner-header">Welcome</h1>
            <h2>Log In</h2>
            <div id="button-background-3d">
                <button 
                id = "login"
                className = "fun-orange-button"
                onClick={googleLogin}
                >
                    Log In with Google!
                </button>
            </div>
        </div>
    )
}