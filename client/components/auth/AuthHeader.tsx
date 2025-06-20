"use client";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-lg text-gray-700 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
