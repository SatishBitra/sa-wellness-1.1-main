import { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Home,
  Printer,
  Sparkles,
  CalendarCheck,
  User,
  Mail,
  Phone,
  ShieldAlert,
  Activity,
  Award,
  Stethoscope,
  Utensils,
  Dumbbell,
  Instagram,
  Youtube,
  Facebook
} from 'lucide-react';

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.5 9a1.5 1.5 0 0 0 2 2l1.5-1.5a1 1 0 0 1 1.2-.2c1 .5 2 1.5 2.5 2.5.2.4.1.9-.2 1.2L15 15.5a2 2 0 0 1-2.5.5C10 14.5 8 12.5 7 10a2 2 0 0 1 .5-2.5L9 6.5a1 1 0 0 1 1.2-.2c.4.2.6.5.6.9v.3" />
    </svg>
  );
}

function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { name: 'TikTok', href: 'https://tiktok.com', icon: TikTokIcon },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'WhatsApp', href: 'https://whatsapp.com', icon: WhatsAppIcon },
];

interface AssessmentPageProps {
  onGoHome: () => void;
  onBookConsultation: () => void;
}

export default function AssessmentPage({ onGoHome, onBookConsultation }: AssessmentPageProps) {
  // Navigation / Step state: 1 to 6 (1: Basics, 2: Medical/Family, 3: Lifestyle, 4: Women's Health, 5: Labs, 6: Results)
  const [currentStep, setCurrentStep] = useState(1);

  // Unit toggle: 'imperial' (inches, lbs) or 'metric' (cm, kg)
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');

  // Step 1: User Contact & Basics
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<string>('');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('8');
  const [weightKg, setWeightKg] = useState<string>('');
  const [weightLbs, setWeightLbs] = useState<string>('');
  const [waistCm, setWaistCm] = useState<string>('');
  const [waistIn, setWaistIn] = useState<string>('');
  const [bpSystolic, setBpSystolic] = useState<string>('');
  const [bpDiastolic, setBpDiastolic] = useState<string>('');

  // Step 2: Family & Medical History (values: 'yes' | 'no' | 'dont_know')
  const [history, setHistory] = useState<Record<string, string>>({
    prediabetes: 'no',
    diabetes: 'no',
    hypertension: 'no',
    lipids: 'no',
    fattyLiver: 'no',
    cvd: 'no',
    sleepApnea: 'no',
    pcos: 'no',
  });

  const [familyDiabetes, setFamilyDiabetes] = useState<string>('no');
  const [familyHeartDisease, setFamilyHeartDisease] = useState<string>('no');

  // Step 3: Daily Habits
  const [physicalActivity, setPhysicalActivity] = useState<string>('150_plus'); // 'under_75' | '75_149' | '150_plus'
  const [strengthExercise, setStrengthExercise] = useState<string>('2_plus'); // 'never' | 'once_week' | '2_plus'
  const [sittingTime, setSittingTime] = useState<string>('under_6'); // 'under_6' | '6_to_8' | 'over_8'
  const [sugaryDrinks, setSugaryDrinks] = useState<string>('rarely'); // 'rarely' | '1_to_3' | '4_to_6' | 'daily'
  const [sweetsDesserts, setSweetsDesserts] = useState<string>('under_2'); // 'under_2' | '2_to_4' | '5_plus'
  const [refinedCarbs, setRefinedCarbs] = useState<string>('occasionally'); // 'occasionally' | 'once_day' | 'twice_plus'
  const [vegLegumes, setVegLegumes] = useState<string>('3_plus'); // 'under_1' | '1_to_2' | '3_plus'
  const [sleepDuration, setSleepDuration] = useState<string>('7_to_9'); // 'under_6' | '6_to_7' | '7_to_9' | 'over_9'

  // Step 4: Women's Health
  const [gestationalDiabetes, setGestationalDiabetes] = useState<string>('no'); // 'yes' | 'no' | 'never' | 'dont_know'
  const [deliveredLargeBaby, setDeliveredLargeBaby] = useState<string>('no'); // 'yes' | 'no' | 'dont_know'

  // Step 5: Optional Labs
  const [labA1c, setLabA1c] = useState<string>('');
  const [labGlucose, setLabGlucose] = useState<string>('');
  const [labTriglycerides, setLabTriglycerides] = useState<string>('');
  const [labHdl, setLabHdl] = useState<string>('');
  const [labLdl, setLabLdl] = useState<string>('');
  const [labAltAst, setLabAltAst] = useState<string>('');
  const [labInsulin, setLabInsulin] = useState<string>('');
  const [labHomaIr, setLabHomaIr] = useState<string>('');

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Height and Weight conversions & BMI calculations
  const totalHeightInches = useMemo(() => {
    if (unitSystem === 'imperial') {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      return ft * 12 + inch;
    } else {
      const cm = parseFloat(heightCm) || 0;
      return cm / 2.54;
    }
  }, [unitSystem, heightFt, heightIn, heightCm]);

  const totalHeightCm = useMemo(() => {
    return totalHeightInches * 2.54;
  }, [totalHeightInches]);

  const totalWeightKg = useMemo(() => {
    if (unitSystem === 'imperial') {
      const lbs = parseFloat(weightLbs) || 0;
      return lbs * 0.453592;
    } else {
      return parseFloat(weightKg) || 0;
    }
  }, [unitSystem, weightLbs, weightKg]);

  const totalWaistInches = useMemo(() => {
    if (unitSystem === 'imperial') {
      return parseFloat(waistIn) || 0;
    } else {
      return (parseFloat(waistCm) || 0) / 2.54;
    }
  }, [unitSystem, waistIn, waistCm]);

  const totalWaistCm = useMemo(() => {
    return totalWaistInches * 2.54;
  }, [totalWaistInches]);

  // Derived Anthropometrics
  const calculatedBmi = useMemo(() => {
    if (totalHeightCm > 50 && totalWeightKg > 20) {
      const heightM = totalHeightCm / 100;
      return Number((totalWeightKg / (heightM * heightM)).toFixed(1));
    }
    return 0;
  }, [totalHeightCm, totalWeightKg]);

  const calculatedWhtr = useMemo(() => {
    if (totalHeightCm > 50 && totalWaistCm > 20) {
      return Number((totalWaistCm / totalHeightCm).toFixed(2));
    }
    return 0;
  }, [totalWaistCm, totalHeightCm]);

  // Scoring Engine based on the Official Scoring Sheet
  // A. Anthropometric Subtotal (Max 5 pts)
  const anthropometricScore = useMemo(() => {
    let pts = 0;
    if (calculatedBmi >= 27.5) pts += 2;
    else if (calculatedBmi >= 23) pts += 1;

    if (sex === 'male' && totalWaistCm >= 90) pts += 2;
    if (sex === 'female' && totalWaistCm >= 80) pts += 2;

    if (calculatedWhtr >= 0.50) pts += 1;

    return Math.min(pts, 5);
  }, [calculatedBmi, calculatedWhtr, totalWaistCm, sex]);

  // B. Medical / Family History Subtotal
  const medicalFamilyScore = useMemo(() => {
    let pts = 0;
    if (familyDiabetes === 'yes') pts += 2;
    if (history.prediabetes === 'yes') pts += 2;
    if (history.hypertension === 'yes') pts += 1;
    if (history.lipids === 'yes') pts += 1;
    if (history.fattyLiver === 'yes') pts += 1;
    if (sex === 'female' && history.pcos === 'yes') pts += 1;
    if (history.sleepApnea === 'yes') pts += 1;
    if (history.cvd === 'yes') pts += 2;
    if (sex === 'female' && gestationalDiabetes === 'yes') pts += 2;

    return pts;
  }, [familyDiabetes, history, sex, gestationalDiabetes]);

  // C. Lifestyle Subtotal (Max 14 pts)
  const lifestyleScore = useMemo(() => {
    let pts = 0;
    if (physicalActivity === 'under_75') pts += 2;
    else if (physicalActivity === '75_149') pts += 1;

    if (strengthExercise === 'never' || strengthExercise === 'once_week') pts += 1;

    if (sittingTime === 'over_8') pts += 2;
    else if (sittingTime === '6_to_8') pts += 1;

    if (sugaryDrinks === 'daily' || sugaryDrinks === '4_to_6') pts += 2;
    else if (sugaryDrinks === '1_to_3') pts += 1;

    if (sweetsDesserts === '5_plus') pts += 2;
    else if (sweetsDesserts === '2_to_4') pts += 1;

    if (refinedCarbs === 'twice_plus') pts += 2;
    else if (refinedCarbs === 'once_day') pts += 1;

    if (vegLegumes === 'under_1') pts += 2;
    else if (vegLegumes === '1_to_2') pts += 1;

    if (sleepDuration === 'under_6' || sleepDuration === '6_to_7') pts += 1;

    return Math.min(pts, 14);
  }, [physicalActivity, strengthExercise, sittingTime, sugaryDrinks, sweetsDesserts, refinedCarbs, vegLegumes, sleepDuration]);

  // Total Score
  const totalScore = anthropometricScore + medicalFamilyScore + lifestyleScore;
  const maxPossibleScore = sex === 'female' ? 32 : 30;

  // Clinical Flags Detection
  const clinicalFlags = useMemo(() => {
    const flags: string[] = [];

    // Lab HbA1c
    const a1cNum = parseFloat(labA1c);
    if (!isNaN(a1cNum)) {
      if (a1cNum >= 6.5) flags.push('Diabetes-range HbA1c test (≥6.5%)');
      else if (a1cNum >= 5.7) flags.push('Prediabetes-range HbA1c test (5.7% – 6.4%)');
    }

    // Fasting Glucose
    const glucoseNum = parseFloat(labGlucose);
    if (!isNaN(glucoseNum)) {
      if (glucoseNum >= 126) flags.push('Diabetes-range Fasting Glucose (≥126 mg/dL)');
      else if (glucoseNum >= 100) flags.push('Prediabetes-range Fasting Glucose (100–125 mg/dL)');
    }

    // Blood Pressure
    const sys = parseFloat(bpSystolic);
    const dia = parseFloat(bpDiastolic);
    if ((!isNaN(sys) && sys >= 130) || (!isNaN(dia) && dia >= 80) || history.hypertension === 'yes') {
      flags.push('Elevated Blood Pressure / Hypertension (≥130/80 mmHg)');
    }

    // Lipids
    const tg = parseFloat(labTriglycerides);
    const hdl = parseFloat(labHdl);
    if ((!isNaN(tg) && tg > 250) || (!isNaN(hdl) && hdl < 35) || history.lipids === 'yes') {
      flags.push('Abnormal Cholesterol / Triglycerides');
    }

    // Waist
    if ((sex === 'male' && totalWaistCm >= 90) || (sex === 'female' && totalWaistCm >= 80) || calculatedWhtr >= 0.50) {
      flags.push('Increased Waist Circumference / Central Adiposity');
    }

    // Fatty Liver
    if (history.fattyLiver === 'yes') {
      flags.push('Known Fatty Liver (MASLD)');
    }

    // Heart Disease
    if (history.cvd === 'yes') {
      flags.push('Known Cardiovascular Disease / Stroke history');
    }

    // Gestational Diabetes
    if (sex === 'female' && gestationalDiabetes === 'yes') {
      flags.push('History of Gestational Diabetes');
    }

    return flags;
  }, [labA1c, labGlucose, bpSystolic, bpDiastolic, history, labTriglycerides, labHdl, sex, totalWaistCm, calculatedWhtr, gestationalDiabetes]);

  // Risk Classification
  const riskProfile = useMemo(() => {
    const hasDiabetesFlag = clinicalFlags.some((f) => f.includes('Diabetes-range'));
    if (hasDiabetesFlag || totalScore >= 18) {
      return {
        level: 'VERY HIGH RISK / CLINICAL FLAG',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        textColor: 'text-rose-950',
        bgColor: 'bg-rose-50/80',
        accentColor: '#E11D48',
        gaugePercent: 92,
        summary: 'Multiple metabolic risk factors and/or clinical flags identified.',
        action: 'Arrange a prompt medical evaluation with a healthcare professional to review your blood sugar, blood pressure, lipid panel, and comprehensive cardiometabolic profile. Do not rely on questionnaire score alone.',
      };
    } else if (totalScore >= 12 || clinicalFlags.length >= 2) {
      return {
        level: 'HIGHER RISK',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        textColor: 'text-amber-950',
        bgColor: 'bg-amber-50/80',
        accentColor: '#D97706',
        gaugePercent: 68,
        summary: 'Multiple anthropometric, family, medical or lifestyle risk factors are present.',
        action: 'Recommend medical review and dedicated South Asian metabolic screening (fasting insulin, ApoB, HbA1c, and liver enzymes). Targeted nutritional intervention is strongly advised.',
      };
    } else if (totalScore >= 7 || clinicalFlags.length === 1) {
      return {
        level: 'INCREASED RISK',
        badgeColor: 'bg-sand text-brand-deep border-sand-warm',
        textColor: 'text-brand-deep',
        bgColor: 'bg-sand/40',
        accentColor: '#B57C48',
        gaugePercent: 44,
        summary: 'Several risk factors are present but no major clinical abnormality identified.',
        action: 'Consider discussing blood sugar/HbA1c, blood pressure, and cholesterol testing with your physician. Initiating proactive dietary and physical activity adjustments can halt progression.',
      };
    } else {
      return {
        level: 'LOWER CURRENT RISK',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        textColor: 'text-emerald-950',
        bgColor: 'bg-emerald-50/80',
        accentColor: '#10B981',
        gaugePercent: 20,
        summary: 'Fewer recognized risk factors and no major clinical flags.',
        action: 'Continue regular physical activity, a balanced South Asian diet, restorative sleep, and routine annual preventive health screenings.',
      };
    }
  }, [totalScore, clinicalFlags]);

  // Top 3 Modifiable Priorities generated based on user responses
  const topPriorities = useMemo(() => {
    const list: { title: string; desc: string; icon: typeof Utensils }[] = [];

    if (calculatedWhtr >= 0.50 || (sex === 'male' && totalWaistCm >= 90) || (sex === 'female' && totalWaistCm >= 80)) {
      list.push({
        title: 'Target Abdominal Visceral Adiposity',
        desc: 'South Asian genetics prioritize visceral fat around the liver and pancreas. Targeted fiber sequencing and meal pacing halt deeper adipose accumulation.',
        icon: Activity,
      });
    }
    if (refinedCarbs === 'twice_plus' || refinedCarbs === 'once_day') {
      list.push({
        title: 'Optimize Carbohydrate Architecture',
        desc: 'Pair traditional rotis and basmati rice with double portions of dal and seasonal sabzi to dampen post-meal glucose spikes.',
        icon: Utensils,
      });
    }
    if (strengthExercise === 'never' || strengthExercise === 'once_week') {
      list.push({
        title: 'Build Muscle Glucose Reservoirs',
        desc: 'Resistance training 2–3 times weekly expands skeletal muscle glycogen capacity, reducing insulin demand.',
        icon: Dumbbell,
      });
    }
    if (sugaryDrinks === 'daily' || sugaryDrinks === '4_to_6' || sugaryDrinks === '1_to_3') {
      list.push({
        title: 'Calibrate Sweetened Chai & Beverages',
        desc: 'Substitute table sugar and condensed milk with unsweetened cardamom, ginger, and cinnamon infusions.',
        icon: Utensils,
      });
    }
    if (sweetsDesserts === '5_plus' || sweetsDesserts === '2_to_4') {
      list.push({
        title: 'Reserve Traditional Mithai for Occasions',
        desc: 'Reduce routine mithai and bakery biscuits, swapping daily cravings for roasted makhana, walnuts, and berries.',
        icon: Utensils,
      });
    }
    if (physicalActivity === 'under_75' || physicalActivity === '75_149') {
      list.push({
        title: 'Elevate Weekly Movement to 150+ Mins',
        desc: 'Brisk 15-minute walks directly after meals activate GLUT4 receptors independently of insulin.',
        icon: Activity,
      });
    }

    return list.slice(0, 3);
  }, [calculatedWhtr, sex, totalWaistCm, refinedCarbs, strengthExercise, sugaryDrinks, sweetsDesserts, physicalActivity]);

  // Step names
  const stepsList = [
    { num: 1, title: 'Basic Information' },
    { num: 2, title: 'Medical & Family' },
    { num: 3, title: 'Daily Habits' },
    { num: 4, title: "Women's Health", hide: sex === 'male' },
    { num: 5, title: 'Know Your Numbers' },
    { num: 6, title: 'Your Scorecard' },
  ].filter((s) => !s.hide);

  const handleNext = () => {
    if (sex === 'male' && currentStep === 3) {
      setCurrentStep(5);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handleBack = () => {
    if (sex === 'male' && currentStep === 5) {
      setCurrentStep(3);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-surface-primary text-ink flex flex-col selection:bg-sand-warm selection:text-ink">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-surface-white/95 backdrop-blur-md border-b border-border-subtle print:hidden">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between relative">
          {/* Left: Logo */}
          <div className="flex items-center">
            <button
              onClick={onGoHome}
              className="flex items-center group cursor-pointer focus:outline-none"
              aria-label="Return to SA Wellness home"
            >
              <img
                src="/assets/fIBPHwmodHYgCtu5q2ugcSwxTb0.png"
                alt="SA Wellness"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                width={180}
                height={48}
              />
            </button>
          </div>

          {/* Center: Health Assessment Badge */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <span className="text-[12px] sm:text-[13px] font-600 bg-sand px-3.5 py-1 rounded-full border border-sand-warm text-brand-deep shadow-xs tracking-wide">
              Health Assessment
            </span>
          </div>

          {/* Right: Step Indicator (Exit to Home CTA removed) */}
          <div className="flex items-center gap-2">
            {currentStep < 6 && (
              <span className="text-[12.5px] sm:text-[13px] font-500 text-ink-secondary bg-surface-secondary/70 px-3 py-1 rounded-full border border-border-subtle">
                Step {currentStep} of {sex === 'male' ? 5 : 6}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-secondary h-1.5">
          <div
            className="bg-brand-primary h-full transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Questionnaire Container */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:py-0 print:m-0">
        <div className="mx-auto max-w-[820px] print:max-w-none print:w-full">
          {/* Section Wise Navigation Tabs (Clickable to jump) */}
          <div className="mb-8 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[13px] font-500 print:hidden">
            {stepsList.map((s) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setCurrentStep(s.num)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                      : isPast
                      ? 'bg-surface-white border-brand-primary/40 text-brand-deep hover:bg-sand/30'
                      : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-600 ${
                    isActive ? 'bg-white/20 text-white' : isPast ? 'bg-sand text-brand-deep' : 'bg-surface-secondary text-ink-secondary'
                  }`}>
                    {isPast ? '✓' : s.num}
                  </span>
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* SECTION 1: BASIC INFORMATION */}
          {currentStep === 1 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
                <div>
                  <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                    1. Your Basic Information
                  </h2>
                  <p className="text-[13.5px] text-ink-secondary mt-0.5">
                    Please provide your contact and body measurements for accurate health calibration.
                  </p>
                </div>

                {/* Unit Switcher */}
                <div className="inline-flex p-1 bg-surface-secondary rounded-xl border border-border-subtle text-[12.5px] font-500 self-start sm:self-auto">
                  <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      unitSystem === 'imperial'
                        ? 'bg-surface-white text-ink shadow-xs font-600'
                        : 'text-ink-secondary hover:text-ink'
                    }`}
                  >
                    Imperial (in / lbs)
                  </button>
                  <button
                    onClick={() => setUnitSystem('metric')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      unitSystem === 'metric'
                        ? 'bg-surface-white text-ink shadow-xs font-600'
                        : 'text-ink-secondary hover:text-ink'
                    }`}
                  >
                    Metric (cm / kg)
                  </button>
                </div>
              </div>

              {/* Name, Email, and Phone Number (Requested by User) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1.5 flex items-center gap-1.5">
                    <User size={14} className="text-brand-deep" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1.5 flex items-center gap-1.5">
                    <Mail size={14} className="text-brand-deep" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1.5 flex items-center gap-1.5">
                    <Phone size={14} className="text-brand-deep" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Sex & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <div>
                  <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                    Biological Sex
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSex('male')}
                      className={`p-3 rounded-xl border text-center font-500 text-[14px] transition-all cursor-pointer ${
                        sex === 'male'
                          ? 'bg-sand/50 border-brand-primary text-ink ring-1 ring-brand-primary'
                          : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setSex('female')}
                      className={`p-3 rounded-xl border text-center font-500 text-[14px] transition-all cursor-pointer ${
                        sex === 'female'
                          ? 'bg-sand/50 border-brand-primary text-ink ring-1 ring-brand-primary'
                          : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    placeholder="e.g. 38"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Height & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                    Height {unitSystem === 'imperial' ? '(ft & in)' : '(cm)'}
                  </label>
                  {unitSystem === 'imperial' ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Feet"
                          value={heightFt}
                          onChange={(e) => setHeightFt(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        />
                        <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">ft</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Inches"
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        />
                        <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">in</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="e.g. 172"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                      />
                      <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">cm</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                    Weight {unitSystem === 'imperial' ? '(lbs)' : '(kg)'}
                  </label>
                  {unitSystem === 'imperial' ? (
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="e.g. 165"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                      />
                      <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">lbs</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="e.g. 75"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                      />
                      <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">kg</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Waist Circumference & Blood Pressure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                    Waist Circumference (measured at navel)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder={unitSystem === 'imperial' ? 'e.g. 34' : 'e.g. 86'}
                      value={unitSystem === 'imperial' ? waistIn : waistCm}
                      onChange={(e) => (unitSystem === 'imperial' ? setWaistIn(e.target.value) : setWaistCm(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                    />
                    <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">
                      {unitSystem === 'imperial' ? 'in' : 'cm'}
                    </span>
                  </div>
                  <span className="text-[11.5px] text-ink-muted mt-1 block">
                    Measured at level of belly button while breathing normally
                  </span>
                </div>

                <div>
                  <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                    Blood Pressure, if known (mmHg)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Systolic (120)"
                        value={bpSystolic}
                        onChange={(e) => setBpSystolic(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                      />
                      <span className="absolute right-2.5 top-3.5 text-[11px] text-ink-muted">Sys</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Diastolic (80)"
                        value={bpDiastolic}
                        onChange={(e) => setBpDiastolic(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                      />
                      <span className="absolute right-2.5 top-3.5 text-[11px] text-ink-muted">Dia</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-ink-secondary leading-relaxed bg-surface-secondary/50 p-3.5 rounded-xl border border-border-subtle">
                For Asian adults, including people from the South Asian subcontinent, the ADA 2026 standards use lower BMI and waist thresholds because metabolic risk can occur at lower BMI levels.
              </p>
            </div>
          )}

          {/* SECTION 2: FAMILY & MEDICAL HISTORY */}
          {currentStep === 2 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                  2. Your Family &amp; Medical History
                </h2>
                <p className="text-[13.5px] text-ink-secondary mt-0.5">
                  Select your personal medical history and immediate family background.
                </p>
              </div>

              {/* Personal Conditions Matrix */}
              <div>
                <h3 className="text-[14.5px] font-600 text-ink mb-3">
                  Have you ever been told by a doctor or healthcare professional that you have:
                </h3>

                <div className="divide-y divide-border-subtle/70 border border-border-subtle rounded-2xl overflow-hidden">
                  {[
                    { key: 'prediabetes', label: 'Prediabetes or high blood sugar' },
                    { key: 'diabetes', label: 'Diabetes' },
                    { key: 'hypertension', label: 'High blood pressure' },
                    { key: 'lipids', label: 'High cholesterol or triglycerides' },
                    { key: 'fattyLiver', label: 'Fatty liver' },
                    { key: 'cvd', label: 'Heart disease or stroke' },
                    { key: 'sleepApnea', label: 'Sleep apnea' },
                    ...(sex === 'female'
                      ? [{ key: 'pcos', label: 'Polycystic ovary syndrome (PCOS)*' }]
                      : []),
                  ].map((condition) => (
                    <div
                      key={condition.key}
                      className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-white hover:bg-surface-secondary/40 transition-colors"
                    >
                      <span className="text-[14px] font-500 text-ink">{condition.label}</span>

                      <div className="inline-flex rounded-xl bg-surface-secondary p-1 border border-border-subtle self-start sm:self-auto">
                        {(['yes', 'no', 'dont_know'] as const).map((val) => {
                          const isSelected = history[condition.key] === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setHistory((prev) => ({ ...prev, [condition.key]: val }))}
                              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-500 transition-all cursor-pointer ${
                                isSelected
                                  ? val === 'yes'
                                    ? 'bg-brand-deep text-white shadow-xs'
                                    : 'bg-surface-white text-ink shadow-xs'
                                  : 'text-ink-secondary hover:text-ink'
                              }`}
                            >
                              {val === 'yes' ? 'Yes' : val === 'no' ? 'No' : "Don't know"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Family History */}
              <div className="pt-2 border-t border-border-subtle space-y-4">
                <h3 className="text-[14.5px] font-600 text-ink">
                  Family History
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-border-subtle bg-surface-secondary/40 space-y-3">
                    <span className="text-[13.5px] font-500 text-ink block">
                      Does a parent, brother or sister have diabetes?
                    </span>
                    <div className="flex gap-2">
                      {[
                        { val: 'yes', label: 'Yes' },
                        { val: 'no', label: 'No' },
                        { val: 'dont_know', label: "Don't know" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setFamilyDiabetes(item.val)}
                          className={`flex-1 py-2 rounded-xl text-[13px] font-500 border transition-all cursor-pointer ${
                            familyDiabetes === item.val
                              ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                              : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-border-subtle bg-surface-secondary/40 space-y-3">
                    <span className="text-[13.5px] font-500 text-ink block">
                      Does a close family member have heart disease or stroke?
                    </span>
                    <div className="flex gap-2">
                      {[
                        { val: 'yes', label: 'Yes' },
                        { val: 'no', label: 'No' },
                        { val: 'dont_know', label: "Don't know" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setFamilyHeartDisease(item.val)}
                          className={`flex-1 py-2 rounded-xl text-[13px] font-500 border transition-all cursor-pointer ${
                            familyHeartDisease === item.val
                              ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                              : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: DAILY HABITS */}
          {currentStep === 3 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                  3. Your Daily Habits
                </h2>
                <p className="text-[13.5px] text-ink-secondary mt-0.5">
                  Reflect on your physical activity, dietary routines, and sleep patterns.
                </p>
              </div>

              {/* Questions A to H (Points stripped out) */}
              <div className="space-y-6">
                {/* A. Physical Activity */}
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                  <span className="text-[14px] font-600 text-ink block">
                    A. Physical activity: How much moderate physical activity do you usually get each week?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'under_75', label: 'Less than 75 minutes' },
                      { id: '75_149', label: '75–149 minutes' },
                      { id: '150_plus', label: '150 minutes or more' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPhysicalActivity(opt.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          physicalActivity === opt.id
                            ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        <div className="text-[13.5px] font-500">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* B. Strength Exercise */}
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                  <span className="text-[14px] font-600 text-ink block">
                    B. Strength exercise: How often do you do strength/resistance exercise?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'never', label: 'Never' },
                      { id: 'once_week', label: 'About once a week' },
                      { id: '2_plus', label: '2 or more times a week' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setStrengthExercise(opt.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          strengthExercise === opt.id
                            ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        <div className="text-[13.5px] font-500">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* C. Sitting */}
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                  <span className="text-[14px] font-600 text-ink block">
                    C. Sitting: Approximately how many hours do you spend sitting on a typical day?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'under_6', label: 'Less than 6 hours' },
                      { id: '6_to_8', label: '6–8 hours' },
                      { id: 'over_8', label: 'More than 8 hours' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSittingTime(opt.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          sittingTime === opt.id
                            ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        <div className="text-[13.5px] font-500">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* D. Sugary drinks */}
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                  <span className="text-[14px] font-600 text-ink block">
                    D. Sugary drinks: How often do you drink regular soft drinks, sweetened tea/coffee, energy drinks, sweetened juices or other sugary beverages?
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'rarely', label: 'Rarely/never' },
                      { id: '1_to_3', label: '1–3 times a week' },
                      { id: '4_to_6', label: '4–6 times a week' },
                      { id: 'daily', label: 'Daily' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSugaryDrinks(opt.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          sugaryDrinks === opt.id
                            ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        <div className="text-[13.5px] font-500">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* E. Sweets and desserts */}
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                  <span className="text-[14px] font-600 text-ink block">
                    E. Sweets and desserts: How often do you eat mithai, sweets, cakes, biscuits, pastries or other desserts?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'under_2', label: 'Less than twice a week' },
                      { id: '2_to_4', label: '2–4 times a week' },
                      { id: '5_plus', label: '5 or more times a week' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSweetsDesserts(opt.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          sweetsDesserts === opt.id
                            ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        <div className="text-[13.5px] font-500">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* F. Refined carbohydrates */}
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                  <span className="text-[14px] font-600 text-ink block">
                    F. Refined carbohydrates: How often do foods such as white rice, white bread, maida/refined flour, naan, paratha or similar refined grains make up a substantial part of your meals?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'occasionally', label: 'Occasionally' },
                      { id: 'once_day', label: 'About once a day' },
                      { id: 'twice_plus', label: 'Twice a day or more' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRefinedCarbs(opt.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          refinedCarbs === opt.id
                            ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        <div className="text-[13.5px] font-500">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* G. Vegetables and legumes */}
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                  <span className="text-[14px] font-600 text-ink block">
                    G. Vegetables and legumes: How often do you eat vegetables, dal, beans, chickpeas or other legumes?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'under_1', label: 'Less than once a day' },
                      { id: '1_to_2', label: '1–2 times a day' },
                      { id: '3_plus', label: '3 or more times a day' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setVegLegumes(opt.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          vegLegumes === opt.id
                            ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        <div className="text-[13.5px] font-500">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* H. Sleep */}
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                  <span className="text-[14px] font-600 text-ink block">
                    H. Sleep: How much do you usually sleep?
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'under_6', label: 'Less than 6 hours' },
                      { id: '6_to_7', label: '6–7 hours' },
                      { id: '7_to_9', label: '7–9 hours' },
                      { id: 'over_9', label: 'More than 9 hours' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSleepDuration(opt.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          sleepDuration === opt.id
                            ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        <div className="text-[13.5px] font-500">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: WOMEN'S HEALTH (Only active for Female) */}
          {currentStep === 4 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                  4. Women&apos;s Health
                </h2>
                <p className="text-[13.5px] text-ink-secondary mt-0.5">
                  Pregnancy-related metabolic indicators specific to female cardiometabolic risk.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-3">
                  <span className="text-[14px] font-600 text-ink block">
                    Have you ever had diabetes during pregnancy (gestational diabetes)?
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { val: 'yes', label: 'Yes' },
                      { val: 'no', label: 'No' },
                      { val: 'never', label: 'Never pregnant' },
                      { val: 'dont_know', label: "Don't know" },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setGestationalDiabetes(item.val)}
                        className={`py-2.5 px-3 rounded-xl text-[13.5px] font-500 border transition-all cursor-pointer ${
                          gestationalDiabetes === item.val
                            ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-3">
                  <span className="text-[14px] font-600 text-ink block">
                    Have you ever delivered a baby weighing approximately 4 kg (9 lb) or more?
                  </span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { val: 'yes', label: 'Yes' },
                      { val: 'no', label: 'No' },
                      { val: 'dont_know', label: "Don't know" },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setDeliveredLargeBaby(item.val)}
                        className={`py-2.5 px-3 rounded-xl text-[13.5px] font-500 border transition-all cursor-pointer ${
                          deliveredLargeBaby === item.val
                            ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                            : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: KNOW YOUR NUMBERS (LABS) */}
          {currentStep === 5 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              <div className="border-b border-border-subtle pb-4">
                <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                  5. Know Your Numbers
                </h2>
                <p className="text-[13.5px] text-ink-secondary mt-0.5">
                  If you have recent laboratory results, enter them below. If you don&apos;t have them, you can skip directly to your results.
                </p>
              </div>

              {/* Lab Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1">
                    HbA1c (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 5.6"
                      value={labA1c}
                      onChange={(e) => setLabA1c(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                    />
                    <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1">
                    Fasting glucose (mg/dL)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="e.g. 95"
                      value={labGlucose}
                      onChange={(e) => setLabGlucose(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                    />
                    <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">mg/dL</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1">
                    Triglycerides (mg/dL)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="e.g. 150"
                      value={labTriglycerides}
                      onChange={(e) => setLabTriglycerides(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                    />
                    <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">mg/dL</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1">
                    HDL cholesterol (mg/dL)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="e.g. 45"
                      value={labHdl}
                      onChange={(e) => setLabHdl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                    />
                    <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">mg/dL</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1">
                    LDL cholesterol (mg/dL)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="e.g. 110"
                      value={labLdl}
                      onChange={(e) => setLabLdl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                    />
                    <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">mg/dL</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1">
                    ALT / AST
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 28 / 24"
                    value={labAltAst}
                    onChange={(e) => setLabAltAst(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1">
                    Fasting insulin, if available
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 8.5"
                    value={labInsulin}
                    onChange={(e) => setLabInsulin(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-500 text-ink mb-1">
                    HOMA-IR, if available
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 1.8"
                    value={labHomaIr}
                    onChange={(e) => setLabHomaIr(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                  />
                </div>
              </div>

              {/* Lab Guidance Info Box */}
              <div className="p-4 rounded-2xl bg-surface-secondary/60 border border-border-subtle text-[12.5px] text-ink-secondary leading-relaxed">
                <strong>Important:</strong> A1C, fasting glucose and, when appropriate, a 2-hour oral glucose tolerance test are used clinically to identify prediabetes and diabetes. Fasting insulin and HOMA-IR may provide additional information in selected settings but should not be treated as a universal diagnostic test for insulin resistance.
              </div>
            </div>
          )}

          {/* SECTION 6: REDESIGNED MODERN & ENGAGING FINAL SCORECARD */}
          {currentStep === 6 && (
            <div id="assessment-scorecard" className="space-y-8 animate-fade-in bg-surface-primary/15 p-2 sm:p-5 rounded-[36px] print:bg-white print:p-0 print:border-none print:shadow-none">
              {/* Print-Only Clinical Header */}
              <div className="hidden print:flex items-center justify-between border-b border-border-subtle pb-4 mb-4">
                <img
                  src="/assets/fIBPHwmodHYgCtu5q2ugcSwxTb0.png"
                  alt="SA Wellness"
                  className="h-10 w-auto object-contain"
                  width={150}
                  height={40}
                />
                <div className="text-right">
                  <span className="text-[12.5px] font-700 text-brand-deep block uppercase tracking-wider">
                    Metabolic Risk Profile Report
                  </span>
                  <span className="text-[11px] text-ink-secondary block">
                    Report Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Modern Radial Scorecard Hero */}
              <div className="bg-surface-white rounded-[32px] border border-border-subtle p-6 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Left Column: Greeting, Tier & Summary */}
                  <div className="space-y-4 max-w-xl text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-600 bg-sand text-brand-deep border border-sand-warm">
                      <Sparkles size={13} />
                      <span>Metabolic Risk Assessment Report</span>
                    </div>

                    <h2 className="font-display font-600 text-ink text-[28px] sm:text-[36px] leading-[1.12]">
                      {fullName ? `${fullName}'s Health Profile` : 'Your Metabolic Health Profile'}
                    </h2>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                      <span className={`px-4 py-1.5 rounded-full text-[13.5px] font-700 border shadow-xs tracking-wide ${riskProfile.badgeColor}`}>
                        {riskProfile.level}
                      </span>
                    </div>

                    <p className="text-[14.5px] text-ink leading-relaxed font-450">
                      {riskProfile.summary} {riskProfile.action}
                    </p>
                  </div>

                  {/* Right Column: Visual Circular Gauge Score Display */}
                  <div className="relative flex flex-col items-center justify-center shrink-0 p-4">
                    <svg className="w-44 h-44 sm:w-48 sm:h-48 transform -rotate-90" viewBox="0 0 160 160">
                      {/* Background circle track */}
                      <circle
                        cx="80"
                        cy="80"
                        r="66"
                        stroke="#E8E5DD"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      {/* Active progress arc */}
                      <circle
                        cx="80"
                        cy="80"
                        r="66"
                        stroke={riskProfile.accentColor}
                        strokeWidth="12"
                        strokeDasharray={414}
                        strokeDashoffset={414 - (414 * Math.min(riskProfile.gaugePercent, 100)) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[11.5px] font-600 text-ink-muted uppercase tracking-wider">
                        Risk Score
                      </span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-[38px] sm:text-[42px] font-display font-700 text-ink leading-none">
                          {totalScore}
                        </span>
                        <span className="text-[15px] font-500 text-ink-muted">
                          /{maxPossibleScore}
                        </span>
                      </div>
                      <span className="text-[11px] font-500 text-ink-secondary mt-0.5">
                        Weighted Index
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subscore Pillar Meters */}
                <div className="mt-10 pt-8 border-t border-border-subtle">
                  <h4 className="text-[13px] font-600 uppercase tracking-wider text-ink-secondary mb-4">
                    Metabolic Risk Domain Breakdown
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border-subtle">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Activity size={16} className="text-brand-deep" />
                          <span className="text-[13px] font-600 text-ink">Anthropometrics</span>
                        </div>
                        <span className="text-[13px] font-700 text-brand-deep">{anthropometricScore} / 5</span>
                      </div>
                      <div className="w-full bg-surface-white h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-primary h-full rounded-full transition-all duration-700"
                          style={{ width: `${(anthropometricScore / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11.5px] text-ink-secondary mt-2 block">
                        BMI: {calculatedBmi > 0 ? calculatedBmi : '—'} · WHtR: {calculatedWhtr > 0 ? calculatedWhtr : '—'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border-subtle">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Stethoscope size={16} className="text-brand-deep" />
                          <span className="text-[13px] font-600 text-ink">Medical &amp; Genetics</span>
                        </div>
                        <span className="text-[13px] font-700 text-brand-deep">{medicalFamilyScore} pts</span>
                      </div>
                      <div className="w-full bg-surface-white h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-primary h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.min((medicalFamilyScore / 11) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-[11.5px] text-ink-secondary mt-2 block">
                        Family diabetes &amp; personal history
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border-subtle">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Utensils size={16} className="text-brand-deep" />
                          <span className="text-[13px] font-600 text-ink">Lifestyle Habits</span>
                        </div>
                        <span className="text-[13px] font-700 text-brand-deep">{lifestyleScore} / 14</span>
                      </div>
                      <div className="w-full bg-surface-white h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-primary h-full rounded-full transition-all duration-700"
                          style={{ width: `${(lifestyleScore / 14) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11.5px] text-ink-secondary mt-2 block">
                        Refined carbs, activity, sitting &amp; sleep
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clinical Flags Screeners */}
                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <h4 className="text-[13px] font-600 uppercase tracking-wider text-ink-secondary mb-3">
                    Identified Clinical Flags &amp; Indicators
                  </h4>
                  {clinicalFlags.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {clinicalFlags.map((flag, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/90 text-rose-900 text-[13px] font-500 flex items-center gap-2.5"
                        >
                          <AlertTriangle size={16} className="text-rose-600 shrink-0" />
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13.5px] font-500 flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      <span>No critical clinical flags identified based on your provided parameters.</span>
                    </div>
                  )}
                </div>

                {/* Top Modifiable Priorities */}
                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-brand-deep" />
                    <h4 className="text-[14px] font-600 uppercase tracking-wider text-ink">
                      Your Top Modifiable Priorities
                    </h4>
                  </div>
                  <p className="text-[13.5px] text-ink-secondary mb-4">
                    High-leverage lifestyle shifts grounded in South Asian biology:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {topPriorities.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-sand/35 border border-sand-warm flex flex-col justify-between"
                        >
                          <div>
                            <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-brand-deep mb-3">
                              <Icon size={16} />
                            </div>
                            <h5 className="font-display font-600 text-ink text-[15px] mb-1">
                              {item.title}
                            </h5>
                            <p className="text-[12.5px] text-ink-secondary leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* What Should I Do Next? */}
                <div className="mt-8 pt-6 border-t border-border-subtle space-y-4">
                  <h4 className="text-[13px] font-600 uppercase tracking-wider text-ink-secondary">
                    What Should I Do Next?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
                    <div className="p-4 rounded-2xl bg-surface-secondary border border-border-subtle space-y-2">
                      <span className="font-600 text-ink block text-[14px]">1. Clinical Bloodwork</span>
                      <p className="text-ink-secondary leading-relaxed">
                        Request a dedicated panel: Fasting insulin, ApoB, HbA1c, and fasting glucose rather than basic cholesterol alone.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-secondary border border-border-subtle space-y-2">
                      <span className="font-600 text-ink block text-[14px]">2. Cultural Meal Sequencing</span>
                      <p className="text-ink-secondary leading-relaxed">
                        Keep your rotis and daal. Consume non-starchy vegetables and protein first, leaving refined starches for the final third of the meal.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-secondary border border-border-subtle space-y-2">
                      <span className="font-600 text-ink block text-[14px]">3. 1-on-1 Virtual Care</span>
                      <p className="text-ink-secondary leading-relaxed">
                        Partner with an accredited South Asian dietitian who specializes in insulin sensitivity and cultural dietary sustainability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Educational Takeaway Reminder */}
                <div className="mt-8 p-5 rounded-2xl bg-brand-deep text-white space-y-2">
                  <div className="flex items-center gap-2 text-sand text-[13px] font-600 uppercase tracking-wider">
                    <ShieldAlert size={16} className="text-sand" />
                    <span>Remember</span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-white/95">
                    <strong>You do not have to wait for diabetes to take action.</strong> For South Asians, metabolic risk can occur at lower BMI levels and is often accompanied by hidden abdominal visceral fat. Knowing your numbers early gives you an opportunity to act before disease develops.
                  </p>
                </div>

                {/* Educational Disclaimer */}
                <div className="mt-6 text-[12px] text-ink-muted leading-relaxed">
                  <strong>Disclaimer:</strong> This questionnaire is an educational risk-profiling tool and is not a validated diagnostic or predictive clinical score. It should not be used to diagnose insulin resistance, prediabetes, diabetes, obesity, fatty liver, or cardiovascular disease. Laboratory results and clinical findings should always be interpreted by an appropriately qualified healthcare professional.
                </div>
              </div>

              {/* Bottom Sticky-ready Action CTA Bar */}
              <div className="p-6 sm:p-8 rounded-[28px] bg-surface-white border border-border-subtle shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onGoHome}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-deep text-white text-[15px] font-600 hover:bg-brand-primary transition-all shadow-xs cursor-pointer"
                  >
                    <Home size={18} />
                    <span>Go to Home</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-secondary hover:bg-surface-secondary/80 text-ink text-[14px] font-500 border border-border-subtle transition-all cursor-pointer"
                    title="Print or save scorecard"
                  >
                    <Printer size={16} />
                    <span className="hidden sm:inline">Print / Save Scorecard</span>
                  </button>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-3">
                  <button
                    onClick={onBookConsultation}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sand hover:bg-sand-warm text-brand-deep text-[14.5px] font-600 border border-sand-warm transition-all cursor-pointer shadow-xs"
                  >
                    <CalendarCheck size={16} />
                    <span>Book 1-on-1 Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Buttons (Back / Continue) for Steps 1 through 5 */}
          {currentStep < 6 && (
            <div className="mt-8 flex items-center justify-between gap-4 print:hidden">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-500 text-ink-secondary hover:text-ink hover:bg-surface-secondary transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onGoHome}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-500 text-ink-secondary hover:text-ink hover:bg-surface-secondary transition-colors cursor-pointer"
                >
                  <Home size={16} />
                  <span>Cancel &amp; Go Home</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-deep text-white text-[14.5px] font-500 hover:bg-brand-primary transition-all duration-200 shadow-xs cursor-pointer"
              >
                <span>{currentStep === 5 ? 'Calculate Score & View Results' : 'Continue to Next Section'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border-subtle bg-surface-white text-[12.5px] text-ink-secondary print:hidden">
        <div className="mx-auto max-w-[1180px] px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} SA Wellness · Dedicated South Asian Nutrition &amp; Cardiometabolic Care
          </span>
          <div className="flex items-center gap-2.5">
            {socialLinks.map((item) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-secondary hover:bg-brand-primary text-ink-secondary hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                  aria-label={`Visit our ${item.name} page`}
                >
                  <IconComp size={15} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
