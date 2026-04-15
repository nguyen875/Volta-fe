import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import {
    Box,
    Container,
    Typography,
    CircularProgress,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
} from '@mui/material';
import { useCart } from '../../../../common/contexts/cart.context';
import { checkoutCart, applyDiscount, placeOrder } from '../../../../apis/carts/cart.api';
import type { CheckOutCartResponse } from '../../../../apis/carts/cart.interface';
import { VButton } from '../../../../common/components';
import { VBreadcrumb } from '../../../../common/components/VBreadcrumb';
import { useSnackbar } from '../../../../common/contexts/snackbar.context';

export const CheckoutScreen: React.FC = () => {
    const navigate = useNavigate();
    const { refreshCart } = useCart();
    const { showSnackbar } = useSnackbar();
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
    const [discountCode, setDiscountCode] = useState('');
    const [discountResult, setDiscountResult] = useState<{ discount_amount: number; total: number } | null>(null);
    const [deliveryTier, setDeliveryTier] = useState<'standard' | 'express'>('standard');
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'credit_card'>('cod');
    const [placing, setPlacing] = useState(false);
    const [applyingDiscount, setApplyingDiscount] = useState(false);

    const { data: checkoutData, isLoading } = useSWR<CheckOutCartResponse>(
        'checkout-data',
        () => checkoutCart().then((r) => r.data),
        {
            onSuccess: (data) => {
                if (data.address?.length > 0 && selectedAddress === null) {
                    const defaultAddr = data.address.find((a) => a.is_default);
                    setSelectedAddress(defaultAddr?.id ?? data.address[0].id);
                }
            },
        },
    );

    const handleApplyDiscount = async () => {
        if (!discountCode.trim() || !checkoutData) return;
        setApplyingDiscount(true);
        try {
            const res = await applyDiscount({ discount_code: discountCode, subtotal: checkoutData.subtotal });
            setDiscountResult(res.data);
            showSnackbar('Discount applied', 'success');
        } catch {
            showSnackbar('Invalid discount code', 'error');
        } finally {
            setApplyingDiscount(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            showSnackbar('Please select a delivery address', 'warning');
            return;
        }
        setPlacing(true);
        try {
            const res = await placeOrder({
                address_id: selectedAddress,
                discount_code: discountCode || undefined,
                payment_method: paymentMethod,
                delivery_tier: deliveryTier,
            });
            await refreshCart();
            navigate('/order-success', { state: { orderId: res.data } });
        } catch {
            showSnackbar('Failed to place order', 'error');
        } finally {
            setPlacing(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress sx={{ color: '#1a1a1a' }} />
            </Box>
        );
    }

    if (!checkoutData || checkoutData.items.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography sx={{ color: '#999', mb: 2 }}>Your cart is empty</Typography>
                <VButton variant="secondary" onClick={() => navigate('/shop')}>Go to Shop</VButton>
            </Container>
        );
    }

    const shippingFee = deliveryTier === 'express' ? 15 : 0;
    const baseTotal = discountResult?.total ?? checkoutData.subtotal;
    const finalTotal = baseTotal + shippingFee;

    return (
        <Box sx={{ bgcolor: '#ffffff' }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <VBreadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Cart', path: '/cart' }, { label: 'Checkout' }]} />

                <Typography
                    sx={{
                        fontFamily: '"Syne", sans-serif',
                        fontSize: 28,
                        fontWeight: 800,
                        mb: 3,
                        color: '#1a1a1a',
                    }}
                >
                    Checkout
                </Typography>

                <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* Left — address + discount */}
                    <Box sx={{ flex: 1 }}>
                        {/* Address */}
                        <Box sx={{ mb: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 2, color: '#1a1a1a' }}>
                                Delivery Address
                            </Typography>
                            {checkoutData.address.length === 0 ? (
                                <Typography sx={{ color: '#999', fontSize: 14 }}>
                                    No addresses found. Please add one in your profile.
                                </Typography>
                            ) : (
                                <RadioGroup
                                    value={selectedAddress ?? ''}
                                    onChange={(e) => setSelectedAddress(Number(e.target.value))}
                                >
                                    {checkoutData.address.map((addr) => (
                                        <FormControlLabel
                                            key={addr.id}
                                            value={addr.id}
                                            control={<Radio sx={{ color: '#ccc', '&.Mui-checked': { color: '#1a1a1a' } }} />}
                                            label={
                                                <Box>
                                                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>
                                                        {addr.label || 'Address'}{addr.is_default ? ' (Default)' : ''}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 13, color: '#888' }}>
                                                        {addr.street}, {addr.city}, {addr.country}
                                                    </Typography>
                                                </Box>
                                            }
                                            sx={{
                                                mb: 1,
                                                px: 2,
                                                py: 1.5,
                                                borderRadius: '12px',
                                                border: selectedAddress === addr.id ? '2px solid #1a1a1a' : '1px solid #f0f0f0',
                                                bgcolor: selectedAddress === addr.id ? '#fafafa' : 'transparent',
                                                mx: 0,
                                                width: '100%',
                                                transition: 'all 0.15s',
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            )}
                        </Box>

                        {/* Delivery Options */}
                        <Box sx={{ borderTop: '1px solid #f0f0f0', pt: 3, mb: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 2, color: '#1a1a1a' }}>
                                Delivery Options
                            </Typography>
                            <RadioGroup
                                value={deliveryTier}
                                onChange={(e) => setDeliveryTier(e.target.value as 'standard' | 'express')}
                            >
                                {[
                                    { value: 'standard', label: 'Standard Delivery', sub: '5–7 business days', fee: 'Free' },
                                    { value: 'express', label: 'Express Delivery', sub: '1–2 business days', fee: '+$15.00' },
                                ].map((opt) => (
                                    <FormControlLabel
                                        key={opt.value}
                                        value={opt.value}
                                        control={<Radio sx={{ color: '#ccc', '&.Mui-checked': { color: '#1a1a1a' } }} />}
                                        label={
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{opt.label}</Typography>
                                                    <Typography sx={{ fontSize: 12, color: '#888' }}>{opt.sub}</Typography>
                                                </Box>
                                                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{opt.fee}</Typography>
                                            </Box>
                                        }
                                        sx={{
                                            mb: 1, px: 2, py: 1.5, borderRadius: '12px', mx: 0, width: '100%',
                                            border: deliveryTier === opt.value ? '2px solid #1a1a1a' : '1px solid #f0f0f0',
                                            bgcolor: deliveryTier === opt.value ? '#fafafa' : 'transparent',
                                            transition: 'all 0.15s',
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </Box>

                        {/* Payment Method */}
                        <Box sx={{ borderTop: '1px solid #f0f0f0', pt: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 2, color: '#1a1a1a' }}>
                                Payment Method
                            </Typography>
                            <RadioGroup
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'credit_card')}
                            >
                                {[
                                    { value: 'cod', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
                                    { value: 'credit_card', label: 'Credit Card', sub: 'Simulated — no real charge' },
                                ].map((opt) => (
                                    <FormControlLabel
                                        key={opt.value}
                                        value={opt.value}
                                        control={<Radio sx={{ color: '#ccc', '&.Mui-checked': { color: '#1a1a1a' } }} />}
                                        label={
                                            <Box>
                                                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{opt.label}</Typography>
                                                <Typography sx={{ fontSize: 12, color: '#888' }}>{opt.sub}</Typography>
                                            </Box>
                                        }
                                        sx={{
                                            mb: 1, px: 2, py: 1.5, borderRadius: '12px', mx: 0, width: '100%',
                                            border: paymentMethod === opt.value ? '2px solid #1a1a1a' : '1px solid #f0f0f0',
                                            bgcolor: paymentMethod === opt.value ? '#fafafa' : 'transparent',
                                            transition: 'all 0.15s',
                                        }}
                                    />
                                ))}
                            </RadioGroup>

                            {/* Credit card mock form */}
                            {paymentMethod === 'credit_card' && (
                                <Box sx={{ mt: 2, p: 2.5, border: '1px solid #f0f0f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    <TextField placeholder="Card number" size="small" disabled value="**** **** **** 4242"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <TextField placeholder="MM/YY" size="small" disabled value="12/28"
                                            sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                        <TextField placeholder="CVV" size="small" disabled value="***"
                                            sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                    </Box>
                                    <Typography sx={{ fontSize: 11, color: '#aaa', textAlign: 'center' }}>
                                        This is a simulated payment — no real transaction will occur.
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Discount */}
                        <Box sx={{ borderTop: '1px solid #f0f0f0', pt: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 2, color: '#1a1a1a' }}>
                                Discount Code
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                    placeholder="Enter code"
                                    size="small"
                                    sx={{
                                        flex: 1,
                                        '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e8e8e8' },
                                    }}
                                />
                                <VButton
                                    variant="primary"
                                    onClick={handleApplyDiscount}
                                    loading={applyingDiscount}
                                    sx={{ borderRadius: '10px' }}
                                >
                                    Apply
                                </VButton>
                            </Box>
                            {discountResult && (
                                <Typography sx={{ mt: 1.5, fontSize: 13, color: '#2e7d32', fontWeight: 600 }}>
                                    Discount: -${Number(discountResult.discount_amount).toFixed(2)}
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {/* Right — order summary */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 380 },
                            flexShrink: 0,
                            bgcolor: '#fafafa',
                            borderRadius: '20px',
                            p: 3,
                            alignSelf: 'flex-start',
                            position: { md: 'sticky' },
                            top: { md: 88 },
                        }}
                    >
                        <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 2, color: '#1a1a1a' }}>
                            Order Summary
                        </Typography>

                        {checkoutData.items.map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography sx={{ fontSize: 13, color: '#555', flex: 1 }}>
                                    {item.product_name} x{item.quantity}
                                </Typography>
                                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                                    ${Number(item.line_total).toFixed(2)}
                                </Typography>
                            </Box>
                        ))}

                        <Box sx={{ borderTop: '1px solid #e8e8e8', mt: 2, pt: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography sx={{ color: '#666', fontSize: 14 }}>Subtotal</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>${Number(checkoutData.subtotal).toFixed(2)}</Typography>
                            </Box>
                            {discountResult && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography sx={{ color: '#2e7d32', fontSize: 14 }}>Discount</Typography>
                                    <Typography sx={{ color: '#2e7d32', fontWeight: 600, fontSize: 14 }}>
                                        -${Number(discountResult.discount_amount).toFixed(2)}
                                    </Typography>
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography sx={{ color: '#666', fontSize: 14 }}>Shipping</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: 14, color: shippingFee === 0 ? '#2e7d32' : '#1a1a1a' }}>
                                    {shippingFee === 0 ? 'Free' : `+$${shippingFee.toFixed(2)}`}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ borderTop: '1px solid #e8e8e8', mt: 2, pt: 2, display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#1a1a1a' }}>Total</Typography>
                            <Typography sx={{ fontWeight: 800, fontSize: 22, color: '#1a1a1a' }}>
                                ${Number(finalTotal).toFixed(2)}
                            </Typography>
                        </Box>

                        <VButton
                            variant="secondary"
                            fullWidth
                            size="large"
                            onClick={handlePlaceOrder}
                            loading={placing}
                            disabled={!selectedAddress}
                            sx={{ borderRadius: '10px' }}
                        >
                            Place Order
                        </VButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
