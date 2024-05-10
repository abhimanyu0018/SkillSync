import React from "react";
import srijanPic from "../../Assets/MY Profile Pic.jpeg";
import abhimanyuPic from "../../Assets/main-profile.png";
const AboutPage = () => {
  const people = [
    {
      name: "Abhimanyu Kanaujia",
      role: "Full Stack Developer",
      picture:  abhimanyuPic ,
      linkedinURL: "https://www.linkedin.com/in/abhimanyukanaujia018/",
      githubURL: "https://github.com/abhimanyu0018",
    },
    {
      name: "Srijan Agrawal",
      role: "Full Stack Developer",
      picture:  srijanPic ,
      linkedinURL: "https://www.linkedin.com/in/srijan-agrawal-961281240/",
      githubURL: "https://github.com/Srijan8899",
    },
  ];

  return (
    <div className="relative mx-auto py-10 px-3 w-full max-w-7xl text-black">
      <div className="flex flex-col items-center">
        {/* :TITLE CONTAINER */}
        <div className="mb-8 flex justify-center items-center">
          <span className="h-2 w-16 rounded-3xl bg-gray-700" />
          <h2 className="px-3 text-xl font-semibold uppercase">
            Our passionate team
          </h2>
          <span className="h-2 w-16 rounded-3xl bg-gray-700" />
        </div>

        {/* :TEAM CONTAINER */}
        <div className="mt-10 mx-auto w-full max-w-sm sm:max-w-2xl lg:max-w-5xl mb-7">
          <ul className="grid grid-cols-2 gap-10 lg:gap-20">
            {people.map((person) => (
              <li
                key={person.name}
                //add bg colour if you need style
                className="col-span-full sm:col-span-1 lg:col-span-1 relative pb-4 px-3 h-80 flex justify-center items-end overflow-hidden rounded-lg"
              >
                {/* ::Background picture */}
                <img
                  src={person.picture}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
                {/* ::Details */}
                <div className="relative p-2 w-full flex flex-col items-center rounded bg-white bg-opacity-80">
                  {/* :::name */}
                  <h3 className="text-base text-gray-800 font-bold tracking-wide">
                    {person.name}
                  </h3>
                  {/* :::role */}
                  <p className="text-sm text-gray-500 font-semibold">
                    {person.role}
                  </p>
                  {/* :::socials */}
                  <div className="mt-2 inline-flex space-x-4">
                    {/* Linkedin */}
                    <a
                      href={person.linkedinURL}
                      className="text-gray-700 hover:text-blue-600"
                      target="_blank"
                      rel="noopener"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-linkedin"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a
                      href={person.githubURL}
                      className="text-gray-700 hover:text-blue-600"
                      target="_blank"
                      rel="noopener"
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-github"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
