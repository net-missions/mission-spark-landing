import React from 'react';
import { Progress } from '@/components/ui/progress';

interface FundingProgressProps {
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FundingProgress: React.FC<FundingProgressProps> = ({ 
  showDetails = true, 
  size = 'md',
  className = ''
}) => {
  // These would typically come from an API or context
  const goalAmount = 18000000; // ₱18 Million
  const raisedAmount = 0; // Starting from ₱0
  const progressPercentage = Math.round((raisedAmount / goalAmount) * 100);
  const remainingAmount = goalAmount - raisedAmount;

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const textSizes = {
    sm: {
      title: 'text-sm',
      numbers: 'text-lg',
      labels: 'text-xs'
    },
    md: {
      title: 'text-base',
      numbers: 'text-xl',
      labels: 'text-sm'
    },
    lg: {
      title: 'text-lg',
      numbers: 'text-2xl',
      labels: 'text-base'
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
      {showDetails && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`font-medium text-gray-600 ${textSizes[size].title}`}>
              Building Fund Progress
            </span>
            <span className={`font-medium text-primary ${textSizes[size].title}`}>
              {progressPercentage}% Complete
            </span>
          </div>
        </div>
      )}
      
      <Progress 
        value={progressPercentage} 
        className={`${sizeClasses[size]} mb-4`} 
      />
      
      {showDetails && (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className={`font-bold text-primary mb-1 ${textSizes[size].numbers}`}>
              ₱{raisedAmount.toLocaleString()}
            </div>
            <div className={`text-gray-600 ${textSizes[size].labels}`}>Raised</div>
          </div>
          <div>
            <div className={`font-bold text-gray-400 mb-1 ${textSizes[size].numbers}`}>
              ₱{remainingAmount.toLocaleString()}
            </div>
            <div className={`text-gray-600 ${textSizes[size].labels}`}>Remaining</div>
          </div>
          <div>
            <div className={`font-bold text-gray-900 mb-1 ${textSizes[size].numbers}`}>
              ₱{goalAmount.toLocaleString()}
            </div>
            <div className={`text-gray-600 ${textSizes[size].labels}`}>Goal</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingProgress;
