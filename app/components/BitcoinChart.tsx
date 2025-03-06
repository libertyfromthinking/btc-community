'use client';

import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PriceData {
  time: string;
  date: string;
  value: number;
}

interface BinanceKlineData {
  0: number; // openTime
  4: string; // closePrice
  [key: number]: number | string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: PriceData;
  }>;
  label?: string;
}

export default function BitcoinChart() {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const endTime = Date.now();
        const startTime = endTime - 3 * 24 * 60 * 60 * 1000;

        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=2h&startTime=${startTime}&endTime=${endTime}`
        );
        const data: BinanceKlineData[] = await response.json();

        const prices: PriceData[] = data.map((item) => {
          const date = new Date(item[0]);
          return {
            time: date.toLocaleString('ko-KR', {
              month: 'numeric',
              day: 'numeric',
            }),
            date: date.toLocaleString('ko-KR', {
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }),
            value: parseFloat(item[4]),
          };
        });

        setPriceData(prices);
        setCurrentPrice(prices[prices.length - 1].value);

        // 현재 시간 설정
        const now = new Date();
        setCurrentTime(
          now.toLocaleString('ko-KR', {
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        );
      } catch (error) {
        console.error('Failed to fetch Bitcoin data:', error);
      }
    };

    fetchBitcoinData();
    const interval = setInterval(fetchBitcoinData, 60000);
    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-gray-900 p-2 rounded-md text-sm'>
          <p className='text-gray-400'>{payload[0].payload.date}</p>
          <p className='text-white font-semibold'>
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow'>
      <div className='flex flex-col gap-1 mb-2'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            비트코인 (BTC/USDT)
          </h2>
          {currentPrice && (
            <span className='text-lg font-bold text-gray-900 dark:text-white'>
              ${currentPrice.toLocaleString()}
            </span>
          )}
        </div>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          기준시간: {currentTime}
        </span>
      </div>
      <div className='h-[100px] w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={priceData}>
            <defs>
              <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#4F46E5' stopOpacity={0.3} />
                <stop offset='95%' stopColor='#4F46E5' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey='time'
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={5}
              hide={true}
            />
            <YAxis hide={true} domain={['dataMin', 'dataMax']} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type='monotone'
              dataKey='value'
              stroke='#4F46E5'
              strokeWidth={2}
              fill='url(#colorValue)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
