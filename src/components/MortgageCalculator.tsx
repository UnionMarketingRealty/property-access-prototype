import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(160000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, amortization]);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = amortization * 12;

    if (principal <= 0 || monthlyRate <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      return;
    }

    const monthlyPaymentCalc = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalInterestCalc = (monthlyPaymentCalc * numberOfPayments) - principal;

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalInterest(totalInterestCalc);
  };

  const downPaymentPercentage = (downPayment / homePrice) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Mortgage Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Price (CAD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment (CAD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {downPaymentPercentage.toFixed(1)}% of home price
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amortization (Years)
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={amortization}
                onChange={(e) => setAmortization(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={15}>15 years</option>
                <option value={20}>20 years</option>
                <option value={25}>25 years</option>
                <option value={30}>30 years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Monthly Payment</h4>
            <p className="text-3xl font-bold text-blue-600">
              ${monthlyPayment.toLocaleString('en-CA', { maximumFractionDigits: 0 })} CAD
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-700 mb-1">Mortgage Amount</h5>
              <p className="text-xl font-semibold text-gray-900">
                ${(homePrice - downPayment).toLocaleString('en-CA')}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-700 mb-1">Total Interest</h5>
              <p className="text-xl font-semibold text-gray-900">
                ${totalInterest.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h5 className="text-sm font-medium text-orange-800 mb-2">Payment Breakdown</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Principal & Interest:</span>
                <span className="font-medium">${monthlyPayment.toLocaleString('en-CA', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property Tax (est.):</span>
                <span className="font-medium">${Math.round(homePrice * 0.012 / 12).toLocaleString('en-CA')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Home Insurance (est.):</span>
                <span className="font-medium">${Math.round(homePrice * 0.003 / 12).toLocaleString('en-CA')}</span>
              </div>
              <div className="border-t border-orange-200 pt-2 flex justify-between font-semibold">
                <span>Total Monthly Cost:</span>
                <span>${(monthlyPayment + (homePrice * 0.015 / 12)).toLocaleString('en-CA', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            * Estimates include property tax (1.2%) and home insurance (0.3%) based on home value. 
            Actual costs may vary. Consult with a mortgage professional for accurate rates.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;