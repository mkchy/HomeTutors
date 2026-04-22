import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import JourneySection from '@/components/JourneySection'
import GlobalSection from '@/components/GlobalSection'
import CommunitySection from '@/components/CommunitySection'
import PersonalizedSection from '@/components/PersonalizedSection'
import FAQSection from '@/components/FAQSection'
import GuideBanner from '@/components/GuideBanner'
import DegreeFormSection from '@/components/DegreeFormSection'
import AppSection from '@/components/AppSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <JourneySection />
      <GlobalSection />
      <CommunitySection />
      <PersonalizedSection />
      <FAQSection />
      <GuideBanner />
      <DegreeFormSection />
      <AppSection />
      <Footer />
    </main>
  )
}
