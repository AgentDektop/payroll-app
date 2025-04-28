import React from "react";
import { Backdrop, Box } from "@mui/material";
import { keyframes } from "@emotion/react";

import brandIcon from "../../shared/assets/icon/panadero-icon.png";

const animation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const LoadingOverlay = ({ open }) => {

    return (
        <Backdrop
            open={open}
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(3px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    animation: `${animation} 2s ease-in-out infinite`,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src={brandIcon}
                    style={{
                        width: "60%",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </Box>
        </Backdrop>
    );
};

export default LoadingOverlay;
