// src/pages/admin/MenuManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Typography, Button, Grid, CircularProgress, Alert,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Select, MenuItem, FormControl, InputLabel, IconButton, Paper, CardMedia as MuiCardMedia, useTheme,
    CardContent
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
    Plus, Pencil, Trash2, X, Save, UtensilsCrossed, AlertCircle, Image as ImageIcon, Loader2
} from 'lucide-react';

// Import the centralized adminApi and its setAuthToken function
import { adminApi, setAuthToken as setApiAuthToken } from '../../api/adminApi';


const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const theme = useTheme();

    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', photo: null,
    });
    
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setApiAuthToken(token); // Use the imported setAuthToken
        }
        // PrivateRoute should handle redirection if no token
    }, []);


    const fetchMenuItems = useCallback(async () => {
        setLoading(true);
        try {
            // Use adminApi for requests
            const response = await adminApi.get('/menu'); 
            setMenuItems(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching menu items:", err);
            setError(err.response?.data?.message || err.message || "Failed to load menu items. Ensure backend is running and API is accessible.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMenuItems();
    }, [fetchMenuItems]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (files && files[0]) {
                setFormData(prev => ({ ...prev, photo: files[0] }));
                setPhotoPreview(URL.createObjectURL(files[0]));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || '' : value }));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: '', category: '', photo: null });
        setPhotoPreview(null);
        const fileInput = document.getElementById('menu-item-photo-upload');
        if (fileInput) fileInput.value = null;
    };

    const handleOpenAddModal = () => {
        setEditingItem(null);
        resetForm();
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category || '',
            photo: null, // Will only be set if a new file is chosen
        });
        setPhotoPreview(item.photo?.url || null); // Show existing image
        setIsFormModalOpen(true);
    };

    const handleOpenDeleteModal = (item) => {
        setEditingItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsFormModalOpen(false);
        setIsDeleteModalOpen(false);
        setEditingItem(null);
        if (photoPreview && (!editingItem || !editingItem.photo?.url || formData.photo)) { // Revoke if it's a new blob URL
           if(photoPreview.startsWith('blob:')){ URL.revokeObjectURL(photoPreview);}
        }
        resetForm();
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setError(null);

        const submissionData = new FormData();
        submissionData.append('name', formData.name);
        submissionData.append('description', formData.description);
        submissionData.append('price', formData.price);
        submissionData.append('category', formData.category);
        if (formData.photo) {
            submissionData.append('photo', formData.photo);
        }
        
        try {
            if (editingItem) { // Edit mode
                // Use adminApi for requests
                await adminApi.put(`/menu/${editingItem._id}`, submissionData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else { // Add mode
                // Use adminApi for requests
                await adminApi.post('/menu', submissionData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            fetchMenuItems(); 
            handleCloseModals();
        } catch (err) {
            console.error("Error saving menu item:", err.response || err);
            setError(err.response?.data?.message || "Failed to save menu item.");
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!editingItem) return;
        setFormLoading(true);
        setError(null);
        try {
            // Use adminApi for requests
            await adminApi.delete(`/menu/${editingItem._id}`);
            fetchMenuItems(); 
            handleCloseModals();
        } catch (err) {
            console.error("Error deleting menu item:", err);
            setError(err.response?.data?.message || "Failed to delete menu item.");
        } finally {
            setFormLoading(false);
        }
    };

    const FormFieldsComponent = ( // Renamed to avoid conflict
        <Box component="form" onSubmit={handleSubmitForm} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth required label="Name" name="name" value={formData.name} onChange={handleInputChange} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth required multiline rows={3} label="Description" name="description" value={formData.description} onChange={handleInputChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth required type="number" label="Price (₱)" name="price" value={formData.price} onChange={handleInputChange} variant="outlined" inputProps={{ min: 0, step: "0.01" }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required variant="outlined">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select labelId="category-label" label="Category" name="category" value={formData.category} onChange={handleInputChange}>
                            <MenuItem value="" disabled><em>Select a category</em></MenuItem>
                            <MenuItem value="Chaofan">Chaofan</MenuItem>
                            <MenuItem value="Noodles">Noodles</MenuItem>
                            <MenuItem value="Rice Meals">Rice Meals</MenuItem>
                            <MenuItem value="Beverages">Beverages</MenuItem>
                            <MenuItem value="Sides">Sides</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" component="label" fullWidth startIcon={<ImageIcon />}
                        sx={{
                            borderColor: 'primary.main', color: 'primary.main',
                            '&:hover': { borderColor: 'primary.dark', backgroundColor: alpha(theme.palette.primary.main, 0.08) }
                        }}
                    >
                        {formData.photo ? 'Change Image' : 'Upload Image'}
                        <input type="file" id="menu-item-photo-upload" name="photo" hidden accept="image/*" onChange={handleInputChange} />
                    </Button>
                    {photoPreview && (
                        <Box mt={2} textAlign="center">
                            <Typography variant="caption" display="block" gutterBottom>Image Preview:</Typography>
                            <img src={photoPreview} alt="Preview" style={{ maxHeight: '150px', maxWidth: '100%', borderRadius: '4px', border: `1px solid ${theme.palette.divider}` }} />
                        </Box>
                    )}
                </Grid>
            </Grid>
            {/* Buttons are in DialogActions */}
        </Box>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>
                    Menu Management
                </Typography>
                <Button variant="contained" color="primary" startIcon={<Plus />} onClick={handleOpenAddModal} sx={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                    Add Item
                </Button>
            </Box>

            {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>{error}</Alert>}

            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress color="primary" /></Box>}
            
            {!loading && menuItems.length === 0 && !error && (
                <Paper sx={{ textAlign: 'center', py: 6, backgroundColor: 'background.paper' }}>
                    <UtensilsCrossed style={{ fontSize: 60, color: theme.palette.text.secondary, marginBottom: theme.spacing(2) }} />
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>No Menu Items Yet</Typography>
                    <Typography variant="body1" sx={{ color: 'text.disabled', mb: 2 }}>Click "Add Item" to get started.</Typography>
                    <Button variant="outlined" color="primary" startIcon={<Plus />} onClick={handleOpenAddModal}>Add First Item</Button>
                </Paper>
            )}

            {!loading && menuItems.length > 0 && (
                <Grid container spacing={3}>
                    {menuItems.map(item => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                            <Paper elevation={2} sx={{ 
                                display: 'flex', flexDirection: 'column', height: '100%', 
                                backgroundColor: 'background.paper', // Dark paper
                                borderRadius: '12px', overflow: 'hidden'
                            }}>
                                <MuiCardMedia
                                    component="img"
                                    height="180"
                                    image={item.photo?.url || `https://placehold.co/600x400/${theme.palette.brand.eerieBlack.substring(1)}/${theme.palette.primary.main.substring(1)}?text=${encodeURIComponent(item.name)}`}
                                    alt={item.name}
                                    onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/600x400/333333/D4AF37?text=Img+Error`; }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                    <Typography variant="caption" sx={{color: 'primary.main', fontWeight:600}}>{item.category}</Typography>
                                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', fontFamily: 'Montserrat', mt:0.5, mb:1, color: 'text.primary' }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '3.6em', overflow: 'hidden', WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                                        {item.description}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', fontFamily: 'Montserrat' }}>
                                        ₱{typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end', borderTop: `1px solid ${theme.palette.divider}`}}>
                                    <IconButton size="small" onClick={() => handleOpenEditModal(item)} sx={{color: 'text.secondary', '&:hover': {color: 'primary.main'}}} aria-label="edit">
                                        <Pencil size={18} />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => handleOpenDeleteModal(item)} sx={{color: 'error.light', '&:hover': {color: 'error.main'}}} aria-label="delete">
                                        <Trash2 size={18} />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Add/Edit Form Modal */}
            <Dialog open={isFormModalOpen} onClose={handleCloseModals} PaperProps={{sx: {borderRadius: '12px', backgroundColor: 'background.paper'}}}>
                <DialogTitle sx={{fontFamily: 'Montserrat', fontWeight: 'bold', color: 'text.primary', borderBottom: `1px solid ${theme.palette.divider}`}}>
                    {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                    <IconButton aria-label="close" onClick={handleCloseModals} sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> <X /> </IconButton>
                </DialogTitle>
                <DialogContent sx={{pt: '20px !important'}}> {/* Add padding top if title has border */}
                    {FormFieldsComponent}
                </DialogContent>
                <DialogActions sx={{p: '16px 24px', borderTop: `1px solid ${theme.palette.divider}`}}>
                    <Button onClick={handleCloseModals} color="inherit" variant="outlined" sx={{fontFamily: 'Open Sans', fontWeight:600}}>Cancel</Button>
                    <Button onClick={handleSubmitForm} variant="contained" color="primary" disabled={formLoading} startIcon={formLoading ? <CircularProgress size={16} color="inherit"/> : <Save size={18}/>} sx={{fontFamily: 'Open Sans', fontWeight:600}}>
                        {formLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onClose={handleCloseModals} PaperProps={{sx: {borderRadius: '12px', backgroundColor: 'background.paper'}}}>
                <DialogTitle sx={{fontFamily: 'Montserrat', fontWeight: 'bold', color: 'text.primary'}}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color: 'text.secondary'}}>
                        Are you sure you want to delete "{editingItem?.name || 'this item'}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{p: '16px 24px'}}>
                    <Button onClick={handleCloseModals} color="inherit" variant="outlined" sx={{fontFamily: 'Open Sans', fontWeight:600}}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="error" disabled={formLoading} startIcon={formLoading ? <CircularProgress size={16} color="inherit"/> : <Trash2 size={18}/>} sx={{fontFamily: 'Open Sans', fontWeight:600}}>
                        {formLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MenuManagement;