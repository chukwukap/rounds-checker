import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  primaryValue: string;
  secondaryValue?: string;
  subtitle?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  primaryValue,
  secondaryValue,
  subtitle,
  className = "",
}) => (
  <div
    className={`bg-base-300 p-6 rounded-xl flex items-center shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 ${className}`}
  >
    <div className="mr-4 bg-base-100 p-3 rounded-full">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      <p className="text-3xl font-bold text-primary">{primaryValue}</p>
      {secondaryValue && (
        <p className="text-xl text-accent">{secondaryValue}</p>
      )}
      {subtitle && <p className="text-sm text-accent mt-1">{subtitle}</p>}
    </div>
  </div>
);
