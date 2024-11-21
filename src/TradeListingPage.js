import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    IconButton,
    Snackbar,
    Alert,
    Box,
    Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";

const TradeListingPage = () => {
    const [trades, setTrades] = useState([]);
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://trade-cd4a.onrender.com/api/trade")
            .then((response) => response.json())
            .then((data) => {
                setTrades(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching trades:", error);
                setSnackbar({ open: true, message: "Error fetching trades", type: "error" });
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this trade?")) return;
        try {
            await fetch(`https://trade-cd4a.onrender.com/api/trade/${id}`, {
                method: "DELETE",
            });
            setTrades(trades.filter((trade) => trade._id !== id));
            setSnackbar({ open: true, message: "Trade deleted successfully.", type: "success" });
        } catch (error) {
            setSnackbar({ open: true, message: "Failed to delete trade.", type: "error" });
        }
    };

    const handleEditClick = (trade) => {
        navigate(`/add-trade/${trade._id}`)
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Trade Listings
            </Typography>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    Buy Date
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    Strategy
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    Entry Price
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    Stop Loss
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    Target
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    Profit/Loss
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    Rating
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trades.map((trade) => (
                                <TableRow key={trade._id}>
                                    <TableCell align="center">
                                        {new Date(trade.buyDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">{trade.strategy}</TableCell>
                                    <TableCell align="center">${trade.entryPrice.toFixed(2)}</TableCell>
                                    <TableCell align="center">${trade.stopLoss.toFixed(2)}</TableCell>
                                    <TableCell align="center">${trade.target.toFixed(2)}</TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            color:
                                                trade.profitOrLoss === "profit" ? "green" : "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {trade.profitOrLoss.toUpperCase()}
                                    </TableCell>
                                    <TableCell align="center">{trade.rating}/10</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Edit Trade">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEditClick(trade)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Trade">
                                            <IconButton
                                                color="secondary"
                                                onClick={() => handleDelete(trade._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Snackbar Notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.type}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TradeListingPage;
