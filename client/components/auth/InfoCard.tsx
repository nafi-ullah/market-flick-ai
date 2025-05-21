"use client";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  actions?: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export default function InfoCard({ icon, title, message, actions, variant = 'info' }: InfoCardProps) {
  const variantStyles = {
    success: {
      bg: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-800',
      textColor: 'text-green-700'
    },
    error: {
      bg: 'bg-red-100',
      iconColor: 'text-red-600',
      titleColor: 'text-red-800',
      textColor: 'text-red-700'
    },
    warning: {
      bg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-800',
      textColor: 'text-yellow-700'
    },
    info: {
      bg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-800',
      textColor: 'text-blue-700'
    }
  };
  
  const { bg, iconColor, titleColor, textColor } = variantStyles[variant];
  
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 text-center">
      <div className={`w-16 h-16 mx-auto ${bg} rounded-full flex items-center justify-center mb-6`}>
        <div className={`w-8 h-8 ${iconColor}`}>
          {icon}
        </div>
      </div>
      
      <h2 className={`text-xl font-bold mb-2 ${titleColor}`}>{title}</h2>
      
      <p className={`mb-6 ${textColor}`}>
        {message}
      </p>
      
      {actions && (
        <div className="mt-6">
          {actions}
        </div>
      )}
    </div>
  );
}
