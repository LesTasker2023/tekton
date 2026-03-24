"use client";

import { useCallback, useMemo } from "react";
import { Box, Flex, Text } from "@sanity/ui";
import { set, type NumberInputProps } from "sanity";

/* ── Presets matching the site's ThemeContext ── */
const PRESETS = [
  { name: "Gold", hue: 48 },
  { name: "Cyan", hue: 187 },
  { name: "Rose", hue: 350 },
  { name: "Emerald", hue: 155 },
  { name: "Violet", hue: 270 },
  { name: "Blue", hue: 220 },
] as const;

/**
 * Visual hue picker for Sanity Studio.
 * Shows preset swatches, a full hue-spectrum slider, and a live colour preview.
 */
export function HuePickerInput(props: NumberInputProps) {
  const { value, onChange } = props;
  const hue = value ?? 220;

  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(set(Number(e.target.value)));
    },
    [onChange],
  );

  const handlePreset = useCallback(
    (h: number) => () => onChange(set(h)),
    [onChange],
  );

  const activePreset = useMemo(
    () => PRESETS.find((p) => p.hue === hue)?.name ?? null,
    [hue],
  );

  const previewColor = `hsl(${hue}, 90%, 45%)`;

  return (
    <Box>
      {/* ── Preset swatches ── */}
      <Flex gap={2} wrap="wrap" marginBottom={3}>
        {PRESETS.map((preset) => {
          const isActive = preset.hue === hue;
          return (
            <button
              key={preset.name}
              type="button"
              onClick={handlePreset(preset.hue)}
              title={`${preset.name} (${preset.hue}°)`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                border: isActive
                  ? `2px solid hsl(${preset.hue}, 90%, 45%)`
                  : "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                background: isActive
                  ? `hsla(${preset.hue}, 90%, 45%, 0.12)`
                  : "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: `hsl(${preset.hue}, 90%, 45%)`,
                  flexShrink: 0,
                  boxShadow: isActive
                    ? `0 0 8px hsla(${preset.hue}, 90%, 45%, 0.5)`
                    : "none",
                }}
              />
              <Text
                size={1}
                weight={isActive ? "bold" : "regular"}
                style={{
                  color: isActive
                    ? `hsl(${preset.hue}, 90%, 65%)`
                    : "inherit",
                }}
              >
                {preset.name}
              </Text>
            </button>
          );
        })}
      </Flex>

      {/* ── Hue spectrum slider ── */}
      <Flex align="center" gap={3}>
        {/* Live preview swatch */}
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: previewColor,
            boxShadow: `0 0 12px hsla(${hue}, 90%, 45%, 0.4)`,
            flexShrink: 0,
            transition: "background 0.1s ease, box-shadow 0.1s ease",
          }}
        />

        {/* Spectrum range input */}
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={hue}
            onChange={handleSlider}
            style={{
              width: "100%",
              height: 20,
              cursor: "pointer",
              WebkitAppearance: "none",
              appearance: "none", 
              background: "transparent",
            } as React.CSSProperties}
          />
          {/* Spectrum gradient track (rendered behind the native thumb) */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 8,
              borderRadius: 4,
              transform: "translateY(-50%)",
              pointerEvents: "none",
              background:
                "linear-gradient(to right, hsl(0,90%,45%), hsl(60,90%,45%), hsl(120,90%,45%), hsl(180,90%,45%), hsl(240,90%,45%), hsl(300,90%,45%), hsl(360,90%,45%))",
              zIndex: 0,
            }}
          />
          {/* Inline styles for the range thumb */}
          <style>{`
            /* Webkit (Chrome, Edge, Safari) */
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: white;
              border: 2px solid rgba(0,0,0,0.3);
              box-shadow: 0 1px 4px rgba(0,0,0,0.3);
              cursor: pointer;
              position: relative;
              z-index: 2;
            }
            input[type="range"]::-webkit-slider-runnable-track {
              background: transparent;
            }
            /* Firefox */
            input[type="range"]::-moz-range-thumb {
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: white;
              border: 2px solid rgba(0,0,0,0.3);
              box-shadow: 0 1px 4px rgba(0,0,0,0.3);
              cursor: pointer;
              position: relative;
              z-index: 2;
            }
            input[type="range"]::-moz-range-track {
              background: transparent;
            }
          `}</style>
        </div>

        {/* Numeric readout */}
        <Text
          size={2}
          weight="bold"
          style={{ minWidth: 36, textAlign: "right" }}
        >
          {hue}°
        </Text>
      </Flex>

      {/* Label */}
      <Text
        size={1}
        muted
        style={{ marginTop: 8 }}
      >
        {activePreset ? `${activePreset} preset` : "Custom hue"}
      </Text>
    </Box>
  );
}
