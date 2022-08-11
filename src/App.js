import { Routes, Route } from "react-router-dom";
import "./App.css";
import PaymentsForm from "./components/PaymentsForm";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PaymentsForm />} />
      </Routes>
    </div>
  );
}

export default App;
