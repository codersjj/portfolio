import { useCallback, useRef, useEffect, useState } from 'react';

/**
 * 自定义 debounce hook，自动清理定时器防止内存泄漏
 * @param callback 要防抖的回调函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 保持回调函数的最新引用
  useEffect(() => {
    callbackRef.current = callback;
  });

  // 清理定时器
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // 组件卸载时清理定时器
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // 防抖函数
  const debouncedCallback = useCallback(
    ((...args: any[]) => {
      cleanup();
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
        timeoutRef.current = null;
      }, delay);
    }) as T,
    [delay, cleanup]
  );

  return debouncedCallback;
}

/**
 * 防抖状态 hook，用于控制状态的防抖设置
 * @param initialValue 初始值
 * @param delay 延迟时间（毫秒）
 * @returns [value, setValue, isPending] - 当前值、设置函数、是否处于等待状态
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number
): [T, (value: T) => void, boolean] {
  const [value, setValue] = useState(initialValue);
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const debouncedSetValue = useCallback(
    (newValue: T) => {
      cleanup();
      setIsPending(true);
      
      timeoutRef.current = setTimeout(() => {
        setValue(newValue);
        setIsPending(false);
        timeoutRef.current = null;
      }, delay);
    },
    [delay, cleanup]
  );

  return [value, debouncedSetValue, isPending];
}
