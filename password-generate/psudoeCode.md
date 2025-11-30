



// 1. تعريف المتطلبات (الحالة)
FUNCTION PasswordGeneratorComponent:
    DEFINE state passwordLength SET TO 12  // طول كلمة المرور الافتراضي
    DEFINE state password SET TO ""
    DEFINE state includeUppercase SET TO TRUE
    DEFINE state includeLowercase SET TO TRUE
    DEFINE state includeNumbers SET TO TRUE
    DEFINE state includeSymbols SET TO FALSE

    // 2. تحديد مجموعة الأحرف
    DEFINE CONST uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    DEFINE CONST lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
    DEFINE CONST numberChars = "0123456789"
    DEFINE CONST symbolChars = "!@#$%^&*()_+"
    
    // 3. دالة التوليد الرئيسية
    FUNCTION generatePassword:
        SET availableChars = ""
        SET generatedPassword = ""

        // بناء مجموعة الأحرف المتاحة بناءً على الاختيارات
        IF includeUppercase IS TRUE THEN
            APPEND uppercaseChars TO availableChars
        IF includeLowercase IS TRUE THEN
            APPEND lowercaseChars TO availableChars
        IF includeNumbers IS TRUE THEN
            APPEND numberChars TO availableChars
        IF includeSymbols IS TRUE THEN
            APPEND symbolChars TO availableChars

        // التحقق من عدم تحديد أي خيار
        IF availableChars IS EMPTY THEN
            RETURN Error "يجب اختيار نوع حرف واحد على الأقل."
        
        // حلقة التوليد: تتكرر بعدد passwordLength
        FOR i FROM 1 TO passwordLength:
            // اختيار حرف عشوائي من availableChars
            randomIndex = GET RANDOM NUMBER BETWEEN 0 AND (LENGTH OF availableChars - 1)
            randomChar = GET CHARACTER AT randomIndex FROM availableChars
            APPEND randomChar TO generatedPassword
            
        // تحديث حالة كلمة المرور
        SET password TO generatedPassword

    // 4. عرض الواجهة (JSX)
    RETURN (
        DIV:
            // شريط التمرير لتحديد الطول
            RangeInput: 
                LABEL "طول كلمة المرور: " + passwordLength
                ON CHANGE: SET passwordLength TO NEW_VALUE // تحديث الطول
            
            // مربعات اختيار لتحديد أنواع الأحرف
            Checkbox: LABEL "أحرف كبيرة" ON CHANGE: TOGGLE includeUppercase
            Checkbox: LABEL "أحرف صغيرة" ON CHANGE: TOGGLE includeLowercase
            Checkbox: LABEL "أرقام" ON CHANGE: TOGGLE includeNumbers
            Checkbox: LABEL "رموز" ON CHANGE: TOGGLE includeSymbols
            
            // زر التوليد
            Button: LABEL "توليد كلمة المرور" ON CLICK: generatePassword()
            
            // عرض النتيجة
            DISPLAY password
    )

END FUNCTION