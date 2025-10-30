"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const CalculatorButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={`h-16 w-16 text-xl font-serif rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 ${className}`}
  >
    {children}
  </button>
);

export default function LoginPage() {
  const [displayValue, setDisplayValue] = useState('');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [userPin, setUserPin] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedPin = localStorage.getItem('userPin');
    setUserPin(storedPin);
    if (!storedPin) {
      toast({
        title: "Welcome!",
        description: "Please sign up to set a PIN before logging in.",
      })
    }
  }, [toast]);

  const handleNumberClick = (num: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(num);
      setWaitingForSecondOperand(false);
    } else {
      if (displayValue.length >= 10) return;
      setDisplayValue(prev => (prev === '0' ? num : prev + num));
    }
  };
  
  const handleDecimalClick = () => {
    if (waitingForSecondOperand) {
        setDisplayValue('0.');
        setWaitingForSecondOperand(false);
        return;
    }
    if (!displayValue.includes('.')) {
        setDisplayValue(prev => prev + '.');
    }
  }

  const handleClear = () => {
    setDisplayValue('');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };
  
  const handleBackspace = () => {
    if (waitingForSecondOperand) return;
    setDisplayValue(prev => prev.slice(0, -1) || '');
  };

  const performCalculation = (op1: number, op2: number, currentOperator: string): number => {
    switch (currentOperator) {
      case '+':
        return op1 + op2;
      case '-':
        return op1 - op2;
      case '×':
        return op1 * op2;
      case '÷':
        return op2 !== 0 ? op1 / op2 : Infinity;
      case '%':
        return op1 / 100;
      default:
        return op2;
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (nextOperator === '+/-') {
      setDisplayValue((prev) => (parseFloat(prev) * -1).toString());
      return;
    }

    if (operator && waitingForSecondOperand) {
        setOperator(nextOperator);
        return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(firstOperand, inputValue, operator);
      const resultString = parseFloat(result.toPrecision(10)).toString();
      setDisplayValue(resultString);
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (operator && firstOperand !== null && !waitingForSecondOperand) {
      const secondOperand = parseFloat(displayValue);
      const result = performCalculation(firstOperand, secondOperand, operator);
      const resultString = parseFloat(result.toPrecision(10)).toString();
      setDisplayValue(resultString);
      setFirstOperand(result); // Use result for chained calculations
      setOperator(null);
      setWaitingForSecondOperand(true);
    } else {
      // PIN check logic
      if (!userPin) {
        toast({
          title: "No PIN Set",
          description: "You need to sign up and set a PIN first.",
          variant: "destructive",
        });
        setDisplayValue('');
        return;
      }
      if (displayValue === userPin) {
        router.push('/dashboard');
      } else {
        toast({
          title: "Incorrect PIN",
          description: "The PIN you entered is incorrect.",
          variant: "destructive",
        })
        setDisplayValue('');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-gradient-to-b from-[#EAF6FF] to-white pt-12">
        <div className="w-full max-w-xs p-4 bg-[#F7F7F7] rounded-3xl shadow-lg mt-16">
            <div className="h-20 w-full bg-[#EAEAEA] rounded-2xl mb-4 flex items-center justify-end px-4 text-4xl font-mono text-gray-600 overflow-hidden text-right">
                {displayValue || '0'}
            </div>

            <div className="grid grid-cols-4 gap-3">
                <CalculatorButton onClick={handleClear} className="bg-[#EAEAEA] text-gray-700 hover:bg-gray-300">AC</CalculatorButton>
                <CalculatorButton onClick={handleBackspace} className="bg-[#EAEAEA] text-gray-700 hover:bg-gray-300">CE</CalculatorButton>
                <CalculatorButton onClick={() => handleOperatorClick('%')} className="bg-[#EAEAEA] text-gray-700 hover:bg-gray-300">%</CalculatorButton>
                <CalculatorButton onClick={() => handleOperatorClick('÷')} className="bg-[#BDBDBD] text-white hover:bg-gray-500">÷</CalculatorButton>

                <CalculatorButton onClick={() => handleNumberClick('7')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">7</CalculatorButton>
                <CalculatorButton onClick={() => handleNumberClick('8')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">8</CalculatorButton>
                <CalculatorButton onClick={() => handleNumberClick('9')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">9</CalculatorButton>
                <CalculatorButton onClick={() => handleOperatorClick('×')} className="bg-[#BDBDBD] text-white hover:bg-gray-500">×</CalculatorButton>
                
                <CalculatorButton onClick={() => handleNumberClick('4')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">4</CalculatorButton>
                <CalculatorButton onClick={() => handleNumberClick('5')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">5</CalculatorButton>
                <CalculatorButton onClick={() => handleNumberClick('6')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">6</CalculatorButton>
                <CalculatorButton onClick={() => handleOperatorClick('-')} className="bg-[#BDBDBD] text-white hover:bg-gray-500">-</CalculatorButton>

                <CalculatorButton onClick={() => handleNumberClick('1')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">1</CalculatorButton>
                <CalculatorButton onClick={() => handleNumberClick('2')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">2</CalculatorButton>
                <CalculatorButton onClick={() => handleNumberClick('3')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">3</CalculatorButton>
                <CalculatorButton onClick={() => handleOperatorClick('+')} className="bg-[#BDBDBD] text-white hover:bg-gray-500">+</CalculatorButton>

                <CalculatorButton onClick={() => handleOperatorClick('+/-')} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">+/-</CalculatorButton>
                <CalculatorButton onClick={() => handleNumberClick('0')} className="bg-[#EAEAEA] text-gray-700 hover:bg-gray-300">0</CalculatorButton>
                <CalculatorButton onClick={handleDecimalClick} className="bg-[#E0EFFF] text-gray-700 hover:bg-blue-200">.</CalculatorButton>
                <CalculatorButton onClick={handleEquals} className="bg-[#BDBDBD] text-white hover:bg-gray-500">=</CalculatorButton>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4 font-serif">enter sequence</p>
        </div>
    </div>
  );
}
