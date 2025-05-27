import React from "react";
import Main_menu from "./components/Main_menu";
import Edit_menu from "./components/Edit_menu";
import {Route, Routes, BrowserRouter} from 'react-router-dom';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main_menu/>}/>
        <Route path="/edit_menu" element={<Edit_menu/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
