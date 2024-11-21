import React from "react";
import {  Routes, Route, Link } from "react-router-dom";
import TradeListingPage from "./TradeListingPage";
import TradeForm from "./TradeForm";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

function App() {
    return (
        <>
            {/* Navigation Bar */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Trade Management
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Listings
                    </Button>
                    <Button color="inherit" component={Link} to="/add-trade">
                        Add Trade
                    </Button>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<TradeListingPage />} />
                <Route path={`/add-trade/:id`} element={<TradeForm />} />
                <Route path={`/add-trade`} element={<TradeForm />} />
            </Routes>
        </>
    );
}

export default App;
