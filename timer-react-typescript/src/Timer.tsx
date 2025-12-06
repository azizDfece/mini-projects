import { useState, useEffect, useRef } from "react";



function Timer() {

    const [inputTime, setInputTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
    const [remainingSeconds, setRemainingSeconds] = useState<number>(0)
    const [isActive, setIsActive] = useState<boolean>(false)
    const intervalRef = useRef<number | null>(null);

    function toggleTimer(): void {

        setIsActive(prev => !prev)
        console.log(isActive);

    }
    function handleInputChange(unit: 'hours' | 'minutes' | 'seconds', value: string) {
        const num = parseInt(value) || 0
        setInputTime((prev) => ({ ...prev, [unit]: num }))
    }

    function reset(): void {
        setRemainingSeconds(0)
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)

        }
        setIsActive(false)
    }
    //خطوة 3 
    // ... داخل مكون TimerComponent ...

    useEffect(() => {
        let interval: number | null = null; // تعريف متغير محلي

        if (isActive) {
            // 1. بدء المؤقت وتحديث الثواني
            // ... داخل useEffect، داخل if (isActive) { ... }
            interval = window.setInterval(() => {
                setRemainingSeconds(prev => Math.max(0, prev - 1));
            }, 1000) as unknown as number; // 🔑 الحل: استخدم window.setInterval وأجبر النوع

            intervalRef.current = interval;
            // ...

        } else {
            // 3. مسح المؤقت إذا كان غير نشط (إذا ضغطنا Stop)
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        // 4. دالة التنظيف (Cleanup Function) - تعمل عند إزالة المكون أو قبل إعادة التشغيل
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };

    }, [isActive]);
    useEffect(() => {
        // 💡 التحقق: إذا كان الوقت المتبقي هو صفر والمؤقت لا يزال نشطاً
        if (remainingSeconds === 0 && !isActive) {
            // نضمن أننا مسحنا الـ interval (يتم مسحه في useEffect الأول)
            // لا نفعل شيئاً، هو متوقف الآن
            return;
        }

        if (remainingSeconds === 0 && isActive) {
            // ❌ تغيير الحالة هنا أصبح آمناً لأنه رد فعل على تغيير الحالة الأخرى
            setIsActive(false);

            alert("انتهى وقت المؤقت!");
        }

        // يعتمد على remainingSeconds و isActive فقط
    }, [remainingSeconds, isActive]);

    // ... باقي الكود ...
    function startTimer(): void {
        if (isActive) return;
        const totalDuration = (inputTime.hours * 3600) + (inputTime.minutes * 60) + inputTime.seconds
        if (totalDuration <= 0) {
            alert("ادخل مدة زمنية صحيحة")
            return
        }
        setRemainingSeconds(totalDuration)
        setIsActive(true)
    }

    function formatTime(totalSeconds: number): string {
        const minutes: number = Math.floor(totalSeconds / 60)
        const seconds: number = totalSeconds % 60
        const hours: number = Math.floor(minutes / 60)

        const formatm = minutes.toString().padStart(2, "0")
        const formats = seconds.toString().padStart(2, "0")
        const formath = hours.toString().padStart(2, "0")

        return `${formath}:${formatm}:${formats}`
    }

    return (
        <>
            <div className="container">
                <h1 id="display-timer">{formatTime(remainingSeconds)}</h1>
                <div className="input-controls">
                    <input type="number" placeholder="ساعات" value={inputTime.hours} onChange={(e) => handleInputChange('hours', e.target.value)} />
                    <input type="number" placeholder="دقائق" value={inputTime.minutes} onChange={(e) => handleInputChange('minutes', e.target.value)} />
                    <input type="number" placeholder="ثواني" value={inputTime.seconds} onChange={(e) => handleInputChange('seconds', e.target.value)} />
                </div>
                <div className="btn">
                    {(!isActive && remainingSeconds === 0) && (<button onClick={startTimer}>بدء</button>)}

                    {(remainingSeconds > 0) && (<button onClick={toggleTimer}>زر التحكم </button>)
                    }
                    {(remainingSeconds > 0 || isActive) && (
                        <button onClick={reset}>اعادة تعين </button>)

                    }
                </div>
            </div>

        </>
    )
}

export default Timer