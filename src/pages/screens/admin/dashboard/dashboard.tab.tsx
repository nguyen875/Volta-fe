import React from 'react';
import useSWR from 'swr';
import { Box, Typography, Grid } from '@mui/material';
import { A, statusColor } from '../admin.constants';
import { VTable } from '../../../../common/components/VTable';
import type { VTableColumn } from '../../../../common/components/VTable';
import { getAllOrder, getOrderStats } from '../../../../apis/orders/order.api';
import { getAllProduct } from '../../../../apis/products/product.api';
import type { Order } from '../../../../apis/orders/order.interface';
import type { Product } from '../../../../apis/products/product.interface';
import type { PaginatedResponse } from '../../../../common/interfaces/base-requestdto.interface';
import dayjs from 'dayjs';

// ── Helpers ─────────────────────────────────────────────────────────────────

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
    const c = statusColor[status] ?? { bg: 'rgba(136,136,136,0.12)', text: '#888' };
    return (
        <Box
            sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.6,
                bgcolor: c.bg, color: c.text,
                fontSize: 11, fontWeight: 600,
                px: 1.25, py: 0.375, borderRadius: '50px',
            }}
        >
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'currentColor' }} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Box>
    );
};

// Simple SVG bar chart (no external chart lib needed)
const BarChart: React.FC<{ values: number[]; labels: string[] }> = ({ values, labels }) => {
    const max = Math.max(...values, 1);
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: 120 }}>
            {values.map((v, i) => (
                <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: `${(v / max) * 100}px`,
                            bgcolor: A.accent,
                            borderRadius: '4px 4px 0 0',
                            transition: 'height 0.6s ease',
                            minHeight: 4,
                        }}
                    />
                    <Typography sx={{ fontSize: 10, color: A.dim }}>{labels[i]}</Typography>
                </Box>
            ))}
        </Box>
    );
};

// ── KPI Card ────────────────────────────────────────────────────────────────

interface KpiCardProps {
    label: string;
    icon: string;
    value: string;
    change?: string;
    up?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, icon, value, change, up }) => (
    <Box
        sx={{
            bgcolor: A.surface,
            border: `1px solid ${A.border}`,
            borderRadius: '10px',
            p: 2.5,
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.75 }}>
            <Typography sx={{ fontSize: 12, color: A.dim, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {label}
            </Typography>
            <Typography sx={{ fontSize: 18 }}>{icon}</Typography>
        </Box>
        <Typography
            sx={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: -1, color: A.text, mb: 0.5 }}
        >
            {value}
        </Typography>
        {change && (
            <Typography sx={{ fontSize: 12, color: up ? A.green : A.red }}>
                {up ? '↑' : '↓'} {change}
            </Typography>
        )}
    </Box>
);

// ── Dashboard Tab ────────────────────────────────────────────────────────────

export const DashboardTab: React.FC = () => {
    const now = dayjs();
    const startDate = now.subtract(30, 'day').format('YYYY-MM-DD');
    const endDate = now.format('YYYY-MM-DD');

    const { data: statsResp } = useSWR(
        ['order-stats', startDate, endDate],
        () => getOrderStats(startDate, endDate).then((r) => r.data?.data),
    );

    const { data: ordersResp } = useSWR<PaginatedResponse<Order>>(
        ['orders', 1, 5, ''],
        () => getAllOrder({ page: 1, limit: 5 }).then((r) => r.data),
    );

    const { data: productsResp } = useSWR<PaginatedResponse<Product>>(
        ['products', 1, 5, ''],
        () => getAllProduct({ page: 1, limit: 5 }).then((r) => r.data),
    );

    const recentOrders = ordersResp?.data ?? [];
    const topProducts = productsResp?.data ?? [];

    const totalRevenue = statsResp?.total_revenue ?? 0;
    const totalOrders = statsResp?.total_orders ?? 0;
    const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Mock weekly revenue bars (placeholder — replace with real data if endpoint exists)
    const weekBars = [820, 1200, 950, 1400, 1100, 1600, 1380];
    const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const orderColumns: VTableColumn<Order>[] = [
        { key: 'id', label: '#', width: 60, render: (r) => <Typography sx={{ fontSize: 13, color: A.accent, fontFamily: 'monospace' }}>#{r.id}</Typography> },
        { key: 'user_id', label: 'Customer', render: (r) => <Typography sx={{ fontSize: 13, color: A.text }}>User #{r.user_id}</Typography> },
        { key: 'total_price', label: 'Total', render: (r) => <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: A.text }}>${Number(r.total_price).toFixed(2)}</Typography> },
        { key: 'status', label: 'Status', render: (r) => <StatusPill status={r.status} /> },
        { key: 'create_at', label: 'Date', render: (r) => <Typography sx={{ fontSize: 12, color: A.dim }}>{r.create_at ? dayjs(r.create_at).format('MMM D') : '—'}</Typography> },
    ];

    const productColumns: VTableColumn<Product>[] = [
        {
            key: 'name', label: 'Product', render: (r) => (
                <Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: A.text }}>{r.name}</Typography>
                    <Typography sx={{ fontSize: 11, color: A.dim, fontFamily: 'monospace' }}>{r.slug}</Typography>
                </Box>
            )
        },
        { key: 'price', label: 'Price', render: (r) => <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: A.text }}>${Number(r.price).toFixed(2)}</Typography> },
        { key: 'stock', label: 'Stock', render: (r) => <Typography sx={{ fontSize: 13, color: r.stock < 10 ? A.red : A.green }}>{r.stock}</Typography> },
    ];

    return (
        <Box sx={{ p: 3.5 }}>
            {/* KPI Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <KpiCard label="Revenue" icon="💰" value={`$${totalRevenue.toLocaleString()}`} change="last 30 days" up />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <KpiCard label="Orders" icon="📦" value={String(totalOrders)} change="last 30 days" up />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <KpiCard label="Avg. Order" icon="🛒" value={`$${avgOrder.toFixed(2)}`} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <KpiCard label="Completed" icon="✅" value={String(statsResp?.completed_orders ?? 0)} />
                </Grid>
            </Grid>

            {/* Charts row */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ bgcolor: A.surface, border: `1px solid ${A.border}`, borderRadius: '10px', p: 2.5 }}>
                        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: A.text, mb: 2 }}>
                            Revenue — Last 7 Days
                        </Typography>
                        <BarChart values={weekBars} labels={weekLabels} />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ bgcolor: A.surface, border: `1px solid ${A.border}`, borderRadius: '10px', p: 2.5, height: '100%' }}>
                        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: A.text, mb: 2 }}>
                            Order Status
                        </Typography>
                        {(['pending', 'paid', 'shipped', 'delivered', 'cancelled'] as const).map((s) => {
                            const c = statusColor[s];
                            return (
                                <Box key={s} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c.text }} />
                                        <Typography sx={{ fontSize: 12, color: A.dim, textTransform: 'capitalize' }}>{s}</Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: 12, color: c.text, fontFamily: 'monospace' }}>
                                        {recentOrders.filter((o) => o.status === s).length}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Grid>
            </Grid>

            {/* Tables row */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ bgcolor: A.surface, border: `1px solid ${A.border}`, borderRadius: '10px', p: 2.5 }}>
                        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: A.text, mb: 2 }}>
                            Recent Orders
                        </Typography>
                        <VTable<Order> columns={orderColumns} data={recentOrders} sx={{ border: 'none', borderRadius: 0 }} />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ bgcolor: A.surface, border: `1px solid ${A.border}`, borderRadius: '10px', p: 2.5 }}>
                        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: A.text, mb: 2 }}>
                            Top Products
                        </Typography>
                        <VTable<Product> columns={productColumns} data={topProducts} sx={{ border: 'none', borderRadius: 0 }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
