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
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
          <Icon className="h-5 w-5 text-emerald" />
        </div>

        <ArrowUpRight className="h-4 w-4 text-gray-400" />
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">{stat.title}</p>

        <p className="mt-1 text-2xl font-semibold text-gray-900">
          {stat.value}
        </p>

        <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
      </div>
    </div>
  );
};

export default ADStatCard;
