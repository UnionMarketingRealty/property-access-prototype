import { useState, useEffect } from 'react';
import { Property } from '../types/Property';

export const useSavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedProperties');
    if (saved) {
      setSavedProperties(JSON.parse(saved));
    }
  }, []);

  const saveProperty = (property: Property) => {
    const updated = [...savedProperties, property];
    setSavedProperties(updated);
    localStorage.setItem('savedProperties', JSON.stringify(updated));
  };

  const removeSavedProperty = (propertyId: string) => {
    const updated = savedProperties.filter(p => p.id !== propertyId);
    setSavedProperties(updated);
    localStorage.setItem('savedProperties', JSON.stringify(updated));
  };

  const isPropertySaved = (propertyId: string) => {
    return savedProperties.some(p => p.id === propertyId);
  };

  const toggleSavedProperty = (property: Property) => {
    if (isPropertySaved(property.id)) {
      removeSavedProperty(property.id);
    } else {
      saveProperty(property);
    }
  };

  return {
    savedProperties,
    saveProperty,
    removeSavedProperty,
    isPropertySaved,
    toggleSavedProperty
  };
};