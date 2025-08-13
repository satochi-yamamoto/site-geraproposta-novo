import React, { useState } from 'react';
import { X } from 'lucide-react';

export function TagInput({ value = [], onChange, placeholder = "Digite e pressione Enter ou clique fora do campo" }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      const newTag = inputValue.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/20 text-white placeholder-white/60 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <span key={index} className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full px-3 py-1 text-sm">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
