import LoginComponent from "./components/LoginComponent";
import LoginService from "./services/LoginServices";

function App() {
  const loginService = new LoginService();
  const setToken = (token: string) => {
    console.log(`Token: ${token}`);
  }

  return (
    <LoginComponent loginService={loginService} setToken={setToken}/>
  );
}

export default App;
