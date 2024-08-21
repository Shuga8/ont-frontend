import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Survey } from "./components";
import { AdminRoutes } from "./routes";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Survey />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
