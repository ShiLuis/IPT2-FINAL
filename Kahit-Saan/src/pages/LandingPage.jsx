import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import {
    MapPin, Phone, Mail, Facebook, Instagram, Twitter, ChefHat,
    UtensilsCrossed, ScrollText, Menu as MenuIconLucide, X as CloseIconLucide
} from 'lucide-react';
import {
    AppBar, Toolbar, Typography, Button, IconButton, Container, Box, Grid,
    Card, CardMedia, CardContent, CircularProgress, Alert, Link as MuiLink, Drawer,
    List, ListItem, ListItemButton, ListItemText, Paper, useTheme, useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';

// Ensure Kaushan Script is loaded (e.g., via @fontsource/kaushan-script and import in main.jsx, or a link in index.html)

const LandingPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const fetchPublicMenuItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/menu'); // User confirmed port 5000
                setMenuItems(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching menu items for landing page:", err);
                setError(err.response?.data?.message || err.message || "Network Error: Failed to load menu. Please check server and network.");
            } finally {
                setLoading(false);
            }
        };
        fetchPublicMenuItems();
    }, []);

    const scrollToSection = (sectionId) => {
        setIsMobileMenuOpen(false);
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = document.querySelector('header.MuiAppBar-root')?.offsetHeight || (isMobile ? 64 : 80);
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
        }
    };
    
    const AdminLoginMuiButton = ({ isMobileView = false }) => (
        <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/login"
            sx={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: 600,
                fontSize: '0.875rem',
                ...(isMobileView ? { width: 'calc(100% - 32px)', my: 2, mx: 2, py: 1.5 } : { ml: 2 })
            }}
        >
            Admin Login
        </Button>
    );

    const mobileMenuDrawer = (
        <Drawer
            anchor="right"
            open={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            PaperProps={{sx: {width: '260px', backgroundColor: 'background.default' /* Eerie Black */ }}}
        >
            <Box sx={{ width: 260, p:2, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
                <Box sx={{display: 'flex', justifyContent: 'flex-end', mb:1}}>
                    <IconButton onClick={() => setIsMobileMenuOpen(false)} sx={{color: 'text.secondary'}}>
                        <CloseIconLucide />
                    </IconButton>
                </Box>
                <List>
                    {[{id:'menu', label:'Menu'}, {id:'about', label:'About'}, {id:'location', label:'Location'}, {id:'contact', label:'Contact'}].map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton onClick={() => {scrollToSection(item.id); setIsMobileMenuOpen(false);}}>
                                <ListItemText 
                                    primary={item.label.toUpperCase()}
                                    primaryTypographyProps={{ sx: { ...theme.typography.button, color: 'text.primary', textAlign: 'center'} }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{mt: 'auto', pb:1}}> <AdminLoginMuiButton isMobileView={true} /> </Box>
            </Box>
        </Drawer>
    );

    const LogoAndBrandName = () => (
         <Box 
            component="a" href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none', color: 'text.primary' }}
        >
            <ChefHat sx={{ color: 'primary.main', mr: 1, fontSize: {xs:28, md:32} }} />
            <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>
                <Typography component="span" sx={{ fontFamily: 'Kaushan Script', color: 'primary.main', fontSize: '1.6em', lineHeight: 1, position: 'relative', top: '0.1em'}}>Kahit</Typography>
                <Typography component="span" sx={{letterSpacing: '0.05em'}}> Saan</Typography>
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ backgroundColor: 'background.default', color: 'text.primary' }}> 
            <AppBar position="fixed" component="header" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}`}}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ height: {xs: 64, md: 80} }}>
                        <LogoAndBrandName />
                        <Box sx={{ flexGrow: 1 }} />
                        {isMobile ? (
                            <IconButton size="large" edge="end" color="inherit" aria-label="open drawer" onClick={() => setIsMobileMenuOpen(true)}>
                                <MenuIconLucide />
                            </IconButton>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button variant="text" onClick={() => scrollToSection('menu')}>MENU</Button>
                                <Button variant="text" onClick={() => scrollToSection('about')}>ABOUT</Button>
                                <Button variant="text" onClick={() => scrollToSection('location')}>LOCATION</Button>
                                <Button variant="text" onClick={() => scrollToSection('contact')}>CONTACT</Button>
                                <AdminLoginMuiButton />
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            {mobileMenuDrawer}

            {/* Hero Section */}
            <Box id="hero" component="section" sx={{
                minHeight: '100vh', backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80')",
                backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center',
                justifyContent: 'center', position: 'relative', pt: {xs: '64px', md: '80px'} 
            }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundColor: alpha(theme.palette.brand.eerieBlack, 0.8) }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: 6 }}>
                    <Typography variant="h1" component="h1" sx={{ color: 'brand.customWhite', mb: 1, fontSize: {xs: '2.5rem', sm: '3.5rem', md: '4.5rem'} }}>
                        Welcome to
                    </Typography>
                    <Typography variant="h1" component="span" sx={{ fontFamily: 'Kaushan Script', color: 'primary.main', display: 'block', fontSize: {xs: '3rem', sm: '4.5rem', md: '5.5rem'}, lineHeight: 1.1 }}>
                        Kahit Saan
                    </Typography>
                    <Typography variant="h5" component="p" sx={{ color: alpha(theme.palette.brand.customWhite, 0.9), mt: 3, maxWidth: '700px', mx: 'auto', fontFamily: 'Open Sans', fontSize: {xs: '1rem', md: '1.25rem'} }}>
                        Your Everyday Delicious, Anywhere in Nueva Vizcaya! Craving Comfort? Kahit Saan Delivers!
                    </Typography>
                    <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('menu')} endIcon={<UtensilsCrossed size={20} />}
                        sx={{ mt: 5, py: 1.5, px: 5, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: {xs: '0.9rem', md: '1.1rem'} }}
                    > View Our Menu </Button>
                </Container>
            </Box>

            <Box component="main">
                {/* Menu Section - background.default to match page, Card background also default to blend */}
                <Box id="menu" component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.default' }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                            <ScrollText style={{ margin: '0 auto 16px auto', height: 48, width: 48, color: theme.palette.primary.main }} />
                            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}> Our Delicious Menu </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: '600px', mx: 'auto' }}>
                                Freshly prepared, full of flavor, and always satisfying.
                            </Typography>
                        </Box>
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                                <CircularProgress color="primary" />
                            </Box>
                        )}
                        {error && (
                            <Alert severity="error" sx={{ my: 2 }}>
                                {error}
                            </Alert>
                        )}
                            {!loading && !error && menuItems.length > 0 && (
                                <Grid container spacing={5} justifyContent="center">
                                    {menuItems.map((item) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={item._id || item.name}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                mb: 2,
                                            }}
                                        >
                                            {/* Outer Box for Gold Border and Gap */}
                                            <Box
                                                sx={{
                                                    width: '166px', // 150px (image) + 2*3px (gap) + 2*5px (border)
                                                    height: '166px',
                                                    borderRadius: '50%',
                                                    border: `5px solid ${theme.palette.primary.main}`, // 5px Gold border
                                                    boxSizing: 'border-box',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    // The padding creates the visual gap. Its background will be the parent's background.
                                                    // Since the parent <Box id="menu"...> is eerieBlack, this padding area will be eerieBlack.
                                                    padding: '3px', // This creates the 3px gap between border and image
                                                    backgroundColor: theme.palette.background.default, // Ensure the gap area is Eerie Black
                                                }}
                                            >
                                                {/* Inner Circular Image */}
                                                <CardMedia
                                                    component="img"
                                                    image={item.photo?.url || `https://placehold.co/150x150/${theme.palette.brand.eerieBlack.substring(1)}/${theme.palette.primary.main.substring(1)}?text=${encodeURIComponent(item.name)}`}
                                                    alt={item.name}
                                                    onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/150x150/333333/D4AF37?text=Image+Error`; }}
                                                    sx={{
                                                        width: '150px', // Image size
                                                        height: '150px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </Box>

                                            {/* Item Name */}
                                            <Typography
                                                variant="h3"
                                                component="h3"
                                                sx={{
                                                    color: 'primary.main',
                                                    fontWeight: 700,
                                                    mt: 2.5,
                                                    mb: 0.5,
                                                    fontSize: '1.5rem', // 24px (Style Guide H3)
                                                    fontFamily: 'Montserrat, sans-serif',
                                                }}
                                            >
                                                {item.name}
                                            </Typography>

                                            {/* Item Description */}
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: 'text.primary',
                                                    mb: 1.5,
                                                    minHeight: { xs: '3.2em', md:'3.2em' },
                                                    lineHeight: '1.6em',
                                                    overflow: 'hidden', textOverflow: 'ellipsis',
                                                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                                                    px: 1,
                                                    maxWidth: '280px',
                                                    fontSize: '1rem', // 16px (Style Guide P)
                                                    fontFamily: '"Open Sans", sans-serif',
                                                }}
                                            >
                                                {item.description}
                                            </Typography>

                                            {/* Item Price */}
                                            <Typography
                                                sx={{
                                                    typography: 'priceText', // Uses theme.typography.priceText
                                                }}
                                            >
                                                ₱{typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}

                        {/* ... No items message ... */}
                    </Container>
                </Box>

                {/* About Section - background.default */}
                <Box id="about" component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.default' }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                            <ChefHat style={{ margin: '0 auto 16px auto', height: 48, width: 48, color: theme.palette.primary.main }} />
                            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, fontSize: '0.9rem', display:'block' }}>Our Story</Typography>
                            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mt: 1 }}>
                                The Heart of Kahit Saan
                            </Typography>
                        </Box>
                        <Container maxWidth="md">
                             <Paper elevation={0} sx={{ p: {xs:3, md:4}, borderRadius: '12px', backgroundColor: alpha(theme.palette.common.white, 0.03) /* Very subtle dark paper */ }}>
                                <Typography variant="body1" sx={{ textAlign: 'justify', mb: 4, fontSize: {xs: '0.95rem', md: '1.05rem'}, lineHeight: 1.7 }}>
                                    Kahit Saan began with a simple yet passionate vision...
                                </Typography>
                                <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', mt: {xs:4, md:5}, mb: 2, textAlign: {xs: 'left', sm:'center'} }}>
                                    Our Mission
                                </Typography>
                                <Typography variant="body1" sx={{ textAlign: 'justify', fontSize: {xs: '0.95rem', md: '1.05rem'}, lineHeight: 1.7 }}>
                                    To be the cherished culinary destination in Nueva Vizcaya...
                                </Typography>
                            </Paper>
                        </Container>
                    </Container>
                </Box>

                {/* Location Section - background.default */}
                <Box id="location" component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.default' }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                            <MapPin style={{ margin: '0 auto 16px auto', height: 48, width: 48, color: theme.palette.primary.main }} />
                            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
                                Find Us & Get In Touch
                            </Typography>
                             <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: '600px', mx: 'auto' }}>
                                We're conveniently located in Bayombong. Come visit or give us a call!
                            </Typography>
                        </Box>
                        <Grid container spacing={5} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} sx={{ p: {xs: 3, sm:4}, borderRadius: '12px', backgroundColor: alpha(theme.palette.common.white, 0.03) /* Subtle dark paper */}}>
                                    <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2.5, fontFamily: 'Montserrat' }}>Kahit Saan Restaurant</Typography>
                                    {/* ... rest of location details ... */}
                                     <Typography variant="body1" component="address" sx={{ fontStyle: 'normal', color: 'text.secondary', mb: 3 }}>
                                        Purok 5, Barangay Don Mariano Perez,<br />
                                        Bayombong, 3700 Nueva Vizcaya, Philippines
                                    </Typography>
                                    <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold', mt: 3, mb: 1, fontFamily: 'Montserrat' }}>Operating Hours:</Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>Monday - Sunday: 10:00 AM - 8:00 PM</Typography>

                                    <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold', mb: 1.5, fontFamily: 'Montserrat' }}>Contact Details:</Typography>
                                    <Box>
                                        <MuiLink href="tel:+63781234567" /* ... styles ... */ >
                                            <Phone sx={{ color: 'primary.main', mr: 1.5, fontSize: 20 }} /> (078) 123-4567 (Sample)
                                        </MuiLink>
                                        <MuiLink href="mailto:info@kahitsaanresto.com" /* ... styles ... */ >
                                            <Mail sx={{ color: 'primary.main', mr: 1.5, fontSize: 20 }} /> info@kahitsaanresto.com (Sample)
                                        </MuiLink>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}> {/* ... map ... */} </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Contact/Social Section */}
                <Box id="contact" component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.default' }}>
                    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
                            Connect With Us
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, mb:5, maxWidth: '700px', mx: 'auto' }}>
                            Follow us on social media for the latest updates, promotions, and a peek into our delicious world!
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: {xs: 2.5, sm: 4} }}>
                            {[Facebook, Instagram, Twitter].map((SocialIcon, index) => (
                                <IconButton
                                    key={index} component="a" href="#" target="_blank" rel="noopener noreferrer"
                                    aria-label={`${SocialIcon.name || 'Social Media'} link`}
                                    sx={{ 
                                        color: 'text.secondary', p:1.5, border: `1px solid ${theme.palette.divider}`,
                                        transition: 'color 0.3s, transform 0.3s, border-color 0.3s',
                                        '&:hover': { color: 'primary.main', borderColor: 'primary.main', transform: 'scale(1.1)' } 
                                    }}
                                >
                                    <SocialIcon size={28} strokeWidth={1.5} />
                                </IconButton>
                            ))}
                        </Box>
                    </Container>
                </Box>
            </Box>

            {/* Footer */}
            <Box component="footer" sx={{ backgroundColor: theme.palette.brand.eerieBlack, color: theme.palette.brand.quickSilver, py: {xs:3, md:4} }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{fontFamily: 'Open Sans'}}>
                        © {new Date().getFullYear()} Kahit Saan Restaurant. All Rights Reserved.
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 0.5, fontFamily: 'Open Sans' }}>
                        Bayombong, Nueva Vizcaya, Philippines
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;