import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import TradeListingPage from "./TradeListingPage";
import TradeForm from "./TradeForm";
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    IconButton,
    Box,
    Fade
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            {/* Navigation Bar */}
            <AppBar position="sticky" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Trade Management
                    </Typography>
                    {isSmallScreen ? (
                        <IconButton color="inherit" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/"
                                sx={{
                                    '&:hover': { backgroundColor: theme.palette.secondary.main, transition: '0.3s' }
                                }}
                            >
                                Listings
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/add-trade"
                                sx={{
                                    '&:hover': { backgroundColor: theme.palette.secondary.main, transition: '0.3s' }
                                }}
                            >
                                Add Trade
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            {/* Drawer for Small Screens */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { sm: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        width: "240px",
                        paddingTop: theme.spacing(2),
                        backgroundColor: theme.palette.background.default
                    },
                }}
            >
                <List>
                    <ListItem
                        button
                        component={Link}
                        to="/"
                        onClick={handleDrawerToggle}
                        sx={{
                            '&:hover': { backgroundColor: theme.palette.secondary.light, transition: '0.3s' },
                            padding: theme.spacing(2)
                        }}
                    >
                        Listings
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/add-trade"
                        onClick={handleDrawerToggle}
                        sx={{
                            '&:hover': { backgroundColor: theme.palette.secondary.light, transition: '0.3s' },
                            padding: theme.spacing(2)
                        }}
                    >
                        Add Trade
                    </ListItem>
                </List>
            </Drawer>

            <Box sx={{ padding: { xs: 2, sm: 3 }, minHeight: '100vh' }}>
                <Routes>
                    <Route path="/" element={<TradeListingPage />} />
                    <Route path="/add-trade/:id" element={<TradeForm />} />
                    <Route path="/add-trade" element={<TradeForm />} />
                </Routes>
            </Box>

            {/* Fade Effect for Transitions */}
            <Fade in={drawerOpen} timeout={500}>
                <Box sx={{ display: { sm: 'none', md: 'block' } }} />
            </Fade>
        </>
    );
}

export default App;
