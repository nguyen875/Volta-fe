import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    IconButton,
} from '@mui/material';
import { routes } from '../../routes/route.routes';
import { COLORS, COLOR_BRAND } from '../../common/constants/color.constant';

const DRAWER_WIDTH = 250;
const DRAWER_COLLAPSED_WIDTH = 80;

export const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const width = collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width,
                    boxSizing: 'border-box',
                    background: COLOR_BRAND.dark,
                    borderRight: 'none',
                    transition: 'width 0.2s ease',
                    overflowX: 'hidden',
                },
            }}
        >
            {/* Logo */}
            <Box
                sx={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                    background: 'rgba(255,255,255,0.05)',
                }}
            >
                <img
                    src={collapsed ? '/volta-mini.svg' : '/volta.svg'}
                    alt="Volta Logo"
                    style={{
                        height: 32,
                        transition: 'all 0.2s',
                        objectFit: 'contain',
                    }}
                />
            </Box>

            {/* Collapse toggle */}
            <Box
                sx={{
                    px: 2,
                    py: 1.5,
                    display: 'flex',
                    justifyContent: collapsed ? 'center' : 'flex-end',
                }}
            >
                <IconButton
                    onClick={() => setCollapsed(!collapsed)}
                    size="small"
                    sx={{ color: COLORS.white }}
                >
                    {collapsed ? '\u25B6' : '\u25C0'}
                </IconButton>
            </Box>

            {/* Navigation */}
            <List sx={{ px: 1 }}>
                {routes.map((route) => {
                    const isActive = location.pathname === route.path;
                    return (
                        <ListItemButton
                            key={route.path}
                            selected={isActive}
                            onClick={() => navigate(route.path)}
                            sx={{
                                borderRadius: '10px',
                                mb: 0.5,
                                minHeight: 44,
                                justifyContent: collapsed ? 'center' : 'initial',
                                px: collapsed ? 1.5 : 2,
                                color: isActive ? COLOR_BRAND.accent : '#aaa',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(232,255,71,0.08)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(232,255,71,0.12)',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.06)',
                                },
                            }}
                        >
                            {!collapsed && (
                                <ListItemText
                                    primary={route.label}
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                        fontWeight: isActive ? 600 : 400,
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                />
                            )}
                        </ListItemButton>
                    );
                })}
            </List>
        </Drawer>
    );
};
