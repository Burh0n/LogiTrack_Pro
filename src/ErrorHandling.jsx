// ErrorHandling.js
import React, { useState, useEffect } from 'react';

// Custom hook for form validation and error handling
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Validate a single field
  const validateField = (name, value) => {
    const fieldRules = validationRules[name];
    if (!fieldRules) return '';

    for (const rule of fieldRules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return '';
  };

  // Validate all fields
  const validateAllFields = () => {
    const newErrors = {};
    let formIsValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });

    // Live validation as user types
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle form submission
  const handleSubmit = async (callback) => {
    setIsSubmitting(true);
    const isValid = validateAllFields();

    if (isValid) {
      try {
        await callback(values);
      } catch (error) {
        console.error("Form submission error:", error);
        // Toast notification is now handled in the component
      }
    }
    setIsSubmitting(false);
  };

  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isValid,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues
  };
};

// API error handling wrapper
export const apiRequest = async (requestFn, errorMsg = "API request failed") => {
  try {
    const response = await requestFn();
    
    if (!response.ok) {
      // Try to parse error message from response
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        throw new Error(`${errorMsg}: ${response.status} ${response.statusText}`);
      }
      
      throw new Error(errorData.message || `${errorMsg}: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Error boundary component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to your error monitoring service
    console.error("Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 rounded-lg bg-red-50 border border-red-300">
          <h2 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-4">
            {this.state.error && this.state.error.toString()}
          </p>
          <button 
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Form field component with error display
export const FormField = ({ label, name, type = "text", value, onChange, error, ...props }) => {
  return (
    <div className="form-field mb-3">
      {label && <label className="block mb-1 font-medium" htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Dropdown field with autocomplete and error handling
export const DropdownField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  loading, 
  error, 
  placeholder,
  onSelect,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  
  // Update search term when value changes from outside
  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (onChange) onChange(e);
  };
  
  const handleOptionSelect = (option) => {
    setSearchTerm(option.label);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };
  
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.dropdown-field')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className="dropdown-field mb-3 relative">
      {label && <label className="block mb-1 font-medium" htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />
      
      {isOpen && (
        <div className="dropdown absolute w-full border border-gray-300 bg-white rounded-lg mt-1 z-10 shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-2 text-center text-gray-500">Loading...</div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div 
                key={index} 
                className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">No options found</div>
          )}
        </div>
      )}
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Common validation rules
export const validationRules = {
  required: (value) => {
    return value && value.trim() !== '' ? '' : 'This field is required';
  },
  minLength: (min) => (value) => {
    return value && value.length >= min ? '' : `Must be at least ${min} characters`;
  },
  validDate: (value) => {
    if (!value) return '';
    const date = new Date(value);
    return isNaN(date.getTime()) ? 'Invalid date format' : '';
  },
  validEmail: (value) => {
    if (!value) return '';
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value) ? '' : 'Invalid email format';
  }
};