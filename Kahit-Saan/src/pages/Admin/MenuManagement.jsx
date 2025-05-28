import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Loader2, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Save, 
  AlertCircle, 
  UtensilsCrossed 
} from 'lucide-react';
import Sidebar from '../../assets/components/Sidebar';
import './MenuManagement.css';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    photoUrl: ''
  });

  // Fetch menu items on component mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await api.get('/menu');
      setMenuItems(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items. Please try again.");
      // For development, use sample data if API is not available
      setMenuItems([
        {
          id: 1,
          name: "Tonkatsu Chaofan",
          description: "Japanese-style breaded pork cutlet on a bed of delicious chaofan.",
          price: 90,
          photoUrl: "https://placehold.co/600x400/1A1A1A/D4AF37?text=Tonkatsu+Chaofan",
          category: "Chaofan"
        },
        {
          id: 2,
          name: "Shanghai Chaofan",
          description: "Classic savory fried rice with Shanghai-style spring rolls.",
          price: 75,
          photoUrl: "https://placehold.co/600x400/1A1A1A/D4AF37?text=Shanghai+Chaofan",
          category: "Chaofan"
        },
        {
          id: 3,
          name: "Laksa Noodles",
          description: "Spicy and creamy coconut-based noodle soup, a Southeast Asian delight.",
          price: 170,
          photoUrl: "https://placehold.co/600x400/1A1A1A/D4AF37?text=Laksa+Noodles",
          category: "Noodles"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      photoUrl: ''
    });
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      photoUrl: item.photoUrl || ''
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const closeAllModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
    resetForm();
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/menu', formData);
      setMenuItems([...menuItems, response.data]);
      closeAllModals();
      setError(null);
    } catch (err) {
      console.error("Error adding menu item:", err);
      setError("Failed to add menu item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Updated handleEditItem function
  const handleEditItem = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;
    
    setLoading(true);
    try {
      const response = await api.put(`/menu/${selectedItem._id}`, formData);
      setMenuItems(menuItems.map(item => 
        item._id === selectedItem._id ? response.data : item
      ));
      closeAllModals();
      setError(null);
    } catch (err) {
      console.error("Error updating menu item:", err);
      setError("Failed to update menu item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Updated handleDeleteItem function
  const handleDeleteItem = async () => {
    if (!selectedItem) return;
    
    setLoading(true);
    try {
      await api.delete(`/menu/${selectedItem._id}`);
      setMenuItems(menuItems.filter(item => item._id !== selectedItem._id));
      closeAllModals();
      setError(null);
    } catch (err) {
      console.error("Error deleting menu item:", err);
      setError("Failed to delete menu item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Modal component for form
  const FormModal = ({ isOpen, title, onSubmit, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="font-montserrat font-bold text-xl text-brand-black">{title}</h3>
            <button 
              onClick={closeAllModals}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={onSubmit} className="p-6">
            {children}
            
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeAllModals}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-opensans font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-black text-brand-gold rounded-xl hover:bg-gray-800 font-opensans font-semibold flex items-center"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Confirmation Modal for Delete
  const ConfirmationModal = ({ isOpen, title, message, onConfirm }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="font-montserrat font-bold text-xl text-brand-black">{title}</h3>
            <button 
              onClick={closeAllModals}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6">
            <p className="font-opensans text-gray-700">{message}</p>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeAllModals}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-opensans font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-brand-red text-white rounded-xl hover:bg-red-700 font-opensans font-semibold flex items-center"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Form Fields for Add/Edit Modals
  const FormFields = () => (
    <>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-opensans font-semibold text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-opensans font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-opensans font-semibold text-gray-700 mb-1">
              Price (₱)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-opensans font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Chaofan">Chaofan</option>
              <option value="Noodles">Noodles</option>
              <option value="Rice Meals">Rice Meals</option>
              <option value="Beverages">Beverages</option>
              <option value="Sides">Sides</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="photoUrl" className="block text-sm font-opensans font-semibold text-gray-700 mb-1">
            Photo URL
          </label>
          <input
            type="text"
            id="photoUrl"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
      </div>
    </>
  );

  // Menu Item Card Component
  const MenuItemCard = ({ item }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:shadow-xl">
      <img 
        className="w-full h-48 object-cover" 
        src={item.photoUrl || "https://placehold.co/600x400/1A1A1A/D4AF37?text=No+Image"} 
        alt={item.name} 
        onError={(e) => e.target.src="https://placehold.co/600x400/1A1A1A/D4AF37?text=No+Image"} 
      />
      <div className="p-4">
        <span className="text-xs font-opensans text-brand-gold font-semibold">{item.category}</span>
        <h3 className="font-montserrat text-lg font-bold mt-1 mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 font-opensans mb-4 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-montserrat font-bold text-brand-gold">₱{item.price.toFixed(2)}</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => openEditModal(item)} 
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Edit"
            >
              <Pencil size={18} className="text-gray-600" />
            </button>
            <button 
              onClick={() => openDeleteModal(item)} 
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Delete"
            >
              <Trash2 size={18} className="text-brand-red" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeItem="menu" />
      
      <div className="flex-1">
        <header className="bg-white shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h1 className="font-montserrat font-bold text-2xl text-brand-black">Menu Management</h1>
            <button
              onClick={openAddModal}
              className="bg-brand-black text-brand-gold px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors font-opensans font-semibold flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" /> Add Item
            </button>
          </div>
        </header>
        
        <main className="p-6">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="text-red-500 mr-3" size={20} />
                <p className="text-red-800 font-opensans">{error}</p>
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {loading && !isAddModalOpen && !isEditModalOpen && !isDeleteModalOpen && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-brand-gold animate-spin mb-4" />
              <p className="text-gray-500 font-opensans">Loading menu items...</p>
            </div>
          )}
          
          {/* Empty State */}
          {!loading && menuItems.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <UtensilsCrossed className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="font-montserrat font-semibold text-xl text-gray-800 mb-2">No Menu Items Found</h3>
              <p className="font-opensans text-gray-600 mb-6">Start by adding your first menu item.</p>
              <button
                onClick={openAddModal}
                className="bg-brand-black text-brand-gold px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors font-opensans font-semibold inline-flex items-center"
              >
                <Plus className="mr-2 h-5 w-5" /> Add Item
              </button>
            </div>
          )}
          
          {/* Menu Items Grid */}
          {!loading && menuItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuItems.map(item => (
                <MenuItemCard key={item._id} item={item} />
              ))}
            </div>
          )}
          
          {/* Add Item Modal */}
          <FormModal 
            isOpen={isAddModalOpen} 
            title="Add Menu Item" 
            onSubmit={handleAddItem}
          >
            <FormFields />
          </FormModal>
          
          {/* Edit Item Modal */}
          <FormModal 
            isOpen={isEditModalOpen} 
            title="Edit Menu Item" 
            onSubmit={handleEditItem}
          >
            <FormFields />
          </FormModal>
          
          {/* Delete Confirmation Modal */}
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            title="Delete Menu Item"
            message={`Are you sure you want to delete "${selectedItem?.name}"? This action cannot be undone.`}
            onConfirm={handleDeleteItem}
          />
        </main>
      </div>
    </div>
  );
};

export default MenuManagement;