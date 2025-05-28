// src/pages/admin/AdminUserManagementPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Typography, Button, Grid, CircularProgress, Alert,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Select, MenuItem, FormControl, InputLabel, IconButton, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme
} from '@mui/material';
import { Edit, Trash2, UserPlus, X, Save } from 'lucide-react';
import { People } from '@mui/icons-material'; // Import People icon
import { alpha } from '@mui/material/styles'; // Import alpha

// Use the centralized API functions
import { getUsers, createUser, updateUser, deleteUser, setAuthToken as setApiAuthToken } from '../../api/adminApi';

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null for Add, user object for Edit
  const theme = useTheme();

  const [formData, setFormData] = useState({
    username: '', password: '', role: 'staff', // Default role
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setApiAuthToken(token); // Set token for the shared adminApi instance
    }
    // else: Handled by PrivateRoute
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch users.');
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ username: '', password: '', role: 'staff' });
  };

  const handleOpenAddModal = () => {
    setEditingUser(null);
    resetForm();
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '', // Password field is for new password only
      role: user.role,
    });
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (user) => {
    setEditingUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingUser(null);
    resetForm();
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

    const dataToSubmit = { ...formData };
    if (editingUser && !formData.password) { // If editing and password is empty, don't send it
        delete dataToSubmit.password;
    }
    if (!editingUser && !formData.password) { // If adding and password is empty
        setError("Password is required for new users.");
        setFormLoading(false);
        return;
    }


    try {
      if (editingUser) {
        await updateUser(editingUser._id, dataToSubmit);
      } else {
        await createUser(dataToSubmit);
      }
      fetchUsers();
      handleCloseModals();
    } catch (err) {
      console.error("Error saving user:", err.response || err);
      setError(err.response?.data?.message || "Failed to save user.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!editingUser) return;
    setFormLoading(true);
    setError(null);
    try {
      await deleteUser(editingUser._id);
      fetchUsers();
      handleCloseModals();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.response?.data?.message || "Failed to delete user.");
    } finally {
      setFormLoading(false);
    }
  };

  const UserFormFields = (
    <Box component="form" onSubmit={handleSubmitForm} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth required label="Username" name="username" value={formData.username} onChange={handleInputChange} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth type="password" label={editingUser ? "New Password (optional)" : "Password"} name="password" value={formData.password} onChange={handleInputChange} variant="outlined" helperText={editingUser ? "Leave blank to keep current password" : ""} required={!editingUser} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required variant="outlined">
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" label="Role" name="role" value={formData.role} onChange={handleInputChange}>
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: 'text.primary' }}>
          User Management
        </Typography>
        <Button
          variant="contained"
          color="primary" // Gold button
          startIcon={<UserPlus size={18} />}
          onClick={handleOpenAddModal}
          sx={{ fontFamily: 'Open Sans', fontWeight: 600 }}
        >
          Add User
        </Button>
      </Box>

      {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>{error}</Alert>}
      
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress color="primary" /></Box>}

      {!loading && users.length === 0 && !error && (
        <Paper sx={{ textAlign: 'center', py: 6, backgroundColor: 'background.paper' }}>
            <People sx={{ fontSize: 60, color: theme.palette.text.secondary, marginBottom: theme.spacing(2) }} />
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>No Users Found</Typography>
            <Typography variant="body1" sx={{ color: 'text.disabled', mb: 2 }}>Click "Add User" to create the first admin/staff account.</Typography>
            <Button variant="outlined" color="primary" startIcon={<UserPlus />} onClick={handleOpenAddModal}>Add First User</Button>
        </Paper>
      )}

      {!loading && users.length > 0 && (
        <TableContainer component={Paper} sx={{ borderRadius: '12px', backgroundColor: 'background.paper' }}>
          <Table sx={{ minWidth: 650 }} aria-label="user management table">
            <TableHead sx={{ backgroundColor: alpha(theme.palette.common.white, 0.05) }}>
              <TableRow>
                <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 600, color: 'text.secondary' }}>Username</TableCell>
                <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 600, color: 'text.secondary' }}>Role</TableCell>
                <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 600, color: 'text.secondary' }}>Created At</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'Montserrat', fontWeight: 600, color: 'text.secondary' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.03)} }}>
                  <TableCell component="th" scope="row" sx={{ fontFamily: 'Open Sans', color: 'text.primary' }}>{user.username}</TableCell>
                  <TableCell sx={{ fontFamily: 'Open Sans' }}>
                    <Typography variant="body2" component="span"
                        sx={{
                            bgcolor: user.role === 'admin' ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.info?.main || theme.palette.primary.light, 0.2),
                            color: user.role === 'admin' ? 'primary.main' : (theme.palette.info?.contrastText || theme.palette.text.primary),
                            px: 1.5, py: 0.5, borderRadius: '6px', fontWeight: 500, display: 'inline-block'
                        }}>
                        {user.role}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Open Sans', color: 'text.secondary' }}>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenEditModal(user)} sx={{ mr: 0.5, color: 'text.secondary', '&:hover': { color: 'primary.main' } }} aria-label={`Edit user ${user.username}`}>
                      <Edit size={18} />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleOpenDeleteModal(user)} sx={{ color: 'error.light', '&:hover': { color: 'error.main' } }} aria-label={`Delete user ${user.username}`}>
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit User Modal */}
      <Dialog open={isFormModalOpen} onClose={handleCloseModals} PaperProps={{sx: {borderRadius: '12px', backgroundColor: 'background.paper'}}}>
        <DialogTitle sx={{fontFamily: 'Montserrat', fontWeight: 'bold', color: 'text.primary', borderBottom: `1px solid ${theme.palette.divider}`}}>
          {editingUser ? 'Edit User' : 'Add New User'}
          <IconButton aria-label="close" onClick={handleCloseModals} sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}> <X /> </IconButton>
        </DialogTitle>
        <DialogContent sx={{pt: '20px !important'}}>
            {UserFormFields}
        </DialogContent>
        <DialogActions sx={{p: '16px 24px', borderTop: `1px solid ${theme.palette.divider}`}}>
            <Button onClick={handleCloseModals} color="inherit" variant="outlined" sx={{fontFamily: 'Open Sans', fontWeight:600}}>Cancel</Button>
            <Button onClick={handleSubmitForm} variant="contained" color="primary" disabled={formLoading} startIcon={formLoading ? <CircularProgress size={16} color="inherit"/> : <Save size={18}/>} sx={{fontFamily: 'Open Sans', fontWeight:600}}>
                {formLoading ? 'Saving...' : 'Save User'}
            </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onClose={handleCloseModals} PaperProps={{sx: {borderRadius: '12px', backgroundColor: 'background.paper'}}}>
        <DialogTitle sx={{fontFamily: 'Montserrat', fontWeight: 'bold', color: 'text.primary'}}>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText sx={{color: 'text.secondary'}}>
                Are you sure you want to delete user "{editingUser?.username || 'this user'}"? This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{p: '16px 24px'}}>
            <Button onClick={handleCloseModals} color="inherit" variant="outlined" sx={{fontFamily: 'Open Sans', fontWeight:600}}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} variant="contained" color="error" disabled={formLoading} startIcon={formLoading ? <CircularProgress size={16} color="inherit"/> : <Trash2 size={18}/>} sx={{fontFamily: 'Open Sans', fontWeight:600}}>
                {formLoading ? 'Deleting...' : 'Delete User'}
            </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AdminUserManagementPage;