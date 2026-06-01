import { Box, Button, Typography, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from 'react';


export default function LoadoutExport({loadoutCode}) {

    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);


    const handleCopy = () => {
        navigator.clipboard.writeText(loadoutCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }


    return (
        <Box sx={{ m: 1, display:'flex',flexDirection:'column'}}>
            <Button
                onClick={() => setOpen((status) => !status)}
                startIcon={<DownloadIcon sx={{ fontSize: 15 }} />}
                sx={{

                    px: 1.75,
                    py: 1,
                    background: "transparent",
                    border: "1px solid rgba(0,255,136,0.35)",
                    borderRadius: "6px",
                    color: "#00ff88",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    "&:hover": {
                        background: "rgba(0,255,136,0.07)",
                        borderColor: "rgba(0,255,136,0.6)",
                    },
                }}
            >
                Export Loadout
            </Button>

            {open && (
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                    mb:1,
                    px: 1.5,
                    pr: 0.5,
                    gap: 1,
                    background: "rgba(0,0,0,0.35)",
                }} >
                    <Typography
                        sx={{
                            flex: 1,
                            py: 1.25,
                            fontFamily: "Consolas, monospace",
                            fontSize: "10.5px",
                            color: "rgba(0,255,136,0.8)",
                            wordBreak: "break-all",
                            lineHeight: 1.6,
                        }}
                    >
                        { loadoutCode}
                    </Typography>
                    <IconButton
                        onClick={handleCopy}
                        size="small"
                        aria-label="Copy loadout string"
                        sx={{
                            color: copied ? "#00ff88" : "rgba(0,207,255,0.5)",
                            borderRadius: "4px",
                            "&:hover": {
                                background: "rgba(0,207,255,0.1)",
                                color: "#00cfff",
                            },
                        }}
                    >
                        {copied ? (
                            <CheckIcon sx={{ fontSize: 15 }} />
                        ) : (
                            <ContentCopyIcon sx={{ fontSize: 15 }} />
                        )}
                    </IconButton>
                </Box>
            )}

        </Box>
    );
}