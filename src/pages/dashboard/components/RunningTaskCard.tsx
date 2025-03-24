import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RunningTaskCard: React.FC = () => {
  return (
    <>
      <Card className="md:hidden bg-black text-white w-full h-[124px] rounded-[10px] flex flex-col self-center justify-between p-3">
        <CardHeader className="p-3 pb-0">
          <CardTitle className="font-semibold text-sm">Running Task</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-xl font-semibold">65</div>
            </div>
          </div>
          <div className="relative w-full h-24">
            <div className="absolute -top-21 left-3/4 transform -translate-x-1/2 flex gap-2 p-2 flex-row justify-center items-center">
              <svg width="64" height="64" viewBox="0 0 80 80" className="flex-shrink-0">
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="transparent"
                  stroke="#374151"
                  strokeWidth="4"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeDasharray="239"
                  strokeDashoffset="131"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div className="absolute inset-7 flex justify-start items-center text-base font-medium">
                45%
              </div>
              <div className="flex flex-col items-end">
                <div className="text-lg font-semibold">100</div>
                <div className="text-xs font-medium text-gray-400">Task</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="hidden md:flex bg-black text-white w-full max-h-53.5 max-w-48.5 flex-col justify-between p-0">
        <CardHeader className="p-5 pb-0">
          <CardTitle className="font-semibold text-base">Running Task</CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-3xl font-semibold">65</div>
            </div>
          </div>
          <div className="flex justify-center items-center pb-4">
            <div className="relative w-20 h-20 flex gap-3 p-3 flex-row justify-center items-center">
              <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="transparent"
                  stroke="#374151"
                  strokeWidth="4"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeDasharray="239"
                  strokeDashoffset="131"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div className="absolute inset-0 flex justify-start items-center text-lg font-medium">
                45%
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xl font-semibold">100</div>
                <div className="text-sm font-medium text-gray-400">Task</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RunningTaskCard;
