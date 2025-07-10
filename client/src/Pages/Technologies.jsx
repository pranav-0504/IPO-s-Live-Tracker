import React from "react";
import cheerioLogo from '../assets/Tech-logos/cheerio.png';
import HTMLLogo from '../assets/Tech-logos/HTML.png';
import jsLogo from '../assets/Tech-logos/js.png';
import dotEnvLogo from '../assets/Tech-logos/dotenv.png';
import NodemonLogo from '../assets/Tech-logos/Nodemon.png';
import PostManLOGO from '../assets/Tech-logos/PostManLogo.png';
import RenderLogo from '../assets/Tech-logos/Render.png';

const technologies = [
  {
    name: "React.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    role: "Frontend Framework",
  },
  {
    name: "Node.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    role: "Backend Runtime Environment",
  },
  {
    name: "Express.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    role: "Backend Framework",
  },
  {
    name: "MongoDB",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    role: "Database",
  },
  {
    name: "Tailwind CSS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    role: "Styling",

  },
  {
    name: "Axios",
    logo: "https://avatars.githubusercontent.com/u/32372333?s=200&v=4",
    role: "API Requests",
  },
  {
    name: "Vite",
    logo: "https://vitejs.dev/logo.svg",
    role: "Frontend Build Tool",
  },
  {
    name: "GitHub",
    logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    role: "Version Control",
  },
  {
    name: "Cheerios",
    logo: cheerioLogo,
    role: "HTML XML parsing Library for Web Scraping",
  },
  {
    name: "Heroicons",
    logo: "https://avatars.githubusercontent.com/u/79788229?s=200&v=4",
    role: "Icons Library",
  },
    {
    name: "HTML",
    logo: HTMLLogo,
    role: "Markup Language",
  },
    {
    name: "JavaScript",
    logo: jsLogo,
    role: "Core Scripting Language for Web",
  },

    {
    name: "dotENV File",
    logo: dotEnvLogo,
    role: "Manage environment variables (for hiding DB URI, etc.)",
  },
    {
    name: "Nodemon",
    logo: NodemonLogo,
    role: "	Dev server auto-restart on backend file changes",
  },
    {
    name: "Postman",
    logo:   PostManLOGO,
    role: "API Testing and Development",
  },
    {
    name: "Render",
    logo:   RenderLogo,
    role: "Backend server hosting for Deployment",
  },
];

const Technologies = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-400">
        Technologies Used in This Project 🚀
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {technologies.map((tech, idx) => (
          <div
            key={idx}
            className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-16 h-16 object-contain mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-green-400">{tech.name}</h2>
            <p className="text-gray-400 text-sm mt-1">{tech.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technologies;
