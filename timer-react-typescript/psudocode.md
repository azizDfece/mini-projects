1. ⚙️ إعداد الحالة الأولية (Initial State Setup)
Code snippet

FUNCTION TimerComponent:
    // حالة لتخزين عدد الثواني (القيمة الافتراضية 0)
    DEFINE state seconds SET TO 0 
    
    // حالة لتحديد ما إذا كان المؤقت قيد التشغيل أم لا
    DEFINE state isActive SET TO FALSE 
    
    // حالة لتخزين مُعرِّف المؤقت (Interval ID)
    DEFINE state intervalId SET TO NULL

    