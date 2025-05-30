
import React from 'react';
import PortfolioChart from '@/components/portfolio/PortfolioChart';
import PortfolioRisk3D from '@/components/portfolio/PortfolioRisk3D';
import PortfolioSummary from '@/components/portfolio/PortfolioSummary';
import AddAssetModal from '@/components/portfolio/AddAssetModal';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Portfolio Tracker</h1>
          <p className="text-slate-600">Monitor your investments and track performance</p>
        </div>
        
        <div className="space-y-8">
          <PortfolioSummary />
          <PortfolioChart />
          <PortfolioRisk3D />
        </div>
        
        <AddAssetModal />
      </div>
    </div>
  );
};

export default Portfolio;
