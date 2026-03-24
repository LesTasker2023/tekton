"use client";

import { useCallback } from "react";
import { Flex, Text } from "@sanity/ui";
import { set, type NumberInputProps } from "sanity";

/**
 * Custom Sanity input — renders a native range slider with a numeric readout.
 * Reads min/max/step from the field's `options` (falls back to 0-100).
 */
export function SliderInput(props: NumberInputProps) {
  const { value, onChange, schemaType } = props;
  const opts = (schemaType as any)?.options ?? {};
  const min = opts.sliderMin ?? 0;
  const max = opts.sliderMax ?? 100;
  const step = opts.sliderStep ?? 1;
  const current = value ?? min;
  const suffix = max <= 100 ? "%" : "";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(set(Number(e.target.value)));
    },
    [onChange],
  );

  return (
    <Flex align="center" gap={3}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={handleChange}
        style={{
          flex: 1,
          cursor: "pointer",
        }}
      />
      <Text size={2} weight="bold" style={{ minWidth: 42, textAlign: "right" }}>
        {current}{suffix}
      </Text>
    </Flex>
  );
}
