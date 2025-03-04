'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  comments: number;
  likes: number;
}

const dummyPosts: Post[] = [
  {
    id: 1,
    title: '첫 번째 게시글입니다',
    author: '작성자1',
    date: '2024-02-24',
    views: 150,
    comments: 5,
    likes: 10,
  },
  {
    id: 2,
    title: '비트코인 가격 전망',
    author: '작성자2',
    date: '2024-02-25',
    views: 320,
    comments: 12,
    likes: 25,
  },
  {
    id: 3,
    title: '이더리움 2.0 업데이트 소식',
    author: '작성자3',
    date: '2024-02-26',
    views: 280,
    comments: 8,
    likes: 15,
  },
  {
    id: 4,
    title: '암호화폐 투자 전략',
    author: '작성자4',
    date: '2024-02-27',
    views: 210,
    comments: 6,
    likes: 12,
  },
  {
    id: 5,
    title: '블록체인 기술의 미래',
    author: '작성자5',
    date: '2024-02-28',
    views: 175,
    comments: 4,
    likes: 8,
  },
  {
    id: 6,
    title: 'NFT 시장 동향 분석',
    author: '작성자6',
    date: '2024-03-01',
    views: 230,
    comments: 9,
    likes: 18,
  },
  {
    id: 7,
    title: '디파이(DeFi) 프로젝트 추천',
    author: '작성자7',
    date: '2024-03-02',
    views: 195,
    comments: 7,
    likes: 14,
  },
  {
    id: 8,
    title: '암호화폐 세금 관련 정보',
    author: '작성자8',
    date: '2024-03-03',
    views: 310,
    comments: 15,
    likes: 22,
  },
  {
    id: 9,
    title: '비트코인 채굴 수익성 분석',
    author: '작성자9',
    date: '2024-03-04',
    views: 265,
    comments: 11,
    likes: 19,
  },
  {
    id: 10,
    title: '알트코인 추천 목록',
    author: '작성자10',
    date: '2024-03-05',
    views: 290,
    comments: 13,
    likes: 24,
  },
  {
    id: 11,
    title: '암호화폐 지갑 비교 분석',
    author: '작성자11',
    date: '2024-03-06',
    views: 185,
    comments: 6,
    likes: 11,
  },
  {
    id: 12,
    title: '블록체인 개발자 로드맵',
    author: '작성자12',
    date: '2024-03-07',
    views: 220,
    comments: 8,
    likes: 16,
  },
  {
    id: 13,
    title: '암호화폐 거래소 보안 이슈',
    author: '작성자13',
    date: '2024-03-08',
    views: 245,
    comments: 10,
    likes: 20,
  },
  {
    id: 14,
    title: '스테이블코인의 중요성',
    author: '작성자14',
    date: '2024-03-09',
    views: 170,
    comments: 5,
    likes: 9,
  },
  {
    id: 15,
    title: '비트코인 반감기 영향 분석',
    author: '작성자15',
    date: '2024-03-10',
    views: 330,
    comments: 14,
    likes: 28,
  },
  {
    id: 16,
    title: '암호화폐 규제 동향',
    author: '작성자16',
    date: '2024-03-11',
    views: 205,
    comments: 7,
    likes: 13,
  },
  {
    id: 17,
    title: '블록체인 게임 추천',
    author: '작성자17',
    date: '2024-03-12',
    views: 190,
    comments: 6,
    likes: 12,
  },
  {
    id: 18,
    title: '메타버스와 암호화폐',
    author: '작성자18',
    date: '2024-03-13',
    views: 275,
    comments: 12,
    likes: 23,
  },
  {
    id: 19,
    title: '비트코인 기술적 분석 방법',
    author: '작성자19',
    date: '2024-03-14',
    views: 240,
    comments: 9,
    likes: 17,
  },
  {
    id: 20,
    title: '암호화폐 장기 투자 전략',
    author: '작성자20',
    date: '2024-03-15',
    views: 295,
    comments: 13,
    likes: 26,
  },
  {
    id: 21,
    title: '블록체인 활용 사례 연구',
    author: '작성자21',
    date: '2024-03-16',
    views: 180,
    comments: 5,
    likes: 10,
  },
  {
    id: 22,
    title: '이더리움 가스비 절약 팁',
    author: '작성자22',
    date: '2024-03-17',
    views: 215,
    comments: 8,
    likes: 15,
  },
  {
    id: 23,
    title: '암호화폐 차트 분석 기초',
    author: '작성자23',
    date: '2024-03-18',
    views: 255,
    comments: 11,
    likes: 21,
  },
  {
    id: 24,
    title: '비트코인 ETF 영향 분석',
    author: '작성자24',
    date: '2024-03-19',
    views: 340,
    comments: 16,
    likes: 30,
  },
  {
    id: 25,
    title: '암호화폐 세금 신고 방법',
    author: '작성자25',
    date: '2024-03-20',
    views: 285,
    comments: 12,
    likes: 24,
  },
  {
    id: 26,
    title: '블록체인 일자리 전망',
    author: '작성자26',
    date: '2024-03-21',
    views: 200,
    comments: 7,
    likes: 14,
  },
  {
    id: 27,
    title: '암호화폐 레버리지 거래 위험성',
    author: '작성자27',
    date: '2024-03-22',
    views: 225,
    comments: 9,
    likes: 18,
  },
  {
    id: 28,
    title: '비트코인 채굴 장비 비교',
    author: '작성자28',
    date: '2024-03-23',
    views: 270,
    comments: 11,
    likes: 22,
  },
  {
    id: 29,
    title: '암호화폐 커뮤니티 추천',
    author: '작성자29',
    date: '2024-03-24',
    views: 165,
    comments: 4,
    likes: 9,
  },
  {
    id: 30,
    title: '블록체인 기술 입문 가이드',
    author: '작성자30',
    date: '2024-03-25',
    views: 305,
    comments: 14,
    likes: 27,
  },
];

export default function Board() {
  const { theme, setTheme } = useTheme();
  const [isPCVersion, setIsPCVersion] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // PC/모바일 버전 토글

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // mounted가 false면 아무것도 렌더링하지 않음
  if (!mounted) {
    return null;
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* 게시판 헤더 */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          게시판
        </h1>
      </div>

      {/* 게시판 필터/검색 */}
      <div className='flex flex-col sm:flex-row justify-between items-center mb-4 gap-4'>
        <div className='flex gap-2'>
          <select
            aria-label='게시글 정렬'
            className='rounded-md border-gray-300 text-[#9ca3af] h-[45px] p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          >
            <option>최신순</option>
            <option>인기순</option>
            <option>댓글순</option>
          </select>
        </div>
        <div className='flex gap-2 w-full h-[45px] sm:w-auto'>
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            className='rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 flex-1 sm:flex-none'
          />
          <button
            type='button'
            className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'
          >
            검색
          </button>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className='bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg'>
        {/* PC 버전 테이블 */}
        <table className='min-w-full divide-y divide-gray-200 hidden sm:table'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                번호
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                제목
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                작성자
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                작성일
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                조회
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200'>
            {dummyPosts.map((post) => (
              <tr
                key={post.id}
                className='hover:bg-gray-50 dark:hover:bg-gray-700'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                  {post.id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                  <Link
                    href={`/posts/${post.id}`}
                    className='hover:text-indigo-600 dark:hover:text-indigo-400'
                  >
                    {post.title}
                    <span className='ml-2 text-gray-500'>
                      ({post.comments})
                    </span>
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                  {post.author}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                  {post.date}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                  {post.views}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 모바일 버전 리스트 */}
        <div className='sm:hidden'>
          {dummyPosts.map((post) => (
            <div
              key={post.id}
              className='px-4 py-4 border-b border-gray-200 dark:border-gray-700'
            >
              <Link
                href={`/posts/${post.id}`}
                className='block hover:bg-gray-50 dark:hover:bg-gray-700'
              >
                <div className='flex justify-between items-baseline'>
                  <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
                    {post.title}
                  </h3>
                  <span className='text-sm text-gray-500'>
                    ({post.comments})
                  </span>
                </div>
                <div className='mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400'>
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                  <span>조회 {post.views}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className='mt-6 flex justify-center '>
        <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px '>
          <a
            href='#'
            className='relative inline-flex items-center px-2 py-2 rounded-l-md   bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          >
            이전
          </a>
          <a
            href='#'
            className='relative inline-flex items-center px-4 py-2   bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          >
            1
          </a>
          <a
            href='#'
            className='relative inline-flex items-center px-4 py-2   bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          >
            2
          </a>
          <a
            href='#'
            className='relative inline-flex items-center px-4 py-2   bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          >
            3
          </a>
          <a
            href='#'
            className='relative inline-flex items-center px-2 py-2 rounded-r-md   bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          >
            다음
          </a>
        </nav>
      </div>

      {/* 글쓰기 버튼 */}
      <div className='mt-6 flex justify-end'>
        <button
          type='button'
          className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'
        >
          글쓰기
        </button>
      </div>

      {/* Footer */}
      <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4'>
        <div className='max-w-7xl mx-auto flex justify-between items-center text-sm'>
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
              {theme === 'dark' ? '야간모드 ON' : '야간모드 OFF'}
            </button>
          </div>
          <button
            type='button'
            onClick={scrollToTop}
            className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          >
            맨위로 ▲
          </button>
        </div>
      </div>

      {/* Footer 여백 */}
      <div className='h-16'></div>
    </div>
  );
}
