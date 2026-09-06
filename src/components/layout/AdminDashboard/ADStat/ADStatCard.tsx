import { ArrowUpRight } from "lucide-react";
import React from "react";

export interface Stat {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

type Props = {
  stat: Stat;
};

const ADStatCard = ({ stat }: Props) => {
  const Icon = stat.icon;
  return (
    <div
      key={stat.title}
      className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
    >
      <div className="flex justify-between items-center gap-5">
        <div className="flex-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-100">
          <Icon className="h-4 w-4 text-emerald" />
        </div>

        <div className="flex-2 min-w-0 flex flex-col justify-center">
          <p className="text-xs md:text-md text-gray-500">{stat.title}</p>

          <p className=" truncate text-[11px] text-gray-400">
            {stat.description}
          </p>
        </div>
        <div className="flex-1 text-center font-bold">
          <p className="text-3xl font-semibold leading-tight text-emerald">
            {stat.value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ADStatCard;
