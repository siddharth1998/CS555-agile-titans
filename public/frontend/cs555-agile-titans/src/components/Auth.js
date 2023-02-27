import './Auth.css';
import { useState } from "react";

const Auth = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    return (
        <form class="wrapper fadeInDown">
            <div id="formContent">
                <div class="fadeIn first">
                    <img src="https://slackmojis.com/emojis/10031-60fps_parrot/download" id="icon" alt="User Icon" />
                </div>

                <input type="text" id="login" class="fadeIn second" name="login" placeholder="Email" />
                <input type="password" id="login" class="fadeIn second" name="password" placeholder="Password" />
                <br />
                <br />
                <input type="submit" class="fadeIn fourth" value="Log In" />
            </div>
        </form>
    );
};

export default Auth;