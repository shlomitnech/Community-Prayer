import LoginForm from "../components/LoginForm";

function Home(){
    return (
    <div>
    <h2>Tefilah Database</h2>
    <text>Here we write the thing about davening for others. Every week we rotate the topic of who we daven for.</text>

    <li>
        Submit new names
    </li>
    <li>
        Subscribe to recieve the weekly list to your email
    </li>
    <LoginForm />
     </div>
    )
}
export default Home;