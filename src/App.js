import { BrowserRouter } from "react-router-dom";
import "./App.css";
// import ComposeMsg from "./components/ComposeMsg";
import UserRoutes from "./components/UserRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="box-border">
        <UserRoutes />
        {/* <ComposeMsg /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
