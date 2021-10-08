import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import LoginDisplay from "./components/displays/LoginDisplay";
import SignupDisplay from "./components/displays/SignupDisplay";
import Main from "./components/MainComponent";
import ChatState from "./context/Chat/ChatState";


function App() {
  return (
    <ChatState>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path = "/" exact component = {Main}/>
          <Route path = "/login" exact component={LoginDisplay}/>
          <Route path = "/signup" exact component={SignupDisplay}/>
        </Switch>
      </Router>
    </ChatState>
  );
}

export default App;
