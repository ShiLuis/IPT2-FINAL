import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import CardMedia from '@mui/material/CardMedia'; // Import CardMedia from MUI
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '@mui/material/styles';

// Lucide Icons
import { 
    ChefHat, 
    LayoutDashboard, 
    Users, 
    UtensilsCrossed,
    Settings, 
    LogOut,
    Home,
    Sun,
    Moon
} from 'lucide-react';

const AdminSidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle, handleThemeToggle, isDarkMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logoutAdmin } = useAuth();
    const theme = useTheme();

    const handleLogout = () => {
        logoutAdmin();
        navigate('/login');
    };

    const menuItems = [
        { text: 'Menu Management', icon: <UtensilsCrossed size={20} />, path: '/admin/menu' },
        { text: 'User Management', icon: <Users size={20} />, path: '/admin/users' },
    ];

    const drawer = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit', 
                    }}
                    component={RouterLink}
                    to="/"
                >
                    <CardMedia
                        component="img"
                        image={'/src/assets/Images/3x/LogoWhite.webp'} // Always use white logo for dark sidebar
                        alt="Kahit Saan Logo"
                        sx={{
                            height: { xs: 35, md: 46 },
                            width: 'auto',
                            mr: { xs: 1, md: 1.5 },
                        }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.2 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                fontFamily: 'Open Sans, sans-serif',
                                color: '#fff', // Stays white
                                letterSpacing: '0.03em',
                                fontWeight: 400,
                                fontSize: { xs: '.5rem', md: '.6rem' },
                                ml: 0.3,
                                mb: '-2px',
                                lineHeight: 1.1,
                            }}
                        >
                            Saan tayo kakain?
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontFamily: 'montserrat',
                                fontWeight: 900,
                                fontSize: { xs: '.9rem', md: '1.2rem' },
                                flexGrow: 0,
                                color: '#fff', // Stays white
                                letterSpacing: '0.04em',
                                textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                                lineHeight: 1.1,
                                mt: 0,
                            }}
                        >
                            KAHIT SAAN
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
            <List sx={{ flexGrow: 1, pt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={RouterLink}
                            to={item.path}
                            selected={location.pathname === item.path || (item.path === '/admin/menu' && location.pathname === '/admin')} // Adjust selection logic if needed
                            onClick={mobileOpen ? handleDrawerToggle : null}
                            sx={{
                                minHeight: 48,
                                justifyContent: 'initial',
                                px: 2.5,
                                py: 1.5,
                                borderRadius: '8px', // Rounded items
                                color: location.pathname === item.path ? 'primary.main' : 'common.white',
                                backgroundColor: location.pathname === item.path ? 'rgba(212,175,55,0.15)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(212,175,55,0.1)',
                                    color: 'primary.light', // Lighter gold or white on hover
                                },
                                '&.Mui-selected': { // Ensure selected style overrides hover if needed
                                    color: 'primary.main',
                                    backgroundColor: 'rgba(212,175,55,0.2)',
                                },
                                mb: 0.5, // Space between items
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: 'center', color: 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ fontFamily: 'Open Sans', fontWeight: location.pathname === item.path ? 600 : 400 }}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ flexGrow: 1 }} /> {/* Pushes logout to bottom */}
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mt: 'auto' }} />
            <List sx={{p:1}}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={RouterLink}
                        to="/admin/auth/login"
                        onClick={handleLogout}
                        sx={{
                            minHeight: 48,
                            justifyContent: 'initial',
                            px: 2.5,
                            py: 1.5,
                            borderRadius: '8px',
                            color: 'common.white',
                            '&:hover': {
                                backgroundColor: 'rgba(212,175,55,0.1)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: 'center', color: 'primary.main' }}>
                            <LogOut size={20} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" primaryTypographyProps={{ fontFamily: 'Open Sans' }}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: drawerWidth, 
                    boxSizing: 'border-box',
                    backgroundColor: 'brand.eerieBlack', 
                    borderRight: 'none', 
                },
            }}
            open 
        >
            {drawer}
        </Drawer>
    );
};

export default AdminSidebar;