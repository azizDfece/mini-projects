
1. ⚙️ إعداد الحالة الأولية (Initial State Setup)
FUNCTION TwitterCloneComponent:
    // حالة لتخزين مصفوفة التغريدات (Tweets Array)
    DEFINE state tweets SET TO [] 
    
    // حالة لتخزين نص التغريدة الجديدة
    DEFINE state newTweetText SET TO "" 
    
    // تعريف مفتاح التخزين
    DEFINE CONST LOCAL_STORAGE_KEY = "react_tweets"


    2. 💾 تأثيرات دورة الحياة (Side Effects / useEffect)
    // 2.1: التحميل من LocalStorage عند تحميل المكون
USE EFFECT (ON COMPONENT MOUNT):
    GET storedTweets FROM localStorage USING LOCAL_STORAGE_KEY
    IF storedTweets IS NOT NULL AND IS VALID ARRAY THEN
        SET tweets TO storedTweets
    ELSE
        SET tweets TO [] // ابدأ بمصفوفة فارغة
    END IF

// 2.2: الحفظ في LocalStorage عند تحديث التغريدات
USE EFFECT (WHEN tweets CHANGES):
    SAVE tweets TO localStorage USING LOCAL_STORAGE_KEY

    3. ✍️ الدوال الرئيسية (Core Functions)
أ. إضافة تغريدة جديدة (AddTweet)

FUNCTION addTweet:
    IF newTweetText IS EMPTY OR newTweetText IS TOO LONG THEN
        RETURN // لا تفعل شيئًا أو اعرض رسالة خطأ
    END IF

    // إنشاء كائن التغريدة الجديد
    DEFINE newTweetObject AS:
        id: UNIQUE_ID (مثل Date.now())
        text: newTweetText
        timestamp: CURRENT_DATETIME (لحساب الوقت)

    // تحديث الحالة: أضف التغريدة الجديدة إلى بداية المصفوفة
    SET tweets TO [newTweetObject, ...tweets]
    
    // مسح نص الإدخال
    SET newTweetText TO ""

    ب. حذف تغريدة (DeleteTweet)

    FUNCTION deleteTweet(tweetId):
    // تصفية المصفوفة لإزالة التغريدة التي تطابق الـ id المحدد
    DEFINE updatedTweets AS tweets FILTERED BY (tweet => tweet.id !== tweetId)

    // تحديث الحالة
    SET tweets TO updatedTweets
    

    4. 🖼️ العرض (Render / JSX)

    FUNCTION render:
    RETURN (
        DIV (Twitter Clone Container):
            // 4.1 منطقة الإدخال
            DIV (Input Area):
                TEXTAREA:
                    VALUE IS newTweetText
                    ON CHANGE: SET newTweetText TO EVENT_VALUE
                BUTTON:
                    LABEL IS "Tweet"
                    ON CLICK: addTweet()

            // 4.2 عرض قائمة التغريدات
            DIV (Tweets List):
                FOR EACH tweet IN tweets:
                    RENDER TweetItemComponent WITH tweet data:
                        DIV (Tweet Item):
                            P (Tweet Text): DISPLAY tweet.text
                            SPAN (Timestamp): DISPLAY FORMATTED_TIME_AGO(tweet.timestamp) // مثال: "منذ 5 دقائق"
                            BUTTON:
                                LABEL IS "Delete"
                                ON CLICK: deleteTweet(tweet.id) // تمرير الـ id للحذف
    )