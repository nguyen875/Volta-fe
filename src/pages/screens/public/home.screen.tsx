import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { A } from '../admin/admin.constants';
import { getShops, getFeaturedProducts } from '../../../apis/shops/shop.api';
import { getActiveBundles } from '../../../apis/bundles/bundle.api';
import type { Product } from '../../../apis/products/product.interface';
import { ProductBadge } from '../../../apis/products/product.enum';
import type { Bundle } from '../../../apis/bundles/bundle.interface';

const badgeVisual: Record<string, { text: string; bg: string }> = {
    hot: { text: '#ff4d4d', bg: 'rgba(255,77,77,0.14)' },
    sale: { text: '#ffaa4d', bg: 'rgba(255,170,77,0.14)' },
    new: { text: '#4da6ff', bg: 'rgba(77,166,255,0.14)' },
    none: { text: '#888', bg: 'rgba(136,136,136,0.14)' },
};

const featuredOrder = [ProductBadge.HOT, ProductBadge.SALE, ProductBadge.NEW, ProductBadge.NONE] as const;

const sectionLabel: Record<ProductBadge, string> = {
    [ProductBadge.HOT]: 'Top selected - Hot',
    [ProductBadge.SALE]: 'Top selected - Sale',
    [ProductBadge.NEW]: 'Top selected - New',
    [ProductBadge.NONE]: 'Top selected - None',
};

function ProductCard({ product }: { product: Product }) {
    const style = badgeVisual[product.badge] ?? badgeVisual.none;

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: '16px',
                border: `1px solid ${A.border}`,
                bgcolor: A.surface,
                minHeight: 164,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <Chip
                    label={product.badge.toUpperCase()}
                    size="small"
                    sx={{
                        bgcolor: style.bg,
                        color: style.text,
                        border: `1px solid ${style.text}33`,
                        fontSize: 10,
                        fontWeight: 700,
                        mb: 1.25,
                    }}
                />
                <Typography sx={{ color: A.text, fontWeight: 700, mb: 0.5, lineHeight: 1.35 }}>
                    {product.name}
                </Typography>
                <Typography sx={{ color: A.dim, fontSize: 12 }}>Stock: {product.stock}</Typography>
            </Box>
            <Typography sx={{ mt: 1.5, color: A.accent, fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: 22 }}>
                ${Number(product.price).toFixed(2)}
            </Typography>
        </Box>
    );
}

function BundleCard({ bundle }: { bundle: Bundle }) {
    return (
        <Box
            sx={{
                p: 2.25,
                borderRadius: '16px',
                border: `1px solid ${A.border}`,
                background: 'linear-gradient(180deg, rgba(26,26,26,1) 0%, rgba(20,20,20,0.92) 100%)',
                minHeight: 170,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <Typography sx={{ color: A.text, fontWeight: 700, mb: 0.5 }}>{bundle.name}</Typography>
                <Typography sx={{ color: A.dim, fontSize: 13, lineHeight: 1.6 }}>
                    {bundle.description || 'Curated bundle to increase average cart value.'}
                </Typography>
            </Box>
            <Typography sx={{ mt: 1.5, color: A.green, fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: 21 }}>
                ${Number(bundle.bundle_price).toFixed(2)}
            </Typography>
        </Box>
    );
}

function EmptyListState() {
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: '12px',
                border: `1px dashed ${A.border}`,
                bgcolor: A.s2,
            }}
        >
            <Typography sx={{ color: A.dim, fontSize: 13 }}>Nothing here...</Typography>
        </Box>
    );
}

export const HomeScreen: React.FC = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const { data: searchedProducts, isLoading: searchLoading } = useSWR<Product[]>(
        hasSearched ? ['shop-search', searchTerm] : null,
        () => getShops({ search: searchTerm, page: 1, limit: 8 }).then((res) => res.data.data),
    );

    const { data: hotProducts, isLoading: hotLoading } = useSWR<Product[]>(
        ['featured', ProductBadge.HOT],
        () => getFeaturedProducts({ badge: ProductBadge.HOT, limit: 4 }).then((res) => res.data),
    );

    const { data: saleProducts, isLoading: saleLoading } = useSWR<Product[]>(
        ['featured', ProductBadge.SALE],
        () => getFeaturedProducts({ badge: ProductBadge.SALE, limit: 4 }).then((res) => res.data),
    );

    const { data: newProducts, isLoading: newLoading } = useSWR<Product[]>(
        ['featured', ProductBadge.NEW],
        () => getFeaturedProducts({ badge: ProductBadge.NEW, limit: 4 }).then((res) => res.data),
    );

    const { data: noneProducts, isLoading: noneLoading } = useSWR<Product[]>(
        ['featured', ProductBadge.NONE],
        () => getFeaturedProducts({ badge: ProductBadge.NONE, limit: 4 }).then((res) => res.data),
    );

    const { data: bundles, isLoading: bundleLoading } = useSWR<Bundle[]>(
        ['bundles-active'],
        () => getActiveBundles().then((res) => res.data),
    );

    const { data: availableProducts, isLoading: availableLoading } = useSWR<Product[]>(
        ['shop-available'],
        () => getShops({ search: '', page: 1, limit: 24 }).then((res) => res.data.data),
    );

    const randomAvailable = useMemo(() => {
        const source = [...(availableProducts ?? [])];
        for (let i = source.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [source[i], source[j]] = [source[j], source[i]];
        }
        return source.slice(0, 8);
    }, [availableProducts]);

    const featuredMap: Record<ProductBadge, Product[] | undefined> = {
        [ProductBadge.HOT]: hotProducts,
        [ProductBadge.SALE]: saleProducts,
        [ProductBadge.NEW]: newProducts,
        [ProductBadge.NONE]: noneProducts,
    };

    const featuredLoading: Record<ProductBadge, boolean> = {
        [ProductBadge.HOT]: hotLoading,
        [ProductBadge.SALE]: saleLoading,
        [ProductBadge.NEW]: newLoading,
        [ProductBadge.NONE]: noneLoading,
    };

    const runSearch = () => {
        setSearchTerm(searchInput.trim());
        setHasSearched(true);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: A.bg, color: A.text }}>
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Box sx={{ mb: 3, p: 2.5, borderRadius: '16px', border: `1px solid ${A.border}`, bgcolor: A.surface }}>
                    <Typography sx={{ fontFamily: '"Syne", sans-serif', fontSize: 28, fontWeight: 800, mb: 0.5 }}>
                        Volta E-commerce Home
                    </Typography>
                    <Typography sx={{ color: A.dim, mb: 2 }}>
                        Customer-facing storefront. The Admin page remains the combined statistics dashboard.
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 1.25 }}>
                        <TextField
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') runSearch();
                            }}
                            placeholder="Search"
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">⌕</InputAdornment>,
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: A.s2,
                                    color: A.text,
                                },
                            }}
                        />
                        <Button
                            onClick={runSearch}
                            sx={{ bgcolor: A.accent, color: A.bg, textTransform: 'none', px: 3, '&:hover': { bgcolor: '#d5ea35' } }}
                        >
                            Search
                        </Button>
                    </Box>

                    <Box sx={{ mt: 1.5 }}>
                        {!hasSearched ? (
                            <Typography sx={{ color: A.dim, fontSize: 13 }}>
                                Enter a query and press Search.
                            </Typography>
                        ) : searchLoading ? (
                            <CircularProgress size={18} sx={{ color: A.accent }} />
                        ) : (
                            <Typography sx={{ color: A.dim, fontSize: 13 }}>
                                Search results found: {(searchedProducts ?? []).length}
                            </Typography>
                        )}
                    </Box>

                    {hasSearched && !searchLoading && (
                        <Box sx={{ mt: 1.5, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }, gap: 1.25 }}>
                            {(searchedProducts ?? []).length > 0 ? (
                                (searchedProducts ?? []).map((product) => (
                                    <ProductCard key={`search-${product.id}`} product={product} />
                                ))
                            ) : (
                                <EmptyListState />
                            )}
                        </Box>
                    )}
                </Box>

                <Box sx={{ mb: 3.5 }}>
                    <Typography sx={{ fontFamily: '"Syne", sans-serif', fontSize: 22, fontWeight: 800, mb: 1.5 }}>
                        Top selected
                    </Typography>

                    {featuredOrder.map((badge) => (
                        <Box key={badge} sx={{ mb: 2.25 }}>
                            <Typography sx={{ color: A.accent, fontSize: 12, letterSpacing: 1.1, textTransform: 'uppercase', mb: 1 }}>
                                {sectionLabel[badge]}
                            </Typography>

                            {featuredLoading[badge] ? (
                                <CircularProgress size={18} sx={{ color: A.accent }} />
                            ) : (
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }, gap: 1.25 }}>
                                    {(featuredMap[badge] ?? []).length > 0 ? (
                                        (featuredMap[badge] ?? []).map((product) => (
                                            <ProductCard key={`${badge}-${product.id}`} product={product} />
                                        ))
                                    ) : (
                                        <EmptyListState />
                                    )}
                                </Box>
                            )}
                        </Box>
                    ))}

                    <Box>
                        <Typography sx={{ color: A.accent, fontSize: 12, letterSpacing: 1.1, textTransform: 'uppercase', mb: 1 }}>
                            Bundles
                        </Typography>

                        {bundleLoading ? (
                            <CircularProgress size={18} sx={{ color: A.accent }} />
                        ) : (
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }, gap: 1.25 }}>
                                {(bundles ?? []).length > 0 ? (
                                    (bundles ?? []).map((bundle) => (
                                        <BundleCard key={`bundle-${bundle.id}`} bundle={bundle} />
                                    ))
                                ) : (
                                    <EmptyListState />
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>

                <Box>
                    <Typography sx={{ fontFamily: '"Syne", sans-serif', fontSize: 22, fontWeight: 800, mb: 1.5 }}>
                        Currently available
                    </Typography>
                    <Typography sx={{ color: A.dim, fontSize: 13, mb: 1.25 }}>
                        Randomized list of available products.
                    </Typography>

                    {availableLoading ? (
                        <CircularProgress size={20} sx={{ color: A.accent }} />
                    ) : (
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }, gap: 1.25 }}>
                            {randomAvailable.length > 0 ? (
                                randomAvailable.map((product) => (
                                    <ProductCard key={`available-${product.id}`} product={product} />
                                ))
                            ) : (
                                <EmptyListState />
                            )}
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};
