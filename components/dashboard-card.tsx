import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
};

export default function DashboardCard({ title, value, icon: Icon, color = "bg-blue-500" }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 sm:p-5">
      <div className="flex flex-col items-center text-center gap-3 sm:flex-row sm:justify-between sm:text-left">
        {Icon && (
          <div className={`${color} rounded-lg p-3 text-white`}>
            <Icon className="w-6 h-6" />
          </div>
        )}

        <div className="sm:flex-1">
          <p className="text-xs sm:text-sm text-gray-500">{title}</p>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1">{value}</h2>
        </div>
      </div>
    </div>
  );
}
