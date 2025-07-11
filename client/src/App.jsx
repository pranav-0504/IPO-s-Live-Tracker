import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IpoList from './Pages/IpoList';
import LiveStats from './Pages/LiveStats';
import Technologies from './Pages/Technologies';
import Feedback from './Pages/Feedback';
import About from './Pages/About';

import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App = () => {
  return (

    // Div container me navbar, main content and footer ko flex column me arrange kiya hai
    // aur main content ko flex-grow diya hai taaki wo available space le sake
    // Footer ko bottom me rakhne ke liye flex-col aur justify-between use ki
    // aur min-h-screen se pura screen cover ho sake
    // bg-gray-950 se dark background aur text-white se text color set kiya hai
    // Tailwind CSS classes ka use kiya hai for styling
    // Router se routing handle kiya hai aur Routes me IpoList component ko render ki

    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-between">
      <Router>
        <Navbar />

        <main className="flex-grow">
          <Routes>

            <Route path="/" element={<IpoList />} />
            <Route path ="/stats" element = {<LiveStats />}/>
            <Route path="/technologies" element = {<Technologies />}/>
            <Route path="/feedback" element = {<Feedback />}/>
            <Route path="/about" element = {<About />}/>
            
            {/* Add more routes as needed */}
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
};

export default App;



// const App = () => {
//   return(
//     <Router>
//       <Navbar />
//       <Routes>

//         <Route path ="/" element ={<IpoList />} />

//       </Routes>

//       <Footer />          

//     </Router>
//   );
// };


// function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <h1 className="text-4xl font-bold text-blue-600">Tailwind is working ✅</h1>
//     </div>
//   );
// }