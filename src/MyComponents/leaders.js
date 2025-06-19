import React from "react";
const people = [
    {
      name: 'Tanmoy Mandal',
      role: 'Founder / CEO',
      imageAlt: 'Portrait of Tanmoy Mandal',
    },
    {
      name: 'Sarthak Routray',
      role: 'Co-Founder / CIO',
      imageAlt: 'Portrait of Sarthak Routray',
    },
    {
      name: 'Sarthak Routray',
      role: 'CFO',
      imageAlt: 'Portrait of Sarthak Routray',
    },
    {
      name: 'Tanmoy Mandal',
      role: 'COO',
      imageAlt: 'Portrait of Tanmoy Mandal',
    },
    
  ]
  
  export default function leaders() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
              suspendisse.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {person.imageAlt}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }