import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Heart, DollarSign } from 'lucide-react';

const zodiacData = {
  aries: {
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    dates: 'March 21 - April 19',
    traits: ['Energetic', 'Confident', 'Pioneering', 'Independent'],
    description: 'Aries individuals are natural leaders with boundless energy and enthusiasm. They approach life with courage and determination, always ready to take on new challenges.',
    compatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    career: 'Aries thrive in leadership positions and careers that offer independence and variety. They excel in entrepreneurship, sales, sports, and emergency services.',
    health: 'Focus on managing stress and avoiding burnout. Regular physical activity is essential for Aries to channel their abundant energy.',
    color: '#FF6B6B',
    luckyNumbers: [1, 8, 17, 26, 35],
    planet: 'Mars',
    modality: 'Cardinal'
  },
  taurus: {
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    dates: 'April 20 - May 20',
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted'],
    description: 'Taurus individuals value stability and comfort. They are known for their patience, reliability, and appreciation for the finer things in life.',
    compatibility: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
    career: 'Taurus excel in careers that offer security and allow them to work with their hands. They thrive in agriculture, banking, art, and real estate.',
    health: 'Pay attention to neck and throat health. Maintain a balanced diet and avoid overindulgence in rich foods.',
    color: '#4ECDC4',
    luckyNumbers: [2, 6, 9, 12, 24],
    planet: 'Venus',
    modality: 'Fixed'
  },
  gemini: {
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    dates: 'May 21 - June 20',
    traits: ['Curious', 'Adaptable', 'Communicative', 'Witty'],
    description: 'Gemini individuals are intellectually curious and socially adaptable. They love learning, communicating, and exploring new ideas and experiences.',
    compatibility: ['Libra', 'Aquarius', 'Aries', 'Leo'],
    career: 'Geminis excel in communication-based careers such as journalism, teaching, sales, and social media marketing.',
    health: 'Focus on respiratory health and avoid mental overstimulation. Regular breaks and mindfulness practices are beneficial.',
    color: '#FFE66D',
    luckyNumbers: [5, 7, 14, 23, 32],
    planet: 'Mercury',
    modality: 'Mutable'
  },
  cancer: {
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    dates: 'June 21 - July 22',
    traits: ['Nurturing', 'Intuitive', 'Protective', 'Emotional'],
    description: 'Cancer individuals are deeply intuitive and emotionally intelligent. They value family, home, and security above all else.',
    compatibility: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    career: 'Cancers thrive in caring professions such as healthcare, childcare, counseling, and hospitality.',
    health: 'Pay attention to digestive health and emotional wellbeing. Stress management is crucial for overall health.',
    color: '#95A5A6',
    luckyNumbers: [2, 7, 11, 16, 20],
    planet: 'Moon',
    modality: 'Cardinal'
  },
  leo: {
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    dates: 'July 23 - August 22',
    traits: ['Confident', 'Generous', 'Creative', 'Dramatic'],
    description: 'Leo individuals are natural performers who love being in the spotlight. They are generous, warm-hearted, and have a strong sense of pride.',
    compatibility: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
    career: 'Leos excel in creative fields, entertainment, leadership roles, and any career that allows them to shine and inspire others.',
    health: 'Focus on heart health and maintain regular exercise. Avoid excessive pride that might prevent seeking help when needed.',
    color: '#F39C12',
    luckyNumbers: [1, 3, 10, 19, 28],
    planet: 'Sun',
    modality: 'Fixed'
  },
  virgo: {
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    dates: 'August 23 - September 22',
    traits: ['Analytical', 'Practical', 'Helpful', 'Perfectionist'],
    description: 'Virgo individuals are detail-oriented perfectionists who love helping others. They are practical, analytical, and have a strong work ethic.',
    compatibility: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
    career: 'Virgos excel in healthcare, research, editing, accounting, and any field requiring attention to detail and precision.',
    health: 'Pay attention to digestive health and avoid excessive worry. Regular routines and stress management are important.',
    color: '#27AE60',
    luckyNumbers: [6, 15, 20, 27, 42],
    planet: 'Mercury',
    modality: 'Mutable'
  },
  libra: {
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    dates: 'September 23 - October 22',
    traits: ['Diplomatic', 'Balanced', 'Social', 'Artistic'],
    description: 'Libra individuals seek harmony and balance in all aspects of life. They are diplomatic, charming, and have a strong appreciation for beauty.',
    compatibility: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
    career: 'Libras thrive in law, diplomacy, art, design, and any career involving mediation or working with people.',
    health: 'Focus on kidney health and maintaining work-life balance. Avoid indecision that can lead to stress.',
    color: '#E74C3C',
    luckyNumbers: [6, 15, 24, 33, 42],
    planet: 'Venus',
    modality: 'Cardinal'
  },
  scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    dates: 'October 23 - November 21',
    traits: ['Intense', 'Passionate', 'Mysterious', 'Determined'],
    description: 'Scorpio individuals are intense and passionate beings who love diving deep into life\'s mysteries. They are determined, loyal, and transformative.',
    compatibility: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
    career: 'Scorpios excel in psychology, research, investigation, surgery, and any field requiring depth and transformation.',
    health: 'Pay attention to reproductive health and emotional wellbeing. Channel intense emotions in healthy ways.',
    color: '#8E44AD',
    luckyNumbers: [8, 13, 18, 27, 44],
    planet: 'Mars/Pluto',
    modality: 'Fixed'
  },
  sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    dates: 'November 22 - December 21',
    traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Independent'],
    description: 'Sagittarius individuals are eternal adventurers who love exploring new horizons. They are optimistic, philosophical, and value freedom above all.',
    compatibility: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    career: 'Sagittarians thrive in travel, education, publishing, sports, and any career that offers variety and growth opportunities.',
    health: 'Focus on hip and thigh health. Maintain an active lifestyle but avoid overexertion during adventures.',
    color: '#3498DB',
    luckyNumbers: [3, 9, 15, 21, 33],
    planet: 'Jupiter',
    modality: 'Mutable'
  },
  capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    dates: 'December 22 - January 19',
    traits: ['Ambitious', 'Disciplined', 'Responsible', 'Practical'],
    description: 'Capricorn individuals are ambitious achievers who value structure and tradition. They are disciplined, responsible, and work steadily toward their goals.',
    compatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    career: 'Capricorns excel in management, finance, politics, and any field requiring long-term planning and responsibility.',
    health: 'Pay attention to bone health and avoid overworking. Regular rest and relaxation are essential.',
    color: '#34495E',
    luckyNumbers: [8, 10, 17, 26, 35],
    planet: 'Saturn',
    modality: 'Cardinal'
  },
  aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    dates: 'January 20 - February 18',
    traits: ['Independent', 'Innovative', 'Humanitarian', 'Eccentric'],
    description: 'Aquarius individuals are forward-thinking humanitarians who march to their own beat. They are independent, innovative, and deeply care about making the world better.',
    compatibility: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
    career: 'Aquarians thrive in technology, social work, science, and any field involving innovation and helping humanity.',
    health: 'Focus on circulatory health and avoid isolation. Maintain social connections for emotional wellbeing.',
    color: '#1ABC9C',
    luckyNumbers: [4, 7, 11, 22, 29],
    planet: 'Saturn/Uranus',
    modality: 'Fixed'
  },
  pisces: {
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    dates: 'February 19 - March 20',
    traits: ['Compassionate', 'Intuitive', 'Artistic', 'Dreamy'],
    description: 'Pisces individuals are compassionate dreamers with rich inner worlds. They are intuitive, artistic, and deeply empathetic to others\' emotions.',
    compatibility: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
    career: 'Pisceans excel in arts, healing professions, spirituality, and any career allowing them to help others and express creativity.',
    health: 'Pay attention to foot health and avoid escapist behaviors. Regular meditation and creative outlets are beneficial.',
    color: '#9B59B6',
    luckyNumbers: [3, 9, 12, 15, 18],
    planet: 'Jupiter/Neptune',
    modality: 'Mutable'
  }
};

interface ZodiacPageProps {
  params: {
    locale: string;
    sign: string;
  };
}

export default function ZodiacPage({ params }: ZodiacPageProps) {
  const { sign } = params;
  
  if (!sign || typeof sign !== 'string' || !(sign.toLowerCase() in zodiacData)) {
    notFound();
  }
  
  const zodiac = zodiacData[sign.toLowerCase() as keyof typeof zodiacData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 text-4xl font-bold text-white shadow-lg"
            style={{ backgroundColor: zodiac.color }}
          >
            {zodiac.symbol}
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {zodiac.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {zodiac.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Basic Info */}
          <Card className="lg:col-span-1 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium text-muted-foreground">Element:</span>
                <Badge variant="secondary">{zodiac.element}</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium text-muted-foreground">Dates:</span>
                <span className="font-medium">{zodiac.dates}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium text-muted-foreground">Planet:</span>
                <span className="font-medium">{zodiac.planet}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium text-muted-foreground">Modality:</span>
                <Badge variant="outline">{zodiac.modality}</Badge>
              </div>
              <div className="pt-2">
                <span className="font-medium text-muted-foreground block mb-2">Lucky Numbers:</span>
                <div className="flex flex-wrap gap-2">
                  {zodiac.luckyNumbers.map((number) => (
                    <Badge key={number} variant="secondary" className="text-xs">
                      {number}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personality Traits */}
          <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Key Personality Traits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {zodiac.traits.map((trait, index) => (
                  <div
                    key={trait}
                    className="text-center p-4 rounded-lg border-2 hover:border-primary/50 transition-colors duration-300"
                    style={{ 
                      borderColor: `${zodiac.color}20`,
                      backgroundColor: `${zodiac.color}10`
                    }}
                  >
                    <span className="font-medium text-sm">{trait}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compatibility */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Compatibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Most compatible with:</p>
              <div className="space-y-2">
                {zodiac.compatibility.map((sign) => (
                  <div
                    key={sign}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                  >
                    <span className="font-medium">{sign}</span>
                    <Heart className="h-4 w-4 text-red-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Career Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{zodiac.career}</p>
            </CardContent>
          </Card>

          {/* Health */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Health & Wellness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{zodiac.health}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}