"use client";

interface StatusMessageProps {
  type: 'error' | 'success' | 'info';
  message: string;
}

export default function StatusMessage({ type, message }: StatusMessageProps) {
  if (!message) return null;
  
  const styles = {
    error: 'p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium',
    success: 'p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 font-medium',
    info: 'p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-medium'
  };
  
  const icons = {
    error: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    success: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )
  };
  
  return (
    <div className={styles[type]}>
      <div className="flex items-center">
        {icons[type]}
        <span>{message}</span>
      </div>
    </div>
  );
}
