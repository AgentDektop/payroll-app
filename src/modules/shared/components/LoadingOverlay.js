import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const LoadingOverlay = ({ open }) => {
    return (
        <Backdrop
            open={open}
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(3px)",
            }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingOverlay;
