import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '플랜더플레이 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            개인정보처리방침
          </h1>

          <div className="space-y-8 text-gray-700">
            {/* 기본 정보 */}
            <section>
              <p className="text-sm text-gray-500">
                최종 수정일: {new Date().toLocaleDateString('ko-KR')}
              </p>
              <p className="mt-4">
                플랜더플레이(이하 &quot;본 서비스&quot;)는 사용자의
                개인정보보호를 매우 중요하게 생각합니다. 본 개인정보처리방침은
                본 서비스가 어떤 정보를 수집하고 어떻게 사용하는지 설명합니다.
              </p>
            </section>

            {/* 1. 수집하는 정보 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                1. 수집하는 정보
              </h2>
              <div className="space-y-3">
                <p>
                  본 서비스는 회원가입이나 로그인 기능을 제공하지 않으며,
                  사용자로부터 직접적으로 개인정보를 수집하지 않습니다.
                </p>
                <p className="font-medium">
                  다만, 다음의 정보가 자동으로 수집될 수 있습니다:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>쿠키 및 유사 기술:</strong> 웹사이트 이용 분석 및
                    광고 제공을 위해 쿠키를 사용합니다
                  </li>
                  <li>
                    <strong>로그 데이터:</strong> IP 주소, 브라우저 종류, 접속
                    시간, 페이지 조회 기록 등
                  </li>
                  <li>
                    <strong>광고 관련 정보:</strong> Google AdSense를 통한 광고
                    제공 시 구글이 수집하는 정보
                  </li>
                </ul>
              </div>
            </section>

            {/* 2. 정보 사용 목적 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                2. 정보 사용 목적
              </h2>
              <p>수집된 정보는 다음의 목적으로 사용됩니다:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>서비스 제공 및 개선</li>
                <li>웹사이트 트래픽 분석</li>
                <li>사용자 경험 최적화</li>
                <li>맞춤형 광고 제공</li>
              </ul>
            </section>

            {/* 3. 제3자 서비스 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                3. 제3자 서비스 (Google AdSense)
              </h2>
              <div className="space-y-3">
                <p>
                  본 서비스는 광고 제공을 위해 Google AdSense를 사용합니다.
                  Google은 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키를
                  사용할 수 있습니다.
                </p>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="font-medium text-blue-900">
                    광고 맞춤설정 해제 방법:
                  </p>
                  <ul className="mt-2 ml-6 list-disc space-y-1 text-sm text-blue-800">
                    <li>
                      Google 광고 설정 페이지:{' '}
                      <a
                        href="https://www.google.com/settings/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-600"
                      >
                        https://www.google.com/settings/ads
                      </a>
                    </li>
                    <li>브라우저 쿠키 설정에서 제3자 쿠키 차단</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. 쿠키 사용 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                4. 쿠키 사용
              </h2>
              <p>
                쿠키는 웹사이트가 사용자의 브라우저에 저장하는 작은 텍스트
                파일입니다. 본 서비스는 다음과 같은 쿠키를 사용합니다:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>필수 쿠키:</strong> 웹사이트 기본 기능 제공
                </li>
                <li>
                  <strong>분석 쿠키:</strong> 웹사이트 사용 패턴 분석
                </li>
                <li>
                  <strong>광고 쿠키:</strong> 맞춤형 광고 제공
                </li>
              </ul>
              <p className="mt-3">
                사용자는 브라우저 설정을 통해 쿠키를 거부하거나 삭제할 수
                있습니다. 단, 이 경우 일부 서비스 이용이 제한될 수 있습니다.
              </p>
            </section>

            {/* 5. 정보 보유 기간 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                5. 정보 보유 기간
              </h2>
              <p>
                자동으로 수집된 정보는 수집 목적이 달성된 후 지체 없이
                파기됩니다. 단, 법령에 따라 보관이 필요한 경우 해당 기간 동안
                보관합니다.
              </p>
            </section>

            {/* 6. 사용자 권리 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                6. 사용자의 권리
              </h2>
              <p>사용자는 다음과 같은 권리를 가집니다:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>쿠키 사용 거부 및 삭제</li>
                <li>광고 맞춤설정 해제</li>
                <li>개인정보처리방침에 대한 문의</li>
              </ul>
            </section>

            {/* 7. 어린이 개인정보 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                7. 어린이의 개인정보 보호
              </h2>
              <p>
                본 서비스는 만 14세 미만 어린이를 대상으로 하지 않으며,
                의도적으로 어린이의 개인정보를 수집하지 않습니다.
              </p>
            </section>

            {/* 8. 개인정보처리방침 변경 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                8. 개인정보처리방침의 변경
              </h2>
              <p>
                본 개인정보처리방침은 법령 및 서비스 정책 변경에 따라 수정될 수
                있습니다. 변경 사항은 본 페이지를 통해 공지됩니다.
              </p>
            </section>

            {/* 9. 문의 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                9. 문의하기
              </h2>
              <p>
                개인정보처리방침에 대한 문의사항이 있으시면 아래로 연락 주시기
                바랍니다:
              </p>
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="font-medium">서비스 운영자: 플랜더플레이</p>
                <p className="mt-2">
                  이메일:{' '}
                  <a
                    href="mailto:contact.soulha@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    contact.soulha@gmail.com
                  </a>
                </p>
              </div>
            </section>

            {/* 외부 링크 */}
            <section className="border-t pt-6">
              <h3 className="mb-3 font-semibold text-gray-900">관련 링크</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google 개인정보처리방침
                  </a>
                </li>
                <li>
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google 광고 작동 방식
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
