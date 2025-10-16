import React from 'react';
import { 
  Circle, 
  Square, 
  Package, 
  ShoppingCart,
  Search,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

/**
 * ProductIcon component - Professional icon display for products
 * Replaces emojis with clean, professional Lucide React icons
 */
const ProductIcon = ({ icon, size = 24, className = "" }) => {
  const iconMap = {
    milk: Circle,
    cheese: Circle,
    package: Package,
    circle: Circle,
    bowl: Square,
    square: Square,
    hexagon: Circle,
    cart: ShoppingCart,
    search: Search,
    error: AlertCircle,
    success: CheckCircle,
  };

  const IconComponent = iconMap[icon] || Package;

  return (
    <IconComponent 
      size={size} 
      className={`text-gray-600 ${className}`}
      aria-hidden="true"
    />
  );
};

export default ProductIcon;
