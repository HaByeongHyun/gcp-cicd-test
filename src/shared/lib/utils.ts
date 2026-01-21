import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { parseStringPromise } from 'xml2js';

/**
 * Tailwind CSS 클래스 병합 유틸리티
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 검색어에서 위험한 문자 제거
 */
export const sanitizeSearchQuery = (query: string): string => {
  return query
    .trim()
    .replace(/[<>"'&]/g, '')
    .slice(0, 100);
};

/**
 * HTML 태그 제거
 */
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  return text.replace(/<[^>]*>/g, '').trim();
};

// XML을 JSON으로 변환
export const xmlToJson = <T>(xml: string): Promise<T> => {
  const jsonData = parseStringPromise(xml, {
    explicitArray: false,
    trim: true,
    normalize: true,
    normalizeTags: false,
    mergeAttrs: true,
  });

  return jsonData as Promise<T>;
};
