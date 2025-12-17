import { Quote, Check, X } from "lucide-react";

export interface GameInfoProps {
  description: string;
  verdict: string;
  pros: string[];
  cons: string[];
}

export function GameInfo({ description, verdict, pros, cons }: GameInfoProps) {
  return (
    <div className="space-y-16">
      {/* Introduction & Verdict */}
      <div className="space-y-8">
        <p className="text-xl text-gray-300 leading-relaxed font-light">
          {description}
        </p>

        {/* Verdict Box */}
        <div className="bg-[#351150]/30 border-l-4 border-[#F6CA56] p-8 rounded-r-xl relative overflow-hidden">
          <Quote className="absolute top-4 right-4 w-12 h-12 text-[#F6CA56]/10" />
          <h3 className="text-2xl font-bold text-white font-heading mb-4">The Verdict</h3>
          <p className="text-gray-200 text-lg italic leading-relaxed">
            &quot;{verdict}&quot;
          </p>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
          <h3 className="text-green-400 font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" /> 
            The Good
          </h3>
          <ul className="space-y-4">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 bg-green-500/20 p-1 rounded-full">
                  <Check className="w-3 h-3 text-green-500" />
                </div>
                <span className="text-gray-300 text-sm">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <h3 className="text-red-400 font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" /> 
            The Bad
          </h3>
          <ul className="space-y-4">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-3">
                 <div className="mt-1 bg-red-500/20 p-1 rounded-full">
                  <X className="w-3 h-3 text-red-500" />
                </div>
                <span className="text-gray-300 text-sm">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
