import React, { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // setTimeout으로 setDebouncedValue delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 호출될 때마다 handler clear up => 매 호출시마다 handler를 clear 해줌으로써
    // user가 typing 하는 동안에 search가 되지 않도록 막는다.
    // typing을 멈춘다면 clear 작업이 이루어지지 않기에 (willunmount X) setDebouncedValue가
    // 실행되면서 Search를 진행하게 된다.
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
