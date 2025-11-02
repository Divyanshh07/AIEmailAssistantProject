import React, { useState } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Box,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Stack,
    CircularProgress,
    Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const GrayBackground = styled(Box)({
    minHeight: "100vh",
    backgroundColor: "#e0e0e0", // ✅ Gray background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    maxWidth: "800px",
    width: "100%",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    backgroundColor: "#ffffff",
}));

function App() {
    const [emailContent, setEmailContent] = useState("");
    const [tone, setTone] = useState("");
    const [generatedReply, setGeneratedReply] = useState("");
    const [loading, setLoading] = useState(false);

    const handleToneChange = (event) => setTone(event.target.value);

    const handleGenerate = async () => {
        if (!emailContent.trim()) {
            alert("Please enter the original email content.");
            return;
        }

        setLoading(true);
        setGeneratedReply("");

        try {
            const response = await axios.post("http://localhost:8080/api/email/generate", {
                emailContent,
                tone,
            });

            const reply =
                typeof response.data === "string"
                    ? response.data
                    : response.data.reply || JSON.stringify(response.data);

            setGeneratedReply(reply);
        } catch (error) {
            console.error("Error generating email reply:", error);
            setGeneratedReply("❌ Failed to generate reply. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setEmailContent("");
        setTone("");
        setGeneratedReply("");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedReply);
        alert("Copied to clipboard!");
    };

    return (
        <GrayBackground>
            <StyledPaper elevation={6}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#2E3B55",
                        letterSpacing: "1px",
                        mb: 3,
                    }}
                >
                    ✉️ Email Reply Generator
                </Typography>

                {/* Email Input */}
                <Box sx={{ my: 3 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        variant="outlined"
                        label="Original Email Content"
                        placeholder="Paste the email you received here..."
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        sx={{
                            backgroundColor: "#f9fafc",
                            borderRadius: "8px",
                        }}
                    />
                </Box>

                {/* Tone Selection */}
                <Box sx={{ my: 3 }}>
                    <FormControl fullWidth>
                        <InputLabel id="tone-select-label">Tone (Optional)</InputLabel>
                        <Select
                            labelId="tone-select-label"
                            id="tone-select"
                            value={tone}
                            label="Tone (Optional)"
                            onChange={handleToneChange}
                            sx={{
                                backgroundColor: "#f9fafc",
                                borderRadius: "8px",
                            }}
                        >
                            <MenuItem value="formal">Formal</MenuItem>
                            <MenuItem value="friendly">Friendly</MenuItem>
                            <MenuItem value="professional">Professional</MenuItem>
                            <MenuItem value="apologetic">Apologetic</MenuItem>
                            <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Buttons (Left-Aligned) */}
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="flex-start" // ✅ aligned to left
                    sx={{ my: 3 }}
                >
                    <Button
                        variant="contained"
                        onClick={handleGenerate}
                        disabled={loading}
                        sx={{
                            backgroundColor: "#1976d2",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "25px",
                            px: 4,
                            "&:hover": { backgroundColor: "#115293" },
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Generate Reply"
                        )}
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClear}
                        sx={{
                            borderRadius: "25px",
                            px: 4,
                            textTransform: "none",
                        }}
                    >
                        Clear
                    </Button>
                </Stack>

                {/* Output */}
                <Box sx={{ my: 3 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        variant="outlined"
                        label="Generated Reply"
                        placeholder="AI-generated email reply will appear here..."
                        value={generatedReply}
                        InputProps={{ readOnly: true }}
                        sx={{
                            backgroundColor: "#f9fafc",
                            borderRadius: "8px",
                        }}
                    />
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 2,
                            borderRadius: "25px",
                            px: 3,
                            fontWeight: "bold",
                            borderColor: "#1976d2",
                            color: "#1976d2",
                            "&:hover": {
                                backgroundColor: "#1976d2",
                                color: "white",
                            },
                        }}
                        onClick={handleCopy}
                        disabled={!generatedReply}
                    >
                        Copy to Clipboard
                    </Button>
                </Box>
            </StyledPaper>
        </GrayBackground>
    );
}

export default App;
