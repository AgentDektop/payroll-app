import React, { useState, useMemo } from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Typography,
    Box,
} from "@mui/material";

const SortableDataTable = ({ columns, data, noDataMessage, theme }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data;

        const getNestedValue = (obj, path) => {
            const parts = path.split(".");
            let value = obj;
            for (let part of parts) {
                if (!value) return undefined;
                if (part.match(/^\d+$/)) {
                    value = value[Number(part)];
                } else {
                    value = value[part];
                }
            }
            return value;
        };

        return [...data].sort((a, b) => {
            const aVal = getNestedValue(a, sortConfig.key);
            const bVal = getNestedValue(b, sortConfig.key);

            if (aVal == null) return 1;
            if (bVal == null) return -1;

            const isDate = /^\d{2}-\d{2}-\d{4}$/.test(aVal);
            if (isDate) {
                const [d1, m1, y1] = aVal.split("-").map(Number);
                const [d2, m2, y2] = bVal.split("-").map(Number);
                const dateA = new Date(y1, m1 - 1, d1);
                const dateB = new Date(y2, m2 - 1, d2);
                return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
            }

            const isTime = /^\d{2}:\d{2}:\d{2}$/.test(aVal);
            if (isTime) {
                const toSeconds = (str) => {
                    const [h, m, s] = str.split(":").map(Number);
                    return h * 3600 + m * 60 + s;
                };
                return sortConfig.direction === "asc"
                    ? toSeconds(aVal) - toSeconds(bVal)
                    : toSeconds(bVal) - toSeconds(aVal);
            }

            if (!isNaN(aVal) && !isNaN(bVal)) {
                return sortConfig.direction === "asc"
                    ? Number(aVal) - Number(bVal)
                    : Number(bVal) - Number(aVal);
            }

            return sortConfig.direction === "asc"
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
        });
    }, [data, sortConfig]);

    const HeaderCell = ({ icon, label, sortKey }) => {
        const isSorted = sortConfig.key === sortKey;

        return (
            <TableCell
                onClick={() => sortKey && handleSort(sortKey)}
                sx={{
                    borderRight: `1px solid ${theme.palette.custom.greyBorder}`,
                    cursor: sortKey ? "pointer" : "default",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {icon && <img src={icon} alt={label} style={{ width: 24, height: 24 }} />}
                    <Typography variant="md3">{label}</Typography>
                    {isSorted && (
                        <Typography variant="caption">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </Typography>
                    )}
                </Box>
            </TableCell>
        );
    };

    const DataCell = ({ children }) => (
        <TableCell sx={{ fontSize: "12px", borderRight: `1px solid ${theme.palette.custom.greyBorder}` }}>
            {children}
        </TableCell>
    );

    return (
        <TableContainer sx={{ flexGrow: 1 }}>
            <Table stickyHeader sx={{ width: "100%" }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.custom.darkerGrey }}>
                        {columns.map((col, index) => (
                            <HeaderCell key={index} icon={col.icon} label={col.label} sortKey={col.key} />
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData?.length ? (
                        sortedData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <DataCell key={colIndex}>{col.render(row)}</DataCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                <Typography>{noDataMessage}</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SortableDataTable;