"use client";

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Heart, Sparkles, Lightbulb } from 'lucide-react';

interface ZodiacSign {
  korean: string;
  english: string;
  symbol: string;
  dateRange: string;
  element: string;
  planet: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  compatibility: string[];
  advice: string;
  luckyColors: string[];
  luckyNumbers: number[];
  description: string;
}

const zodiacData: Record<string, ZodiacSign> = {
  "양자리": {
    korean: "양자리",
    english: "Aries",
    symbol: "♈",
    dateRange: "3월 21일 - 4월 19일",
    element: "불",
    planet: "화성",
    traits: ["열정적", "독립적", "용기있는", "경쟁적", "직접적"],
    strengths: ["리더십", "용기", "결단력", "열정", "자신감"],
    weaknesses: ["성급함", "고집", "충동적", "인내심 부족", "자기중심적"],
    compatibility: ["사자자리", "사수자리", "쌍둥이자리", "물병자리"],
    advice: "때로는 한 발 물러서서 다른 사람의 관점을 고려해보세요. 인내심을 기르면 더 큰 성공을 얻을 수 있습니다.",
    luckyColors: ["빨간색", "주황색"],
    luckyNumbers: [1, 8, 17],
    description: "양자리는 황도 12궁의 첫 번째 별자리로, 새로운 시작과 개척정신을 상징합니다."
  },
  "황소자리": {
    korean: "황소자리",
    english: "Taurus",
    symbol: "♉",
    dateRange: "4월 20일 - 5월 20일",
    element: "땅",
    planet: "금성",
    traits: ["안정적", "신중한", "고집스러운", "실용적", "감각적"],
    strengths: ["신뢰성", "인내심", "충성심", "실용성", "예술 감각"],
    weaknesses: ["고집", "변화 거부", "물질주의", "느린 적응", "소유욕"],
    compatibility: ["처녀자리", "염소자리", "게자리", "물고기자리"],
    advice: "변화를 두려워하지 마세요. 새로운 경험이 당신의 삶을 더욱 풍요롭게 만들 것입니다.",
    luckyColors: ["초록색", "분홍색"],
    luckyNumbers: [2, 6, 9, 12, 24],
    description: "황소자리는 안정과 아름다움을 추구하며, 꾸준함과 실용성을 중시하는 별자리입니다."
  },
  "쌍둥이자리": {
    korean: "쌍둥이자리",
    english: "Gemini",
    symbol: "♊",
    dateRange: "5월 21일 - 6월 20일",
    element: "공기",
    planet: "수성",
    traits: ["호기심 많은", "적응력 있는", "말잘하는", "다재다능한", "변화무쌍한"],
    strengths: ["의사소통", "적응력", "지적 호기심", "유머 감각", "다재다능"],
    weaknesses: ["변덕", "집중력 부족", "피상적", "우유부단", "불안함"],
    compatibility: ["천칭자리", "물병자리", "양자리", "사자자리"],
    advice: "한 가지에 깊이 집중하는 시간을 가져보세요. 다양성도 좋지만 전문성도 중요합니다.",
    luckyColors: ["노란색", "하늘색"],
    luckyNumbers: [5, 7, 14, 23],
    description: "쌍둥이자리는 호기심과 의사소통의 별자리로, 다양성과 변화를 즐깁니다."
  },
  "게자리": {
    korean: "게자리",
    english: "Cancer",
    symbol: "♋",
    dateRange: "6월 21일 - 7월 22일",
    element: "물",
    planet: "달",
    traits: ["감정적", "보호적", "직관적", "가족중심적", "민감한"],
    strengths: ["공감 능력", "직감", "충성심", "보호 본능", "창의력"],
    weaknesses: ["감정 기복", "과민함", "소심함", "집착", "과거 집착"],
    compatibility: ["전갈자리", "물고기자리", "황소자리", "처녀자리"],
    advice: "감정을 건강하게 표현하는 방법을 배워보세요. 자신을 보호하되 고립되지는 마세요.",
    luckyColors: ["흰색", "은색", "바다색"],
    luckyNumbers: [2, 7, 11, 16, 20, 25],
    description: "게자리는 가정과 감정의 별자리로, 깊은 공감 능력과 보호 본능을 가지고 있습니다."
  },
  "사자자리": {
    korean: "사자자리",
    english: "Leo",
    symbol: "♌",
    dateRange: "7월 23일 - 8월 22일",
    element: "불",
    planet: "태양",
    traits: ["자신감 있는", "관대한", "창의적", "드라마틱한", "따뜻한"],
    strengths: ["리더십", "창의력", "관대함", "낙천성", "충성심"],
    weaknesses: ["자만심", "고집", "허영심", "독선", "관심받고 싶어함"],
    compatibility: ["양자리", "사수자리", "쌍둥이자리", "천칭자리"],
    advice: "다른 사람도 빛날 기회를 주세요. 진정한 리더는 다른 사람의 성공도 도와줍니다.",
    luckyColors: ["금색", "주황색", "빨간색"],
    luckyNumbers: [1, 3, 10, 19],
    description: "사자자리는 태양처럼 빛나는 별자리로, 자신감과 창의력, 리더십을 상징합니다."
  },
  "처녀자리": {
    korean: "처녀자리",
    english: "Virgo",
    symbol: "♍",
    dateRange: "8월 23일 - 9월 22일",
    element: "땅",
    planet: "수성",
    traits: ["완벽주의적", "분석적", "실용적", "세심한", "겸손한"],
    strengths: ["분석력", "세심함", "신뢰성", "근면성", "실용성"],
    weaknesses: ["완벽주의", "비판적", "걱정 많음", "소심함", "융통성 부족"],
    compatibility: ["황소자리", "염소자리", "게자리", "전갈자리"],
    advice: "완벽함을 추구하되 자신에게 너무 엄격하지 마세요. 때로는 실수도 배움의 기회입니다.",
    luckyColors: ["네이비", "회색", "갈색"],
    luckyNumbers: [6, 15, 20, 27],
    description: "처녀자리는 완벽함과 실용성을 추구하는 별자리로, 뛰어난 분석력을 가지고 있습니다."
  },
  "천칭자리": {
    korean: "천칭자리",
    english: "Libra",
    symbol: "♎",
    dateRange: "9월 23일 - 10월 22일",
    element: "공기",
    planet: "금성",
    traits: ["균형잡힌", "사교적", "외교적", "예술적", "평화주의적"],
    strengths: ["외교술", "공정성", "협력", "예술 감각", "사회성"],
    weaknesses: ["우유부단", "갈등 회피", "의존성", "팔랑귀", "결정 장애"],
    compatibility: ["쌍둥이자리", "물병자리", "사자자리", "사수자리"],
    advice: "때로는 확고한 결정을 내리는 용기가 필요합니다. 모든 사람을 만족시킬 수는 없습니다.",
    luckyColors: ["파란색", "분홍색", "연두색"],
    luckyNumbers: [4, 6, 13, 15, 24],
    description: "천칭자리는 균형과 조화의 별자리로, 공정함과 아름다움을 추구합니다."
  },
  "전갈자리": {
    korean: "전갈자리",
    english: "Scorpio",
    symbol: "♏",
    dateRange: "10월 23일 - 11월 21일",
    element: "물",
    planet: "명왕성",
    traits: ["강렬한", "신비로운", "집중적", "정열적", "직관적"],
    strengths: ["결단력", "집중력", "직관", "충성심", "변화 적응"],
    weaknesses: ["질투심", "복수심", "의심", "집착", "비밀주의"],
    compatibility: ["게자리", "물고기자리", "처녀자리", "염소자리"],
    advice: "신뢰하고 용서하는 법을 배워보세요. 깊은 감정도 때로는 놓아줄 줄 알아야 합니다.",
    luckyColors: ["검은색", "짙은 빨간색", "보라색"],
    luckyNumbers: [8, 11, 18, 22],
    description: "전갈자리는 강렬함과 변화의 별자리로, 깊은 통찰력과 재생의 힘을 가지고 있습니다."
  },
  "사수자리": {
    korean: "사수자리",
    english: "Sagittarius",
    symbol: "♐",
    dateRange: "11월 22일 - 12월 21일",
    element: "불",
    planet: "목성",
    traits: ["모험적", "낙천적", "철학적", "자유로운", "솔직한"],
    strengths: ["낙천성", "모험심", "정직함", "관대함", "학습욕"],
    weaknesses: ["무책임", "성급함", "과신", "불륜", "집중력 부족"],
    compatibility: ["양자리", "사자자리", "천칭자리", "물병자리"],
    advice: "큰 그림을 보는 것도 좋지만, 세부사항에도 관심을 가져보세요. 책임감도 중요합니다.",
    luckyColors: ["보라색", "청록색"],
    luckyNumbers: [3, 9, 15, 21, 30],
    description: "사수자리는 자유와 모험의 별자리로, 끝없는 탐구심과 낙천성을 가지고 있습니다."
  },
  "염소자리": {
    korean: "염소자리",
    english: "Capricorn",
    symbol: "♑",
    dateRange: "12월 22일 - 1월 19일",
    element: "땅",
    planet: "토성",
    traits: ["야심적", "실용적", "책임감 있는", "보수적", "인내심 있는"],
    strengths: ["야심", "인내", "책임감", "현실성", "지구력"],
    weaknesses: ["완고함", "비관주의", "권위주의", "냉정함", "물질주의"],
    compatibility: ["황소자리", "처녀자리", "전갈자리", "물고기자리"],
    advice: "성공만이 전부가 아닙니다. 인간관계와 개인적 행복도 소중히 여기세요.",
    luckyColors: ["검은색", "갈색", "짙은 녹색"],
    luckyNumbers: [10, 15, 20, 28],
    description: "염소자리는 성취와 책임의 별자리로, 끈기와 야심을 통해 목표를 달성합니다."
  },
  "물병자리": {
    korean: "물병자리",
    english: "Aquarius",
    symbol: "♒",
    dateRange: "1월 20일 - 2월 18일",
    element: "공기",
    planet: "천왕성",
    traits: ["독창적", "인도주의적", "독립적", "미래지향적", "진보적"],
    strengths: ["독창성", "인도주의", "독립성", "지적 능력", "친화력"],
    weaknesses: ["냉정함", "고집", "예측 불가", "감정 회피", "비현실적"],
    compatibility: ["쌍둥이자리", "천칭자리", "양자리", "사수자리"],
    advice: "혁신적인 아이디어도 좋지만, 현실적 실행 방안도 고려해보세요. 감정도 소중합니다.",
    luckyColors: ["청록색", "은색", "파란색"],
    luckyNumbers: [4, 7, 11, 22, 29],
    description: "물병자리는 혁신과 미래의 별자리로, 독창적 사고와 인도주의 정신을 가지고 있습니다."
  },
  "물고기자리": {
    korean: "물고기자리",
    english: "Pisces",
    symbol: "♓",
    dateRange: "2월 19일 - 3월 20일",
    element: "물",
    planet: "해왕성",
    traits: ["감성적", "직관적", "창의적", "동정심 많은", "꿈많은"],
    strengths: ["공감 능력", "창의력", "직관", "동정심", "적응력"],
    weaknesses: ["우유부단", "현실 도피", "과민함", "의존적", "혼란스러움"],
    compatibility: ["게자리", "전갈자리", "황소자리", "염소자리"],
    advice: "꿈과 현실의 균형을 찾아보세요. 직감도 중요하지만 논리적 사고도 필요합니다.",
    luckyColors: ["바닷빛", "라벤더", "은색"],
    luckyNumbers: [7, 12, 16, 21, 29],
    description: "물고기자리는 직관과 동정의 별자리로, 깊은 감성과 예술적 재능을 가지고 있습니다."
  }
};

const getElementColor = (element: string) => {
  switch (element) {
    case "불": return "text-red-600 bg-red-50";
    case "물": return "text-blue-600 bg-blue-50";
    case "공기": return "text-sky-600 bg-sky-50";
    case "땅": return "text-amber-700 bg-amber-50";
    default: return "text-gray-600 bg-gray-50";
  }
};

export default function ZodiacInfoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sign = searchParams.get('sign') as string;
  
  const zodiacInfo = zodiacData[sign];

  if (!zodiacInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">별자리 정보를 찾을 수 없습니다</CardTitle>
            <CardDescription>올바른 별자리 이름을 확인해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/')} className="w-full">
              홈으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-secondary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로 가기
          </Button>
          <h1 className="text-lg font-semibold text-primary">{zodiacInfo.korean}</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-4 animate-bounce">{zodiacInfo.symbol}</div>
          <h1 className="text-4xl font-bold text-secondary mb-2">
            {zodiacInfo.korean}
          </h1>
          <p className="text-xl text-primary mb-2">{zodiacInfo.english}</p>
          <p className="text-lg text-muted-foreground mb-4">{zodiacInfo.dateRange}</p>
          <p className="text-gray-600 max-w-2xl mx-auto">{zodiacInfo.description}</p>
        </div>

        {/* Basic Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Sparkles className="h-5 w-5" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">원소:</span>
                <Badge className={getElementColor(zodiacInfo.element)}>
                  {zodiacInfo.element}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">지배 행성:</span>
                <span className="text-primary font-medium">{zodiacInfo.planet}</span>
              </div>
              <div className="space-y-2">
                <span className="font-medium">행운의 색상:</span>
                <div className="flex gap-2 flex-wrap">
                  {zodiacInfo.luckyColors.map((color, index) => (
                    <Badge key={index} variant="outline" className="text-primary border-primary">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-medium">행운의 숫자:</span>
                <div className="flex gap-2 flex-wrap">
                  {zodiacInfo.luckyNumbers.map((number, index) => (
                    <Badge key={index} variant="outline" className="text-secondary border-secondary">
                      {number}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Star className="h-5 w-5" />
                성격 특징
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {zodiacInfo.traits.map((trait, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">장점</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {zodiacInfo.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-700">주의할 점</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {zodiacInfo.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center gap-2 text-orange-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    {weakness}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Compatibility and Advice */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Heart className="h-5 w-5" />
                궁합이 좋은 별자리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {zodiacInfo.compatibility.map((compatibleSign, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg text-center cursor-pointer hover:from-primary/20 hover:to-secondary/20 transition-colors"
                    onClick={() => router.push(`/zodiac?sign=${compatibleSign}`)}
                  >
                    <span className="font-medium text-secondary">{compatibleSign}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Lightbulb className="h-5 w-5" />
                인생 조언
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{zodiacInfo.advice}</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation to other signs */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-center text-secondary">다른 별자리 보기</CardTitle>
            <CardDescription className="text-center">
              클릭하여 다른 별자리 정보를 확인해보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Object.keys(zodiacData).map((signKey) => (
                <Button
                  key={signKey}
                  variant={signKey === sign ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/zodiac?sign=${signKey}`)}
                  className="h-auto py-3 flex flex-col items-center gap-1"
                >
                  <span className="text-lg">{zodiacData[signKey].symbol}</span>
                  <span className="text-xs">{zodiacData[signKey].korean}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}