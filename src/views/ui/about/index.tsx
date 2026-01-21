import type { Metadata } from 'next';
import AboutBanner from './Banner';
import AboutCTA from './CTA';
import AboutFeature from './Feature';
import AboutInfo from './Info';
import AboutSource from './Source';

export const metadata: Metadata = {
  title: '소개',
  description: '플랜더플레이 서비스 소개 - 공연 정보를 쉽고 빠르게 찾아보세요',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AboutBanner />
      <AboutInfo />
      <AboutFeature />
      <AboutSource />
      <AboutCTA />
    </div>
  );
}
