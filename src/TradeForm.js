import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    Grid,
    Box,
    Snackbar,
    Alert,
    Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const TradeForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        buyDate: new Date(),
        strategy: "",
        entryPrice: "",
        stopLoss: "",
        target: "",
        targetRatio: "",
        quantity: "",
        exitPrice: "",
        pyramiding: "0 times",
        profitOrLoss: "",
        profitLossPrice: "",
        emotionWhenBuying: "",
        emotionDuringTrade: "",
        emotionWhenExiting: "",
        learningFromThis: "",
        mistake: "",
        rating: "",
        stockType: "",
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`https://trade-cd4a.onrender.com/api/trade/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch trade data");
                    }
                    return response.json();
                })
                .then((data) => {
                    setFormData({
                        ...formData,
                        buyDate: formatDate(data.buyDate) || "",
                        strategy: data.strategy || "",
                        entryPrice: data.entryPrice || "",
                        stopLoss: data.stopLoss || "",
                        target: data.target || "",
                        targetRatio: data.targetRatio || "",
                        quantity: data.quantity || "",
                        exitPrice: data.exitPrice || "",
                        pyramiding: data.pyramiding || "0 times",
                        profitOrLoss: data.profitOrLoss || "",
                        profitLossPrice: data.profitLossPrice || "",
                        emotionWhenBuying: data.emotionWhenBuying || "",
                        emotionDuringTrade: data.emotionDuringTrade || "",
                        emotionWhenExiting: data.emotionWhenExiting || "",
                        learningFromThis: data.learningFromThis || "",
                        mistake: data.mistake || "",
                        rating: data.rating || "",
                        stockType: data. stockType || "",
                    });
                })
                .catch(() => setError(true))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const calculateTarget = (buyingPrice, stopLoss, targetRatio) => {
        if (!buyingPrice || !stopLoss || !targetRatio) return "";
        const ratioFactor = parseFloat(targetRatio.split(":")[1]);
        return ((buyingPrice - stopLoss) * ratioFactor + buyingPrice).toFixed(2);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };

        if (
            name === "entryPrice" ||
            name === "stopLoss" ||
            name === "targetRatio"
        ) {
            const target = calculateTarget(
                parseFloat(updatedFormData.entryPrice),
                parseFloat(updatedFormData.stopLoss),
                updatedFormData.targetRatio
            );
            updatedFormData.target = target || "";
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const url = id
            ? `https://trade-cd4a.onrender.com/api/trade/${id}`
            : "https://trade-cd4a.onrender.com/api/trade";

        const method = id ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    navigate("/");
                    setSuccess(true);
                    if (!id) {
                        setFormData({
                            buyDate: "",
                            strategy: "",
                            entryPrice: "",
                            stopLoss: "",
                            target: "",
                            targetRatio: "",
                            quantity: "",
                            exitPrice: "",
                            pyramiding: "0 times",
                            profitOrLoss: "",
                            profitLossPrice: "",
                            emotionWhenBuying: "",
                            emotionDuringTrade: "",
                            emotionWhenExiting: "",
                            learningFromThis: "",
                            mistake: "",
                            rating: "",
                        });
                    }
                } else {
                    throw new Error("Failed to submit trade");
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 5, fontWeight: 600 }}>
                Add New Trade
            </Typography>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="buyDate"
                                label="Buy Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formData.buyDate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="strategy"
                                label="Strategy"
                                value={formData.strategy}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="stockType"
                                label="Stock Type"
                                select
                                value={formData.stockType}
                                onChange={handleChange}
                            >
                                <MenuItem value="Stock">Stock</MenuItem>
                                <MenuItem value="Options">Options</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="targetRatio"
                                label="Target Ratio"
                                select
                                value={formData.targetRatio}
                                onChange={handleChange}
                            >
                                <MenuItem value="">select ratio</MenuItem>
                                <MenuItem value="1:2">1:2</MenuItem>
                                <MenuItem value="1:3">1:3</MenuItem>
                                <MenuItem value="1:4">1:4</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="quantity"
                                label="Quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="entryPrice"
                                label="Entry Price"
                                type="number"
                                value={formData.entryPrice}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="stopLoss"
                                label="Stop Loss"
                                type="number"
                                value={formData.stopLoss}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="target"
                                label="Target"
                                type="number"
                                value={formData.target}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="exitPrice"
                                label="Exit Price"
                                type="number"
                                value={formData.exitPrice}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="pyramiding"
                                label="Pyramiding"
                                value={formData.pyramiding}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="profitOrLoss"
                                label="Profit or Loss"
                                select
                                value={formData.profitOrLoss}
                                onChange={handleChange}
                            >
                                <MenuItem value="profit">Profit</MenuItem>
                                <MenuItem value="loss">Loss</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="profitLossPrice"
                                label="Profit/Loss Price"
                                type="number"
                                value={formData.profitLossPrice}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="emotionWhenBuying"
                                label="Emotion When Buying"
                                value={formData.emotionWhenBuying}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="emotionDuringTrade"
                                label="Emotion During Trade"
                                value={formData.emotionDuringTrade}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="emotionWhenExiting"
                                label="Emotion When Exiting"
                                value={formData.emotionWhenExiting}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="learningFromThis"
                                label="Learning From This"
                                value={formData.learningFromThis}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="mistake"
                                label="Mistake"
                                value={formData.mistake}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="rating"
                                label="Rating"
                                type="number"
                                value={formData.rating}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : id ? "Update Trade" : "Add Trade"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
            >
                <Alert onClose={() => setSuccess(false)} severity="success">
                    Trade saved successfully!
                </Alert>
            </Snackbar>
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => setError(false)}
            >
                <Alert onClose={() => setError(false)} severity="error">
                    An error occurred, please try again later.
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TradeForm;
