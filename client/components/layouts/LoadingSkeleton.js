import React from "react";
import { Stack, Skeleton } from "@mui/material";

const LoadingSkeleton = ({children, loading }) => {
    return loading ? (
        <Stack spacing={2} mx={2} my={4}>
            <Skeleton variant="rectangular" height={40} />
            <Skeleton
                variant="rectangular"
                animate="wave"
                height={300}
                sx={{ width: "100%" }}
            />
        </Stack>
    ) : (
        children
    );
};

export default LoadingSkeleton;
