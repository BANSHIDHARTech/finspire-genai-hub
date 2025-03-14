
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import Scene3D from '@/components/3d/Scene3D';
import RiskGlobe from '@/components/3d/RiskGlobe';

type RiskLevel = 'low' | 'medium' | 'high';

const PortfolioRisk3D = () => {
  const [riskScore, setRiskScore] = useState(50);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('medium');
  
  const handleRiskChange = (value: number[]) => {
    const newScore = value[0];
    setRiskScore(newScore);
    
    // Determine risk level based on score
    if (newScore < 33) {
      setRiskLevel('low');
    } else if (newScore < 67) {
      setRiskLevel('medium');
    } else {
      setRiskLevel('high');
    }
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Risk Assessment</h2>
            <p className="text-slate-500">Visualize your risk profile</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">Your Risk Score</h3>
              <div className="text-3xl font-bold">{riskScore}/100</div>
              <div className={cn(
                "text-sm font-medium mt-1",
                riskLevel === 'low' ? "text-teal-600" :
                riskLevel === 'medium' ? "text-amber-600" : "text-red-600"
              )}>
                {riskLevel === 'low' ? "Conservative" :
                 riskLevel === 'medium' ? "Balanced" : "Aggressive"}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Adjust Your Risk Tolerance
              </label>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="mb-6"
                onValueChange={handleRiskChange}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Aggressive</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-medium text-slate-800 mb-2">What This Means</h4>
              <p className="text-sm text-slate-600 mb-4">
                {riskLevel === 'low' ? 
                  "You prefer stable, lower-risk investments with consistent returns, even if they grow more slowly." :
                 riskLevel === 'medium' ? 
                  "You balance growth potential with risk protection, accepting some volatility for better long-term returns." :
                  "You prioritize high growth potential and can tolerate significant market fluctuations."}
              </p>
              <Button variant="outline" size="sm" className="w-full">See Recommended Portfolio</Button>
            </div>
          </div>
          
          <div className="h-[400px]">
            <Scene3D 
              showLogo={false} 
              showMascot={false}
              className="w-full h-full rounded-xl bg-slate-50 overflow-hidden"
            >
              <RiskGlobe riskLevel={riskLevel} />
            </Scene3D>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioRisk3D;
