interface MilestoneProps {
  title: string;
  description: string;
  tools: string[];
  dependencies: string[];
  index: number;
}

export default function Milestone({ title, description, tools, dependencies, index }: MilestoneProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-[#2a2a2a] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-black font-semibold">
          {index + 1}
        </div>
        <h3 className="text-xl font-semibold text-[#6a6a6a]">{title}</h3>
      </div>
      
      <p className="text-[#b0b0b0] mb-6">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-[#6a6a6a] mb-3 flex items-center gap-2 font-semibold">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Tools & Libraries
          </h4>
          <ul className="space-y-2">
            {tools.map((tool, i) => (
            <li key={i} className="flex items-center gap-2 text-[#b0b0b0]">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {tool}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-[#6a6a6a] mb-3 flex items-center gap-2 font-semibold">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Dependencies & Setup
          </h4>
          <ul className="space-y-2">
            {dependencies.map((dep, i) => (
              <li key={i} className="flex items-center gap-2 text-[#b0b0b0]">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {dep}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 