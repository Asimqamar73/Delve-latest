import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./services/store/index";
import { ToastContainer } from "react-toastify";
// import io from "socket.io-client";

// const socket = io();

function App() {
  // socket.on("connection",()=>{

  // })
  return (
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer />
    </Provider>
  );
}

export default App;
