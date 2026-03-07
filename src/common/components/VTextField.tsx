import React from 'react';
import {
    TextField,
    Autocomplete,
    MenuItem,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

// ── Option type for dropdown / search-dropdown ──
export interface VTextFieldOption {
    label: string;
    value: string | number;
}

// ── Field type discriminator ──
export type VFieldType =
    | 'text'
    | 'number'
    | 'date'
    | 'password'
    | 'dropdown'
    | 'search-dropdown';

// ── Props ──
export interface VTextFieldProps {
    /** Which kind of input to render */
    fieldType: VFieldType;
    /** Field label shown above the input */
    label?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Current value */
    value?: string | number | null;
    /** Change handler – always returns the raw value */
    onChange?: (value: string | number | null) => void;
    /** Validation error message; truthy = error state */
    error?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Full width (default true) */
    fullWidth?: boolean;
    /** MUI size */
    size?: 'small' | 'medium';
    /** Required indicator */
    required?: boolean;
    /** HTML id */
    id?: string;
    /** Options for dropdown / search-dropdown */
    options?: VTextFieldOption[];
    /** Extra sx props */
    sx?: SxProps<Theme>;
}

/** Shared Volta brand styling for all text fields */
const voltaSx: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontFamily: "'Lato', sans-serif",
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0d0d0d',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0d0d0d',
            borderWidth: '1.5px',
        },
    },
    '& .MuiInputLabel-root': {
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 700,
        fontSize: '13px',
        '&.Mui-focused': {
            color: '#0d0d0d',
        },
    },
};

/**
 * text | number | date | password | dropdown | search-dropdown
 */
export const VTextField: React.FC<VTextFieldProps> = ({
    fieldType,
    label,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    fullWidth = true,
    size = 'small',
    required = false,
    id,
    options = [],
    sx: extraSx,
}) => {
    const mergedSx: SxProps<Theme> = [
        ...(Array.isArray(voltaSx) ? voltaSx : [voltaSx]),
        ...(extraSx ? (Array.isArray(extraSx) ? extraSx : [extraSx]) : []),
    ];

    // ── Search Dropdown (Autocomplete) ──
    if (fieldType === 'search-dropdown') {
        const selectedOption = options.find((o) => o.value === value) ?? null;

        return (
            <Autocomplete
                id={id}
                options={options}
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.label
                }
                value={selectedOption}
                onChange={(_e, newVal) => {
                    if (newVal === null) {
                        onChange?.(null);
                    } else if (typeof newVal === 'string') {
                        onChange?.(newVal);
                    } else {
                        onChange?.(newVal.value);
                    }
                }}
                freeSolo
                disabled={disabled}
                fullWidth={fullWidth}
                size={size}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        required={required}
                        error={!!error}
                        helperText={error}
                        sx={mergedSx}
                    />
                )}
            />
        );
    }

    // ── Dropdown (Select) ──
    if (fieldType === 'dropdown') {
        return (
            <TextField
                id={id}
                select
                label={label}
                placeholder={placeholder}
                value={value ?? ''}
                onChange={(e) => onChange?.(e.target.value)}
                error={!!error}
                helperText={error}
                disabled={disabled}
                fullWidth={fullWidth}
                size={size}
                required={required}
                sx={mergedSx}
            >
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </TextField>
        );
    }

    // ── Standard inputs (text | number | date | password) ──
    const inputTypeMap: Record<string, string> = {
        text: 'text',
        number: 'number',
        date: 'date',
        password: 'password',
    };

    return (
        <TextField
            id={id}
            type={inputTypeMap[fieldType]}
            label={label}
            placeholder={placeholder}
            value={value ?? ''}
            onChange={(e) => {
                const raw = e.target.value;
                if (fieldType === 'number') {
                    onChange?.(raw === '' ? null : Number(raw));
                } else {
                    onChange?.(raw);
                }
            }}
            error={!!error}
            helperText={error}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size}
            required={required}
            slotProps={{
                inputLabel: fieldType === 'date' ? { shrink: true } : undefined,
            }}
            sx={mergedSx}
        />
    );
};
