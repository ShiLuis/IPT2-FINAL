import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import {
    MapPin, Phone, Mail, Facebook, Instagram, Twitter, ChefHat,
    UtensilsCrossed, ScrollText, Menu as MenuIconLucide, X as CloseIconLucide
} from 'lucide-react';
import {
    AppBar, Toolbar, Typography, Button, IconButton, Container, Box, Grid,
    Card, CardMedia,
    CircularProgress, Alert, Link as MuiLink, Drawer,
    List, ListItem, ListItemButton, ListItemText, Paper,
    useTheme, useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
// import './LandingPage.css'; // Keep for any global styles or truly custom CSS if needed

const LandingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicMenuItems = async () => {
            setLoading(true);
            setError(null);
            try {
                // Ensure your server exposes GET /api/menu for public access
                const response = await axios.get('http://localhost:5000/api/menu');
                setMenuItems(response.data);
            } catch (err) {
                console.error("Error fetching public menu items:", err);
                setError(err.response?.data?.message || err.message || 'Failed to load menu items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPublicMenuItems();
    }, []); // Empty dependency array ensures this runs once on mount

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const appBarHeight = isMobile ? 64 : 80; // Approximate AppBar height
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - appBarHeight;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
        }
    };

    const LogoAndBrandName = () => (
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
                image={theme.palette.mode === 'dark'
                    ? '/src/assets/Images/3x/LogoWhite.webp'
                    : '/src/assets/Images/3x/LogoBlack.webp'}
                alt="Kahit Saan Logo"
                sx={{
                    height: { xs: 48, md: 56 }, // Increased logo size
                    width: 'auto',
                    mr: { xs: 1, md: 1.5 },
                    filter: theme.palette.mode === 'dark' ? 'invert(0)' : 'invert(0)',
                }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.2 }}>
                <Typography
                    variant="caption"
                    sx={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: '#fff',
                        letterSpacing: '0.03em',
                        fontWeight: 400,
                        fontSize: { xs: '0.7rem', md: '0.8rem' },
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
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        flexGrow: 0,
                        color: '#fff',
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
    );

    const AdminLoginMuiButton = ({ isMobileView = false, isFooterLink = false }) => (
        <Button
            variant={isFooterLink ? "text" : "contained"}
            color="primary"
            component={RouterLink}
            to="/admin/auth/login"
            sx={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: isFooterLink ? 400 : 600,
                fontSize: isFooterLink ? '0.75rem' : '0.875rem',
                textTransform: isFooterLink ? 'none' : 'uppercase',
                color: isFooterLink ? theme.palette.primary.contrastText : undefined,
                '&:hover': isFooterLink ? {
                    color: theme.palette.text.secondary,
                    backgroundColor: 'transparent',
                } : {},
                ...(isMobileView ? { width: 'calc(100% - 32px)', my: 2, mx: 2, py: 1.5 } 
                : isFooterLink ? { p: 0, m: 0, mt: 1, minWidth: 'auto' } 
                : { ml: 2 })
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
            PaperProps={{sx: {
                width: '260px', 
            }}}
        >
            <Box sx={{ width: 260, p:2, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
                <Box sx={{display: 'flex', justifyContent: 'flex-end', mb:1}}>
                    <IconButton onClick={() => setIsMobileMenuOpen(false)} sx={{color: theme.palette.text.secondary}}>
                        <CloseIconLucide />
                    </IconButton>
                </Box>
                <List>
                    {[{id:'hero', label:'Home'}, {id:'menu', label:'Menu'}, {id:'about', label:'About'}, {id:'location', label:'Location'}, {id:'contact', label:'Contact'}].map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton onClick={() => {scrollToSection(item.id); setIsMobileMenuOpen(false);}}>
                                <ListItemText 
                                    primary={item.label.toUpperCase()}
                                    primaryTypographyProps={{ sx: { ...theme.typography.button, color: theme.palette.text.primary, textAlign: 'center'} }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* AdminLoginMuiButton removed from mobile drawer main area */}
                {/* <Box sx={{mt: 'auto', pb:1}}> <AdminLoginMuiButton isMobileView={true} /> </Box> */}
            </Box>
        </Drawer>
    );

    const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d298.5801931748438!2d121.15347942067646!3d16.485069986708492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33904416a52df861%3A0x64d0c96af3c988ef!2s44-40%20Jaena%20St%2C%20Bayombong%2C%20Nueva%20Vizcaya!5e1!3m2!1sen!2sph!4v1748581630930!5m2!1sen!2sph"; // Example URL, replace

    return (
        // Base background and text color from theme
        <Box sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh' }}> 
            
            {/* AppBar uses theme overrides for MuiAppBar */}
            <AppBar position="fixed" component="header" elevation={0} sx={{ 
                borderBottom: `1px solid ${theme.palette.divider}` 
            }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ height: {xs: 64, md: 80} }}>
                        <LogoAndBrandName />
                        <Box sx={{ flexGrow: 1 }} />
                        {isMobile ? (
                            <IconButton size="large" edge="end" sx={{color: theme.palette.text.primary}} aria-label="open drawer" onClick={() => setIsMobileMenuOpen(true)}>
                                <MenuIconLucide />
                            </IconButton>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button variant="text" onClick={() => scrollToSection('menu')}>MENU</Button>
                                <Button variant="text" onClick={() => scrollToSection('about')}>ABOUT</Button>
                                <Button variant="text" onClick={() => scrollToSection('location')}>LOCATION</Button>
                                <Button variant="text" onClick={() => scrollToSection('contact')}>CONTACT</Button>
                                {/* AdminLoginMuiButton removed from desktop appbar */}
                                {/* <AdminLoginMuiButton /> */}
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            {mobileMenuDrawer}

            <Box id="hero" component="section" sx={{
                minHeight: '100vh', // Full viewport height
                backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80')",
                backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center',
                justifyContent: 'center', position: 'relative', 
                // Adjust padding top to account for AppBar height dynamically
                pt: (currentTheme) => `${isMobile ? currentTheme.mixins.toolbar.minHeight + currentTheme.spacing(1) : (currentTheme.mixins.toolbar[currentTheme.breakpoints.up('md')]?.minHeight || 80) + currentTheme.spacing(2)}px`,
                pb: theme.spacing(4) // Ensure some padding at the bottom too
            }}>
                {/* Overlay uses theme's background color with alpha */}
                <Box sx={{ position: 'absolute', inset: 0, backgroundColor: alpha(theme.palette.background.default, 0.8) }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: 6 }}> 

                    <Box sx={{ display: 'inline-block', textAlign: 'left', mt: 1 }}> 
                        {/* The inner Box with display:flex was removed */}
                        <Typography
                            variant="caption" // Or consider h6/subtitle1 if more appropriate semantically
                            sx={{
                                fontFamily: 'Open Sans, sans-serif',
                                color: '#fff',
                                letterSpacing: '0.03em',
                                fontWeight: 400,
                                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }, 
                                // ml: 0.3, // Removed for cleaner left alignment within this block
                                mb: 0.5, 
                                lineHeight: 1.1,
                                display: 'block', // Ensures proper block behavior for margins
                            }}
                        >
                            Saan tayo kakain?
                        </Typography>
                        <Typography
                            variant="h6" // Keeping variant, but significantly overriding size
                            component="div"
                            sx={{
                                fontFamily: 'montserrat',
                                fontWeight: 900,
                                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }, 
                                color: '#fff',
                                letterSpacing: '0.04em',
                                textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                                lineHeight: 1.1,
                                mt: 0, 
                            }}
                        >
                            KAHIT SAAN
                        </Typography>
                    </Box>
                    {/* Wrapper Box to ensure the Button element is centered */}
                    <Box sx={{ textAlign: 'center', mt: 3 }}> {/* mt is now on this wrapper */}
                        <Button 
                            variant="contained" color="primary"
                            size="large" 
                            onClick={() => scrollToSection('menu')} 
                            sx={{ 
                                // mt: 3, // Margin top moved to the wrapper Box above
                                py: 1.5, px: 5, 
                                fontFamily: 'Montserrat',
                                fontWeight: 'bold', 
                                fontSize: {xs: '0.9rem', md: '1.1rem'} 
                            }}
                        > View Our Menu </Button>
                    </Box>
                </Container>
            </Box>

            <main>
                <Box id="menu" component="section" sx={{ py: { xs: 6, md: 10 } /* backgroundColor: theme.palette.background.default - already on parent */ }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                            <ScrollText style={{ margin: '0 auto 16px auto', height: 48, width: 48, color: theme.palette.primary.main }} />
                            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' /* color: theme.palette.text.primary - from theme */ }}> Our Delicious Menu </Typography>
                        </Box>
                        {loading && ( <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}> <CircularProgress color="primary" /> </Box> )}
                        {error && ( <Alert severity="error" sx={{ my: 2, backgroundColor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main }}> {error} </Alert> )}
                        {!loading && !error && menuItems.length > 0 && (
                            <Grid container spacing={5} justifyContent="center">
                                {menuItems.map((item) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id || item.name}
                                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 2 }}>
                                        <Box sx={{
                                            width: '166px', height: '166px', borderRadius: '50%',
                                            border: `5px solid ${theme.palette.primary.main}`,
                                            boxSizing: 'border-box', display: 'flex', justifyContent: 'center',
                                            alignItems: 'center', padding: '3px',
                                            backgroundColor: theme.palette.background.paper, // Or default for slight contrast
                                        }}>
                                            <CardMedia
                                                component="img"
                                                image={item.photo?.url || `https://placehold.co/150x150/${theme.palette.background.paper.substring(1)}/${theme.palette.primary.main.substring(1)}?text=${encodeURIComponent(item.name)}`}
                                                alt={item.name}
                                                onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/150x150/${theme.palette.background.paper.substring(1)}/${theme.palette.primary.main.substring(1)}?text=Error`; }}
                                                sx={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}/>
                                        </Box>
                                        <Typography variant="h3" component="h3" sx={{ 
                                            color: theme.palette.primary.main, // h3 in theme is white, this is specific gold
                                            // fontWeight: 700, // theme.typography.h3 is 600 or 700 based on comment
                                            mt: 2.5, mb: 0.5, 
                                            // fontSize: '1.5rem', // from theme.typography.h3
                                            fontFamily: 'Montserrat, sans-serif' // from theme.typography.h3
                                        }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body1" sx={{ 
                                            // color: theme.palette.text.primary, // from theme
                                            mb: 1.5, minHeight: { xs: '3.2em', md:'3.2em' }, 
                                            lineHeight: '1.6em', overflow: 'hidden', textOverflow: 'ellipsis', 
                                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', 
                                            px: 1, maxWidth: '280px', 
                                            // fontSize: '1rem', // from theme.typography.body1
                                            // fontFamily: '"Open Sans", sans-serif' // from theme.typography.body1
                                        }}>
                                            {item.description}
                                        </Typography>
                                        <Typography sx={{ typography: 'priceText' /* color: theme.palette.primary.main - handled by priceText variant */ }}>
                                            ₱{typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                         {!loading && !error && menuItems.length === 0 && (
                            <Typography variant="body1" sx={{ textAlign: 'center', color: theme.palette.text.secondary, my: 5 }}>
                                Our menu is currently empty. Please check back later!
                            </Typography>
                        )}
                    </Container>
                </Box>

                <Box id="about" component="section" sx={{ py: { xs: 6, md: 10 } /* bg color from parent */ }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                            <ChefHat style={{ margin: '0 auto 16px auto', height: 48, width: 48, color: theme.palette.primary.main }} />
                            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mt: 1 /* color from theme */ }}>
                                About Kahit Saan
                            </Typography>
                        </Box> 
                        <Container maxWidth="md">
    <Typography
        variant="body1"
        sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3,
            fontSize: { xs: '1rem', md: '1.3rem' },
            lineHeight: 1.8,
            // color: is inherited from the theme by default for Typography
        }}
    >
        “Saan tayo kakain?”<br />
        “Kahit saan.”
    </Typography>

    <Typography
        variant="body1"
        sx={{
            textAlign: 'center',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.8,

        }}
    >
        We’ve all heard it—and that’s exactly why this place exists.<br /><br />
        Kahit Saan was born from the classic barkada struggle:<br />
        no one can decide where to eat,<br />
        so you go somewhere that has everything you’re craving—good food, good prices, good vibes.<br /><br />
        Located near SMU Gate 2,<br />
        we serve budget-friendly comfort food like chao fan combos, ramen, and laksa<br />
        that hit the spot after class, during tambay hours, or in the middle of thesis breakdowns.<br /><br />
        Whether you’re hungry-hungry or just here for the company,<br />
        Kahit Saan is your default, go-to, “Kahit saan” resto.<br />
        Because when no one can decide where to eat,<br />
        we’ll always be the answer.
    </Typography>
</Container>
                    </Container>
                </Box>

                <Box id="location" component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: theme.palette.background.default }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                            <MapPin style={{ margin: '0 auto 16px auto', height: 48, width: 48, color: theme.palette.primary.main }} />
                            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                Find Us & Get In Touch
                            </Typography>
                            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mt: 2, maxWidth: '600px', mx: 'auto' }}>
                                We're conveniently located. Come visit or give us a call!
                            </Typography>
                        </Box>
                        {/* Replace Grid container and items with a Box using flexbox and sx props */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' }, // Stack on xs, row on md+
                            gap: theme.spacing(5), // Equivalent to Grid spacing={5}
                            alignItems: { xs: 'initial', md: 'stretch' } // Stretch items to equal height on md+
                        }}>
                            {/* Contact Details Paper */}
                            <Paper elevation={0} sx={{
                                p: { xs: 3, sm: 4 },
                                borderRadius: '12px',
                                backgroundColor: alpha(theme.palette.primary.main, 0.03),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                height: '100%', // Ensures it can stretch if alignItems: 'stretch' is used
                                display: 'flex',
                                flexDirection: 'column',
                                width: { xs: '100%', md: `calc(5.5/12 * 100% - (${theme.spacing(5)} / 2))` }, // Adjust width for gap
                                // Or using flexBasis which might be cleaner with gap:
                                // flexBasis: { xs: '100%', md: 'calc(5.5/12 * 100%)' },
                            }}>
                                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2.5, fontFamily: 'Montserrat', color: theme.palette.primary.main }}>Kahit Saan Restaurant</Typography>
                                <Typography variant="body1" component="address" sx={{ fontStyle: 'normal', color: theme.palette.text.secondary, mb: 2, lineHeight: 1.7 }}>
                                    Purok 5, Barangay Don Mariano Perez,<br />
                                    Bayombong, 3700 Nueva Vizcaya, Philippines
                                </Typography>
                                <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 1, fontFamily: 'Montserrat', color: theme.palette.primary.main }}>Operating Hours:</Typography>
                                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>Monday - Sunday: 10:00 AM - 8:00 PM</Typography>
                                <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 1.5, fontFamily: 'Montserrat', color: theme.palette.primary.main }}>Contact Details:</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <MuiLink href="tel:+639123456789" sx={{
                                        display: 'flex', alignItems: 'center', textDecoration: 'none',
                                        color: theme.palette.text.secondary,
                                        '&:hover': { color: theme.palette.primary.main }
                                    }}>
                                        <Phone sx={{ color: theme.palette.primary.main, mr: 1.5, fontSize: 20 }} /> +63 912 345 6789 (Mobile)
                                    </MuiLink>
                                    <MuiLink href="mailto:info@kahitsaanresto.com" sx={{
                                        display: 'flex', alignItems: 'center', textDecoration: 'none',
                                        color: theme.palette.text.secondary,
                                        '&:hover': { color: theme.palette.primary.main }
                                    }}>
                                        <Mail sx={{ color: theme.palette.primary.main, mr: 1.5, fontSize: 20 }} /> info@kahitsaanresto.com
                                    </MuiLink>
                                </Box>
                            </Paper>

                            {/* Map Paper */}
                            <Paper elevation={0} sx={{
                                width: { xs: '100%', md: `calc(6.5/12 * 100% - (${theme.spacing(5)} / 2))` }, // Adjust width for gap
                                // Or using flexBasis:
                                // flexBasis: { xs: '100%', md: 'calc(6.5/12 * 100%)' },
                                height: { xs: 300, sm: 400, md: 'auto' }, // 'auto' allows it to stretch with alignItems: 'stretch'
                                minHeight: 300,
                                position: 'relative',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}>
                                <iframe
                                    src={googleMapsEmbedUrl} // Your working URL
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%', // Fills the Paper
                                        border: 0,
                                    }}
                                    allowFullScreen={true}
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Kahit Saan Restaurant Location"
                                ></iframe>
                            </Paper>
                        </Box>
                    </Container>
                </Box>

                <Box id="contact" component="section" sx={{ py: { xs: 6, md: 10 } /* bg color from parent */}}>
                    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mb: 2 /* color from theme */ }}>
                            Connect With Us
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mt:1, mb: {xs: 4, md: 5}, maxWidth: '700px', mx: 'auto' }}>
                            Follow us on social media for the latest updates, promotions, and a peek into our delicious world! We'd love to hear from you.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: {xs: 2, sm: 3} }}>
                            {[
                                { Icon: Facebook, label: 'Facebook', url: 'https://facebook.com/kahitsaanresto' },
                                { Icon: Instagram, label: 'Instagram', url: 'https://instagram.com/kahitsaanresto' },
                                { Icon: Twitter, label: 'Twitter', url: 'https://twitter.com/kahitsaanresto' }
                            ].map(({ Icon, label, url }) => (
                                <IconButton
                                    key={label} component="a" href={url} target="_blank" rel="noopener noreferrer"
                                    aria-label={`${label} link`}
                                    sx={{ 
                                        color: theme.palette.text.secondary, 
                                        p: {xs: 1.2, sm: 1.5}, 
                                        border: `1px solid ${theme.palette.divider}`,
                                        transition: theme.transitions.create(['color', 'transform', 'border-color', 'box-shadow'], {
                                            duration: theme.transitions.duration.short,
                                        }),
                                        '&:hover': { 
                                            color: theme.palette.primary.main, 
                                            borderColor: theme.palette.primary.main, 
                                            transform: 'translateY(-2px) scale(1.05)', 
                                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                                        } 
                                    }}
                                >
                                    <Icon size={isMobile ? 24 : 28} strokeWidth={1.5} />
                                </IconButton>
                            ))}
                        </Box>
                    </Container>
                </Box>
            </main>

            <Box component="footer" sx={{ 
                backgroundColor: theme.palette.background.paper, 
                color: theme.palette.text.secondary, 
                py: {xs:3, md:4},
                borderTop: `1px solid ${theme.palette.divider}`
            }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{fontFamily: 'Open Sans'}}>
                        © {new Date().getFullYear()} Kahit Saan Restaurant. All Rights Reserved.
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 0.5, fontFamily: 'Open Sans', color: theme.palette.text.disabled }}>
                        Bayombong, Nueva Vizcaya, Philippines
                    </Typography>
                    {/* Add Admin Login link to the footer */}
                    <AdminLoginMuiButton isFooterLink={true} />
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;