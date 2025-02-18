import { useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numAllowed, setNumAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copiedMessage, setCopiedMessage] = useState("") // New state for the copied message

  // Password strength calculation
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*()_+|<>,.?/]/.test(password)) strength += 1;

    return strength;
  };

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?/~"
    
    let charset = lowercase + uppercase
    if (numAllowed) charset += numbers
    if (charAllowed) charset += specialChars

    let generatedPassword = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      generatedPassword += charset[randomIndex]
    }

    setPassword(generatedPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopiedMessage("Password copied!")
        setTimeout(() => setCopiedMessage(""), 2000) // Clear message after 2 seconds
      })
      .catch(() => {
        setCopiedMessage("Failed to copy password!")
        setTimeout(() => setCopiedMessage(""), 2000)
      })
  }

  const clearPassword = () => {
    setPassword("")
  }

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className='bg-gray-800 my-8 mx-auto px-6 py-6 rounded-lg w-full max-w-4xl font-sans'>
      <h1 className='text-white text-center p-6 text-4xl font-semibold'>Password Generator</h1>
      
      <div className='flex items-center shadow-lg overflow-hidden mb-4 rounded-md'>
        <input
          className='text-orange-400 px-4 py-3 w-full text-2xl outline-none rounded-l-md bg-gray-700 focus:ring-2 focus:ring-orange-500'
          type="text"
          value={password}
          placeholder='Your Password'
          readOnly
        />
        <button
          className='outline-none bg-blue-600 text-white px-5 py-3 text-xl hover:bg-blue-500 rounded-r-md focus:ring-2 focus:ring-blue-500'
          onClick={copyToClipboard}
          title="Copy to Clipboard"
        >
          <i className="fas fa-copy"></i> Copy
        </button>
      </div>

      {copiedMessage && (
        <div className="text-green-500 text-center mt-2">{copiedMessage}</div>
      )}
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='flex flex-col'>
          <label className='text-white text-lg'>Length:</label>
          <input 
            type="number" 
            value={length} 
            onChange={(e) => setLength(Number(e.target.value))}
            min={4} 
            max={20} 
            className='mx-2 px-4 py-2 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            title="Password length"
          />
        </div>
        
        <div className='flex items-center'>
          <input
            type="checkbox"
            checked={numAllowed}
            onChange={(e) => setNumAllowed(e.target.checked)}
            className='mr-2'
            title="Include Numbers"
          />
          <label className='text-white text-lg'>Include Numbers</label>
        </div>
        
        <div className='flex items-center'>
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
            className='mr-2'
            title="Include Special Characters"
          />
          <label className='text-white text-lg'>Include Special Characters</label>
        </div>
      </div>

      {/* Password Strength Meter */}
      <div className='mt-4'>
        <label className='text-white text-lg'>Password Strength</label>
        <div className={`h-2 rounded-full mt-2 ${passwordStrength === 4 ? 'bg-green-500' : passwordStrength === 3 ? 'bg-yellow-500' : passwordStrength === 2 ? 'bg-orange-500' : 'bg-red-500'}`} />
      </div>

      {/* Center the lower buttons */}
      <div className='mt-6 flex justify-center space-x-4'>
        <button 
          onClick={generatePassword}
          className='bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-500 transition duration-200'
        >
          Generate Password
        </button>
        <button 
          onClick={clearPassword}
          className='bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-500 transition duration-200'
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default App
