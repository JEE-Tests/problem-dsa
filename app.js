import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Code, Play, CheckCircle, XCircle, Loader, Moon, Sun } from 'lucide-react';

const MinimalistBackground = ({ children, isDarkMode }) => (
  <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen py-8 transition-colors duration-300`}>
    <div className="max-w-4xl mx-auto px-4">{children}</div>
  </div>
);

const InfiniteArrayProblem = () => {
  const [code, setCode] = useState(`class Solution {
    public int findPosition(int[] arr, int target) {
        // Write your code here
    }
}
`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorfulText, setColorfulText] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      const colors = ['text-red-400', 'text-green-400', 'text-blue-400', 'text-yellow-400', 'text-purple-400'];
      setColorfulText(code.split('').map((char, index) => (
        <span key={index} className={colors[index % colors.length]}>{char}</span>
      )));
    } else {
      setColorfulText('');
    }
  }, [code, isDarkMode]);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Compiling and running...');

    setTimeout(() => {
      try {
        const result = mockExecute(code);
        setOutput(result);
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
      setIsRunning(false);
    }, 1500);
  };

  const mockExecute = (code) => {
    if (!code.includes('return')) {
      throw new Error('Your code must return a value');
    }

    const testCases = [
      { arr: [1, 2, 3, 4, 5], target: 3, expected: 2 },
      { arr: [1, 2, 3, 4, 5], target: 6, expected: -1 },
      { arr: [1, 3, 5, 7, 9], target: 5, expected: 2 },
    ];

    let output = '';
    for (let i = 0; i < testCases.length; i++) {
      const { arr, target, expected } = testCases[i];
      const passed = Math.random() > 0.5; // Randomly determine if test case passed
      output += `Test Case ${i + 1}:\n`;
      output += `Input: arr = [${arr.join(', ')}], target = ${target}\n`;
      output += `Expected Output: ${expected}\n`;
      output += `Your Output: ${passed ? expected : 'Incorrect'}\n`;
      output += `${passed ? '✅ Passed' : '❌ Failed'}\n\n`;
    }

    return output;
  };

  return (
    <MinimalistBackground isDarkMode={isDarkMode}>
      <div className="space-y-6">
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`${isDarkMode ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-800 hover:bg-gray-700'} text-white font-bold py-2 px-4 rounded transition-colors duration-300`}
          >
            {isDarkMode ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>

        <Card className={`border-l-4 ${isDarkMode ? 'border-blue-400 bg-gray-800 text-white' : 'border-blue-500 bg-white'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              <Code className="mr-2" /> Find Position in Infinite Sorted Array
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Given an infinite sorted array and a target element, find the index of the target element. 
              If not present, return -1. Achieve O(log position) time complexity.
            </p>
            <div className={`${isDarkMode ? 'bg-gray-700 border-blue-400' : 'bg-blue-50 border-blue-200'} border-l-4 p-4 mb-4`}>
              <p className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Example:</p>
              <pre className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} p-2 rounded mt-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                Input: arr = [1, 2, 3, 4, 5, ...], target = 3
                Output: 2
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-l-4 ${isDarkMode ? 'border-green-400 bg-gray-800 text-white' : 'border-green-500 bg-white'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center text-xl ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
              <Code className="mr-2" /> Code Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`font-mono text-sm h-64 mb-4 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-green-400 focus:ring-green-800' : 'bg-white border-gray-200 focus:border-green-500 focus:ring-green-200'} border-2 focus:ring-2`}
            />
            {isDarkMode && (
              <div className="mb-4 font-mono text-sm h-64 overflow-auto">
                {colorfulText}
              </div>
            )}
            <Button 
              onClick={runCode} 
              disabled={isRunning}
              className={`${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2 px-4 rounded transition-colors duration-300`}
            >
              {isRunning ? <Loader className="animate-spin mr-2" /> : <Play className="mr-2" />}
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
          </CardContent>
        </Card>

        <Card className={`border-l-4 ${isDarkMode ? 'border-purple-400 bg-gray-800 text-white' : 'border-purple-500 bg-white'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center text-xl ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>
              <Code className="mr-2" /> Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className={`${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-800 border-gray-200'} p-4 rounded whitespace-pre-wrap border`}>
              {output.split('\n').map((line, index) => (
                <div key={index} className="mb-1">
                  {line.includes('✅ Passed') ? (
                    <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-semibold flex items-center`}>
                      <CheckCircle className="mr-2" size={16} /> {line}
                    </span>
                  ) : line.includes('❌ Failed') ? (
                    <span className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} font-semibold flex items-center`}>
                      <XCircle className="mr-2" size={16} /> {line}
                    </span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </pre>
          </CardContent>
        </Card>
      </div>
    </MinimalistBackground>
  );
};

export default InfiniteArrayProblem;
