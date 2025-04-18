import { useState } from "react";

function Signup(){
    //1- form to enter password and username
    //2- send the credentials to the server using the signup route
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const sendCredentials = async (e) => {
        e.preventDefault();
        console.log(password)
        console.log(username)
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: password})
            })
            console.log(response);
        } catch (error) {
            console.log("unable to register user", error);
        }

    
    }
    
    return (
        <>
            <form onSubmit={sendCredentials}>
                <label for="name">Name:</label><br />
                <input type="text" id="name" name="name" required 
                    onChange={(e) => setUsername(e.target.value)}/> <br />
                <label for="password">Password:</label><br />
                <input type="text" id="password" name="password" required 
                    onChange={(e) => setPassword(e.target.value)}/> <br />

                <button type="submit">Send</button> <br />

            </form>


        </>
    )
}

export default Signup;
