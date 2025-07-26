import React, { ReactNode, useLayoutEffect, useRef } from 'react';
import { Box } from '@mui/material';

type ScaleFontProps = { children: ReactNode; fontScale?: number };

export default function ScaleFont({ children, fontScale = 1 }: ScaleFontProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // ⬇️ Map معمولی تا بتوانیم پیمایش و برگردانی انجام دهیم
  const originalsRef = useRef<Map<HTMLElement, string>>(new Map());

  /** تمام leafها را پیدا می‌کند و در صورت نیاز اندازهٔ فونت را ضرب می‌کند */
  const scaleNewLeaves = (factor: number) => {
    if (!rootRef.current || factor === 1) return;

    const walker = document.createTreeWalker(
      rootRef.current,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          const el = node as HTMLElement;
          return el.children.length === 0 && el.textContent?.trim()
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      },
    );

    while (walker.nextNode()) {
      const el = walker.currentNode as HTMLElement;
      if (originalsRef.current.has(el)) continue;           // قبلاً مقیاس شده

      const basePx = parseFloat(getComputedStyle(el).fontSize);
      if (!basePx) continue;

      originalsRef.current.set(el, el.style.fontSize);      // ذخیره مقدار اولیه
      el.style.fontSize = `${basePx * factor}px`;           // ضرب
    }
  };

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    /* بار اول + هر بار تغییر ضریب */
    scaleNewLeaves(fontScale);

    /* اگر نود جدیدی وارد درخت شود، همان ضریب رویش اعمال شود */
    const mo = new MutationObserver(() => scaleNewLeaves(fontScale));
    mo.observe(rootRef.current, { childList: true, subtree: true });

    /* پاک‌سازی: برگرداندن همهٔ اندازه‌ها و قطع Observer */
    return () => {
      mo.disconnect();
      originalsRef.current.forEach((prev, el) => {
        el.style.fontSize = prev;
      });
      originalsRef.current.clear();
    };
  }, [fontScale]);

  return (
    <Box ref={rootRef} sx={{ width: '100%', height: '100%' }}>
      {children}
    </Box>
  );
}