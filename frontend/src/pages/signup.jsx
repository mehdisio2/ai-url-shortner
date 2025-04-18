
function Signup(){
    //1- form to enter password and username
    //2- send the credentials to the server using the signup route
    

    
    return (
        <>
            <form action="/submit" method="POST">
                <label for="name">Name:</label><br />
                <input type="text" id="name" name="name" required /><br /><br />

                <label for="password">Password:</label><br />
                <input type="text" id="name" name="name" required /><br /><br />

                <button type="submit">Send</button>
            </form>

        </>
    )
}

export default Signup;
