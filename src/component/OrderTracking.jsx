import { motion } from 'framer-motion';
import { Package, ShieldAlert, Truck, CheckCircle, ArrowLeft, Clock } from 'lucide-react';

export default function OrderTracking({ orderId = "KK-8942-X9", status = "Processing", onBack }) {
  
  // Define metadata configuration matrix for the four required fulfillment phases
  const steps = [
    { label: 'Pending', desc: 'Order received & securing allocation', icon: Clock },
    { label: 'Processing', desc: 'Vault authentication & quality assurance testing', icon: Package },
    { label: 'Shipped', desc: 'Secure armor courier transit initiated', icon: Truck },
    { label: 'Delivered', desc: 'Consignment successfully signed over', icon: CheckCircle },
  ];

  // Find index arrays to control active styling indicators
  const currentStepIndex = steps.findIndex(step => step.label.toLowerCase() === status.toLowerCase());

  return (
    <div className="bg-[#0A192F] text-white min-h-screen font-sans pb-24">
      {/* Top Utility Header Row */}
      <div className="px-4 py-4 max-w-3xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors py-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Marketplace</span>
        </button>
        <span className="text-xs bg-gray-900 border border-gray-800 text-gray-400 font-mono tracking-wider px-3 py-1 rounded-md">
          Tracking ID: <span className="text-yellow-400 font-semibold">{orderId}</span>
        </span>
      </div>

      {/* Main Container Card */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <div className="bg-gray-900/40 border border-gray-800 p-6 sm:p-10 rounded-2xl shadow-xl">
          
          <div className="mb-8 space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-yellow-500 font-semibold font-mono">Consignment Dispatch Engine</span>
            <h2 className="text-2xl font-serif font-bold tracking-wide">Live Pipeline Tracking</h2>
            <p className="text-sm text-gray-400 font-light font-sans">
              Your item is currently undergoing phase <span className="text-yellow-400 font-medium">{status}</span> optimization.
            </p>
          </div>

          {/* DYNAMIC TIMELINE STEPS ENGINE */}
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 mt-12 pb-4">
            
            {/* Background connecting bar connector (Desktop horizontal) */}
            <div className="hidden md:block absolute top-[22px] left-6 right-6 h-[2px] bg-gray-800 -z-10" />
            
            {/* Background progress indicator highlight layer (Desktop horizontal) */}
            <div 
              className="hidden md:block absolute top-[22px] left-6 h-[2px] bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-1000 -z-10"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 90}%` }}
            />

            {/* Step Mapping Node Blocks */}
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isCompleted = idx <= currentStepIndex;
              const isActive = idx === currentStepIndex;

              return (
                <div 
                  key={step.label} 
                  className="flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-3 flex-1 w-full relative"
                >
                  {/* Outer Core Step Node Indicator Bubble */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-500 relative z-10 ${
                      isActive 
                        ? 'bg-yellow-500 border-yellow-400 text-[#0A192F] shadow-lg shadow-yellow-500/20 ring-4 ring-yellow-500/10'
                        : isCompleted
                        ? 'bg-gray-950 border-yellow-500 text-yellow-500'
                        : 'bg-gray-950 border-gray-800 text-gray-600'
                    }`}
                  >
                    <StepIcon className="w-5 h-5 stroke-[2]" />
                    
                    {/* Active Pulsing Indicator Glow ring */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-xl bg-yellow-400/20 animate-ping -z-10" />
                    )}
                  </motion.div>

                  {/* Text Description Block */}
                  <div className="flex flex-col md:items-center">
                    <h4 className={`text-sm font-serif font-bold transition-colors ${
                      isActive ? 'text-yellow-400' : isCompleted ? 'text-gray-200' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5 max-w-[150px] md:mx-auto hidden sm:block">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Security Assurance Footnote Notice */}
          <div className="mt-12 bg-gray-950/60 border border-gray-800/60 p-4 rounded-xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-yellow-500/60 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-300">Transit Verification Guard</h5>
              <p className="text-xs font-light text-gray-400 leading-relaxed">
                For complete protective custody of delivery networks, transit data coordinates are systematically audited. Delivery dispatch verification checks can be coordinated directly with our concierge dispatch lines.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}