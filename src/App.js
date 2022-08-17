import { Routes, Route } from "react-router-dom";
import "./App.css";
import PaymentsForm from "./components/PaymentsForm";
import GenericSnackBar from "./components/UI/GenericSnackBar/GenericSnackBar";
import RespAppBar from "./components/VimuAppBar/RespAppBar";
import Welcome from "./pages/Welcome";
function App() {
  return (
    <div className="App">
      <RespAppBar />
      <GenericSnackBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/payments" element={<PaymentsForm />} />
      </Routes>
    </div>
  );
}

export default App;
